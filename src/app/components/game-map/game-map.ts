import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { GameMapService, GameMapConfig, GameMarker, GameMapMetadata } from '../../services/game-map';
import { LanguageService } from '../../services/language.service';
import { DrawingService } from '../../services/drawing.service';
import { MapInteractionService } from '../../services/map-interaction.service';
import { MapStateService } from '../../services/map-state.service';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MapSelectorComponent } from '../map-selector/map-selector';
import { MapViewerComponent, DrawingLine, LegendItem } from '../map-viewer/map-viewer';
import { ZoomControlsComponent } from '../zoom-controls/zoom-controls';
import { DrawingToolsComponent } from '../drawing-tools/drawing-tools';
import { MapLegendComponent } from '../map-legend/map-legend';
import { MarkerFormComponent } from '../marker-form/marker-form';
import { ObjectivesComponent } from '../objectives/objectives';
import { RandomChallengeComponent } from '../random-challenge/random-challenge';

@Component({
  selector: 'app-game-map',
  imports: [
    CommonModule,
    MapSelectorComponent,
    MapViewerComponent,
    ZoomControlsComponent,
    DrawingToolsComponent,
    MapLegendComponent,
    MarkerFormComponent,
    ObjectivesComponent,
    RandomChallengeComponent
  ],
  templateUrl: './game-map.html',
  styleUrl: './game-map.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameMapComponent implements OnInit, OnDestroy {
  @ViewChild(MapViewerComponent, { static: false }) mapViewerComponent!: MapViewerComponent;

  currentMap: GameMapConfig | null = null;
  currentMapMetadata: GameMapMetadata | null = null;
  markers: GameMarker[] = [];
  selectedMarker: GameMarker | null = null;
  availableMaps: GameMapMetadata[] = [];

  // UI State from MapStateService
  showMarkerForm = false;
  newMarkerX = 0;
  newMarkerY = 0;
  legendItems: LegendItem[] = [];

  // Drawing properties from DrawingService
  isDrawingMode = false;
  isDrawing = false;
  isEraserMode = false;
  drawingPath: { x: number; y: number }[] = [];
  drawnLines: DrawingLine[] = [];
  selectedDrawColor = '#FF0000';

  // Interaction properties from MapInteractionService
  zoomLevel = 1;
  minZoom = 0.5;
  maxZoom = 3;
  isPanning = false;
  panOffsetX = 0;
  panOffsetY = 0;
  hasMoved = false;

  // Loading state
  isLoading = false;

  // Random Challenge modal state
  isChallengeModalOpen = false;

  // Mobile sidebar state
  isSidebarCollapsed = false;

  // Touch tracking
  private touchStartX = 0;
  private touchStartY = 0;
  private touchMoved = false;

  private readonly destroy$ = new Subject<void>();

  // Conditional event listeners for better performance
  private mouseMoveListener?: (e: MouseEvent) => void;
  private mouseUpListener?: (e: MouseEvent) => void;
  private touchMoveListener?: (e: TouchEvent) => void;
  private touchEndListener?: (e: TouchEvent) => void;
  private listenersAttached = false;

  constructor(
    private readonly gameMapService: GameMapService,
    private readonly languageService: LanguageService,
    private readonly drawingService: DrawingService,
    private readonly mapInteractionService: MapInteractionService,
    private readonly mapStateService: MapStateService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly meta: Meta,
    private readonly titleService: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.availableMaps = this.gameMapService.getAvailableMaps();

    // Subscribe to route parameters to load map from URL
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const routeParam = params.get('route');
        if (routeParam) {
          // Find map by route parameter
          const mapMetadata = this.availableMaps.find(m => m.route === routeParam);
          if (mapMetadata) {
            this.loadMap(mapMetadata.id);
          }
        } else if (this.availableMaps.length > 0 && !this.currentMap) {
          // Load first map if no route parameter and no map loaded yet
          this.loadMapAndNavigate(this.availableMaps[0].id);
        }
      });

    // Merge all observables into a single subscription to reduce change detection cycles
    combineLatest([
      this.gameMapService.currentMap$,
      this.gameMapService.currentMapMetadata$,
      this.gameMapService.markers$,
      this.gameMapService.selectedMarker$,
      this.gameMapService.loading$,
      this.mapInteractionService.state$,
      this.drawingService.drawingState$,
      this.mapStateService.uiState$
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([
        currentMap,
        currentMapMetadata,
        markers,
        selectedMarker,
        loading,
        interactionState,
        drawingState,
        uiState
      ]) => {
        // Map and layer changes
        const mapChanged = this.currentMapMetadata?.id !== currentMapMetadata?.id;
        const visibleLayerId = currentMap?.layers?.find(l => l.visible)?.id;
        const previousVisibleLayerId = this.currentMap?.layers?.find(l => l.visible)?.id;
        const layerChanged = visibleLayerId !== previousVisibleLayerId;

        this.currentMap = currentMap;
        this.currentMapMetadata = currentMapMetadata;

        if (mapChanged) {
          this.updateMetaTags();
          this.loadDrawingsForCurrentMap();
        } else if (layerChanged) {
          // Load drawings when layer changes (but map stays the same)
          this.loadDrawingsForCurrentMap();
        }

        // Markers
        this.markers = markers;
        this.selectedMarker = selectedMarker;

        // Loading
        this.isLoading = loading;

        // Interaction state
        this.zoomLevel = interactionState.zoomLevel;
        this.panOffsetX = interactionState.panOffsetX;
        this.panOffsetY = interactionState.panOffsetY;
        this.isPanning = interactionState.isPanning;
        this.hasMoved = interactionState.hasMoved;

        // Drawing state
        this.isDrawingMode = drawingState.isDrawingMode;
        this.isDrawing = drawingState.isDrawing;
        this.isEraserMode = drawingState.isEraserMode;
        this.drawingPath = drawingState.drawingPath;
        this.selectedDrawColor = drawingState.selectedDrawColor;

        // UI state
        this.showMarkerForm = uiState.showMarkerForm;
        this.newMarkerX = uiState.newMarkerX;
        this.newMarkerY = uiState.newMarkerY;
        this.legendItems = uiState.legendItems;

        // Trigger change detection once for all updates
        this.cdr.markForCheck();
      });
  }

  /**
   * Return the bounding rect of the topmost visible .layer-image inside the
   * provided container. Falls back to the container rect if no image found.
   */
  private getTopImageRect(container?: HTMLElement): DOMRect | undefined {
    if (!container) return undefined;
    // Prefer the `.image-wrapper` rect because it represents the displayed map area
    // (all images are stacked inside it). Using an individual image's rect can
    // cause different scaling when images have different intrinsic sizes which
    // makes drawing feel faster/slower when multiple layers are visible.
    const wrapper = container.querySelector<HTMLElement>('.image-wrapper');
    if (wrapper && (wrapper.offsetWidth || wrapper.offsetHeight)) {
      return wrapper.getBoundingClientRect();
    }

    // Fallback: pick the last visible image in DOM order
    const imgs = Array.from(container.querySelectorAll<HTMLImageElement>('.layer-image'));
    for (let idx = imgs.length - 1; idx >= 0; idx--) {
      const img = imgs[idx];
      if (img.offsetWidth || img.offsetHeight) {
        return img.getBoundingClientRect();
      }
    }
    return container.getBoundingClientRect();
  }

  ngOnDestroy(): void {
    this.detachMouseListeners();
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Attach mouse/touch event listeners conditionally when panning or drawing starts
   * This prevents global listeners from firing on every mouse/touch movement
   */
  private attachMouseListeners(): void {
    if (this.listenersAttached) return;

    this.mouseMoveListener = (e: MouseEvent) => this.handleMouseMove(e);
    this.mouseUpListener = (e: MouseEvent) => this.handleMouseUp(e);
    this.touchMoveListener = (e: TouchEvent) => this.handleTouchMove(e);
    this.touchEndListener = (e: TouchEvent) => this.handleTouchEnd(e);

    document.addEventListener('mousemove', this.mouseMoveListener);
    document.addEventListener('mouseup', this.mouseUpListener);
    document.addEventListener('touchmove', this.touchMoveListener, { passive: false });
    document.addEventListener('touchend', this.touchEndListener);

    this.listenersAttached = true;
  }

  /**
   * Detach mouse/touch event listeners when panning or drawing ends
   */
  private detachMouseListeners(): void {
    if (!this.listenersAttached) return;

    if (this.mouseMoveListener) {
      document.removeEventListener('mousemove', this.mouseMoveListener);
      this.mouseMoveListener = undefined;
    }

    if (this.mouseUpListener) {
      document.removeEventListener('mouseup', this.mouseUpListener);
      this.mouseUpListener = undefined;
    }

    if (this.touchMoveListener) {
      document.removeEventListener('touchmove', this.touchMoveListener);
      this.touchMoveListener = undefined;
    }

    if (this.touchEndListener) {
      document.removeEventListener('touchend', this.touchEndListener);
      this.touchEndListener = undefined;
    }

    this.listenersAttached = false;
  }

  private updateMetaTags(): void {
    if (this.currentMapMetadata) {
      const canonicalUrl = `https://readyormaps.com/map/${this.currentMapMetadata.route}`;

      // Update page title
      this.titleService.setTitle(`${this.currentMapMetadata.name} - Ready or Maps`);

      // Update canonical URL
      this.updateCanonical(canonicalUrl);

      // Update meta description
      this.meta.updateTag({
        name: 'description',
        content: this.currentMapMetadata.metaDescription
      });

      // Update Open Graph tags for social sharing
      this.meta.updateTag({
        property: 'og:title',
        content: `${this.currentMapMetadata.name} - Ready or Maps`
      });
      this.meta.updateTag({
        property: 'og:description',
        content: this.currentMapMetadata.metaDescription
      });
      this.meta.updateTag({
        property: 'og:url',
        content: canonicalUrl
      });
      this.meta.updateTag({
        property: 'og:image',
        content: 'https://readyormaps.com/ReadyOrMaps.png'
      });
      this.meta.updateTag({
        property: 'og:site_name',
        content: 'Ready or Maps'
      });
      this.meta.updateTag({
        property: 'og:locale',
        content: 'en_US'
      });
      this.meta.updateTag({
        property: 'og:type',
        content: 'article'
      });

      // Update Twitter Card tags
      this.meta.updateTag({
        name: 'twitter:title',
        content: `${this.currentMapMetadata.name} - Ready or Maps`
      });
      this.meta.updateTag({
        name: 'twitter:description',
        content: this.currentMapMetadata.metaDescription
      });

      // Add structured data
      this.addStructuredData(canonicalUrl);
    } else {
      // Default meta tags when no map is selected
      const canonicalUrl = 'https://readyormaps.com/';

      this.titleService.setTitle('Ready or Maps - Interactive Maps for Ready or Not');
      this.updateCanonical(canonicalUrl);

      this.meta.updateTag({
        name: 'description',
        content: 'Interactive maps for Ready or Not tactical shooter. Plan your missions with detailed floor plans, objectives, and tactical entry points for all maps.'
      });
      this.meta.updateTag({
        property: 'og:title',
        content: 'Ready or Maps - Interactive Maps for Ready or Not'
      });
      this.meta.updateTag({
        property: 'og:description',
        content: 'Interactive maps for Ready or Not tactical shooter. Plan your missions with detailed floor plans, objectives, and tactical entry points for all maps.'
      });
      this.meta.updateTag({
        property: 'og:url',
        content: canonicalUrl
      });
      this.meta.updateTag({
        property: 'og:site_name',
        content: 'Ready or Maps'
      });
      this.meta.updateTag({
        property: 'og:locale',
        content: 'en_US'
      });
      this.meta.updateTag({
        property: 'og:type',
        content: 'website'
      });
    }
  }

  private updateCanonical(url: string): void {
    if (isPlatformBrowser(this.platformId)) {
      let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', url);
    }
  }

  private addStructuredData(canonicalUrl: string): void {
    if (!this.currentMapMetadata) return;

    const webPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': `${this.currentMapMetadata.name} - Ready or Maps`,
      'url': canonicalUrl,
      'description': this.currentMapMetadata.metaDescription,
      'isPartOf': {
        '@type': 'WebSite',
        'name': 'Ready or Maps',
        'url': 'https://readyormaps.com'
      },
      'about': {
        '@type': 'VideoGame',
        'name': 'Ready or Not',
        'gamePlatform': 'PC'
      }
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://readyormaps.com'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': this.currentMapMetadata.name,
          'item': canonicalUrl
        }
      ]
    };

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': `${this.currentMapMetadata.name} - Interactive Map`,
      'description': this.currentMapMetadata.metaDescription,
      'url': canonicalUrl,
      'datePublished': '2024-01-01',
      'dateModified': new Date().toISOString().split('T')[0],
      'author': {
        '@type': 'Organization',
        'name': 'Ready or Maps'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Ready or Maps'
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': canonicalUrl
      }
    };

    this.injectStructuredData('webpage-schema', webPageSchema);
    this.injectStructuredData('breadcrumb-schema', breadcrumbSchema);
    this.injectStructuredData('article-schema', articleSchema);
  }

  private injectStructuredData(id: string, data: any): void {
    if (isPlatformBrowser(this.platformId)) {
      let script = document.getElementById(id) as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    }
  }

  // Map Selection
  loadMap(mapId: string): void {
    this.gameMapService.loadMap(mapId);
    this.gameMapService.selectMarker(null);
  }

  onMapSelected(mapId: string): void {
    this.loadMapAndNavigate(mapId);
  }

  private loadMapAndNavigate(mapId: string): void {
    const mapMetadata = this.availableMaps.find(m => m.id === mapId);
    if (mapMetadata) {
      this.router.navigate(['/map', mapMetadata.route]);
    }
  }

  // Zoom Controls
  onZoomIn(): void {
    this.mapInteractionService.zoomIn();
  }

  onZoomOut(): void {
    this.mapInteractionService.zoomOut();
  }

  onResetZoom(): void {
    this.mapInteractionService.resetZoom();
  }

  onMouseWheel(event: WheelEvent): void {
    event.preventDefault();
    this.mapInteractionService.handleMouseWheel(event.deltaY);
  }

  // Layer Selection
  onLayerSelected(layerId: string): void {
    this.gameMapService.selectLayer(layerId);
    // Note: loadDrawingsForCurrentMap() is called automatically by the subscription
    // when it detects the layer change after the service updates
  }

  loadDrawingsForCurrentMap(): void {
    if (!this.currentMap) {
      this.drawnLines = [];
      this.cdr.markForCheck();
      return;
    }

    const visibleLayer = this.currentMap.layers?.find(l => l.visible);
    if (visibleLayer && this.currentMapMetadata) {
      const drawings = this.drawingService.getDrawingsForMapAndLayer(
        this.currentMapMetadata.id,
        visibleLayer.id
      );
      this.drawnLines = drawings;
      this.cdr.markForCheck();
    }
  }

  // Drawing Tools
  onDrawingModeToggled(enabled: boolean): void {
    this.drawingService.setDrawingMode(enabled);
  }

  onColorSelected(color: string): void {
    this.drawingService.setDrawColor(color);
  }

  onEraserModeToggled(enabled: boolean): void {
    this.drawingService.setEraserMode(enabled);
  }

  onClearDrawings(): void {
    if (!this.currentMap || !this.currentMapMetadata) return;

    const visibleLayer = this.currentMap.layers?.find(l => l.visible);
    if (visibleLayer) {
      this.drawingService.clearDrawingsForLayer(this.currentMapMetadata.id, visibleLayer.id);
      this.drawnLines = [];
      this.cdr.markForCheck();
    }
  }

  // Legend
  onLegendItemToggled(itemId: string): void {
    this.mapStateService.toggleLegendItem(itemId);
  }

  onShowAllLegend(): void {
    this.mapStateService.showAllLegendItems();
  }

  onHideAllLegend(): void {
    this.mapStateService.hideAllLegendItems();
  }

  // Marker Form
  onMarkerSaved(data: { x: number; y: number; title: string; description: string; type: string }): void {
    if (!this.currentMap) return;

    const visibleLayer = this.currentMap.layers?.find(l => l.visible);
    const newMarker: GameMarker = {
      id: 'm' + Date.now(),
      x: data.x,
      y: data.y,
      title: data.title,
      description: data.description,
      type: data.type as 'spawn' | 'hard_objective' | 'soft_objective',
      color: this.mapStateService.getColorForType(data.type),
      layerId: visibleLayer?.id || 'base'
    };

    this.gameMapService.addMarker(newMarker);
    this.mapStateService.hideMarkerForm();
  }

  onMarkerFormClosed(): void {
    this.mapStateService.hideMarkerForm();
  }

  onChallengeModalStateChanged(isOpen: boolean): void {
    this.isChallengeModalOpen = isOpen;
    this.cdr.markForCheck();
  }

  // Map Interactions
  onMapClick(coords: { x: number; y: number }): void {
    // Always close the marker tooltip when clicking on the map
    this.gameMapService.selectMarker(null);

    // Don't show marker form if we were moving, drawing, or panning
    if (this.hasMoved || this.isDrawingMode || this.isPanning) {
      return;
    }

    this.mapStateService.showMarkerForm(coords.x, coords.y);
  }

  onMarkerClick(marker: GameMarker): void {
    if (this.selectedMarker?.id === marker.id) {
      this.gameMapService.selectMarker(null);
    } else {
      this.gameMapService.selectMarker(marker);
    }
  }

  // Mouse Events for panning and drawing
  onMouseDown(event: MouseEvent): void {
    if (event.button === 0) {
      // Attach listeners only when needed
      this.attachMouseListeners();

      if (this.isDrawingMode && !this.showMarkerForm) {
        // Start drawing
        const container = this.mapViewerComponent?.mapContainer?.nativeElement as HTMLElement | undefined;
        const rect = this.getTopImageRect(container);
        if (rect) {
          this.drawingService.startDrawing(event.clientX, event.clientY, rect);
        }
        event.preventDefault();
      } else if (!this.showMarkerForm) {
        // Start panning
        this.mapInteractionService.startPan(event.clientX, event.clientY);
        event.preventDefault();
      }
    }
  }

  /**
   * Handle mouse move events during panning or drawing
   * Only called when listeners are attached (not globally)
   */
  private handleMouseMove(event: MouseEvent): void {
    if (this.isDrawing && this.isDrawingMode) {
      const container = this.mapViewerComponent?.mapContainer?.nativeElement as HTMLElement | undefined;
      const rect = this.getTopImageRect(container);
      if (rect) {
        this.drawingService.continueDrawing(event.clientX, event.clientY, rect);
      }
      event.preventDefault();
    } else if (this.isPanning) {
      this.mapInteractionService.updatePan(event.clientX, event.clientY);
      event.preventDefault();
    }
  }

  /**
   * Handle mouse up events during panning or drawing
   * Only called when listeners are attached (not globally)
   */
  private handleMouseUp(event: MouseEvent): void {
    // Detach listeners when mouse is released
    this.detachMouseListeners();

    if (this.isDrawing) {
      if (this.currentMap && this.currentMapMetadata) {
        const visibleLayer = this.currentMap.layers?.find(l => l.visible);
        if (visibleLayer) {
          const drawing = this.drawingService.finishDrawing(this.currentMapMetadata.id, visibleLayer.id);
          if (drawing && !this.isEraserMode) {
            this.drawnLines.push(drawing);
            this.cdr.markForCheck();
          } else if (this.isEraserMode) {
            // Reload drawings after erasing
            this.loadDrawingsForCurrentMap();
          }
        }
      }
    }

    // Handle pan end and check if it was a click (no movement)
    const wasClick = this.mapInteractionService.endPan();
    if (wasClick && !this.showMarkerForm) {
      this.gameMapService.selectMarker(null);
    }
  }

  onObjectiveToggled(objectiveId: string): void {
    if (!this.currentMap || !this.currentMap.objectives) {
      return;
    }

    // Find and toggle the objective
    const objective = this.currentMap.objectives.find(obj => obj.id === objectiveId);
    if (objective) {
      objective.completed = !objective.completed;
      // Create new array reference to trigger OnPush change detection
      this.currentMap.objectives = [...this.currentMap.objectives];
      // Trigger change detection
      this.cdr.markForCheck();
    }
  }

  // Touch Events for mobile support
  onTouchStart(event: TouchEvent): void {
    this.attachMouseListeners();

    // Store touch start position
    if (event.touches.length === 1) {
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
      this.touchMoved = false;
    }

    if (!this.showMarkerForm) {
      this.mapInteractionService.startTouch(event.touches);
      // Don't preventDefault on touchstart to allow clicks on markers
    }
  }

  private handleTouchMove(event: TouchEvent): void {
    // Check if touch has moved significantly
    if (event.touches.length === 1) {
      const deltaX = Math.abs(event.touches[0].clientX - this.touchStartX);
      const deltaY = Math.abs(event.touches[0].clientY - this.touchStartY);
      if (deltaX > 5 || deltaY > 5) {
        this.touchMoved = true;
      }
    }

    this.mapInteractionService.updateTouch(event.touches);

    // Only preventDefault if touch moved (panning/zooming)
    // This allows taps on markers to generate click events
    if (this.touchMoved || event.touches.length > 1) {
      event.preventDefault();
    }
  }

  private handleTouchEnd(event: TouchEvent): void {
    if (event.touches.length > 0) {
      this.mapInteractionService.updateTouch(event.touches);
      return;
    }

    this.detachMouseListeners();
    this.mapInteractionService.endTouch();

    // Reset touch tracking
    this.touchMoved = false;
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.cdr.markForCheck();
  }

}
