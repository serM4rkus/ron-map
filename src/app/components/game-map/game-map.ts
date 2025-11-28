import { Component, OnInit, ViewChild, OnDestroy, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { GameMapService, GameMapConfig, GameMarker, GameMapMetadata } from '../../services/game-map';
import { LanguageService } from '../../services/language.service';
import { DrawingService } from '../../services/drawing.service';
import { MapInteractionService } from '../../services/map-interaction.service';
import { MapStateService } from '../../services/map-state.service';
import { Language } from '../../config/languages.config';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MapSelectorComponent } from '../map-selector/map-selector';
import { MapViewerComponent, DrawingLine, LegendItem } from '../map-viewer/map-viewer';
import { ZoomControlsComponent } from '../zoom-controls/zoom-controls';
import { DrawingToolsComponent } from '../drawing-tools/drawing-tools';
import { MapLegendComponent } from '../map-legend/map-legend';
import { MarkerFormComponent } from '../marker-form/marker-form';
import { ObjectivesComponent } from '../objectives/objectives';

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
    ObjectivesComponent
  ],
  templateUrl: './game-map.html',
  styleUrl: './game-map.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameMapComponent implements OnInit, OnDestroy {
  @ViewChild(MapViewerComponent, { static: false }) mapViewerComponent!: MapViewerComponent;

  currentMap: GameMapConfig | null = null;
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
  drawColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];

  // Interaction properties from MapInteractionService
  zoomLevel = 1;
  minZoom = 0.5;
  maxZoom = 3;
  isPanning = false;
  panOffsetX = 0;
  panOffsetY = 0;
  hasMoved = false;

  // Language properties
  availableLanguages: Language[] = [];
  currentLanguage = 'en';

  // Loading state
  isLoading = false;

  private readonly destroy$ = new Subject<void>();

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
    private readonly titleService: Title
  ) { }

  // Enable to print drawing coordinate diagnostics to the console
  private readonly debugDrawing = false;

  ngOnInit(): void {
    this.availableMaps = this.gameMapService.getAvailableMaps();
    this.availableLanguages = this.languageService.getAvailableLanguages();

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

    // Subscribe to language changes
    this.languageService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.currentLanguage = lang;
        this.cdr.markForCheck();
      });

    // Subscribe to map changes
    this.gameMapService.currentMap$
      .pipe(takeUntil(this.destroy$))
      .subscribe(map => {
        this.currentMap = map;
        this.updateMetaTags();
        this.loadDrawingsForCurrentMap();
        this.cdr.markForCheck();
      });

    // Subscribe to marker changes
    this.gameMapService.markers$
      .pipe(takeUntil(this.destroy$))
      .subscribe(markers => {
        this.markers = markers;
        this.cdr.markForCheck();
      });

    // Subscribe to selected marker changes
    this.gameMapService.selectedMarker$
      .pipe(takeUntil(this.destroy$))
      .subscribe(marker => {
        this.selectedMarker = marker;
        this.cdr.markForCheck();
      });

    // Subscribe to loading state
    this.gameMapService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.isLoading = loading;
        this.cdr.markForCheck();
      });

    // Subscribe to map interaction state
    this.mapInteractionService.state$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.zoomLevel = state.zoomLevel;
        this.panOffsetX = state.panOffsetX;
        this.panOffsetY = state.panOffsetY;
        this.isPanning = state.isPanning;
        this.hasMoved = state.hasMoved;
        this.cdr.markForCheck();
      });

    // Subscribe to drawing state
    this.drawingService.drawingState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.isDrawingMode = state.isDrawingMode;
        this.isDrawing = state.isDrawing;
        this.isEraserMode = state.isEraserMode;
        this.drawingPath = state.drawingPath;
        this.selectedDrawColor = state.selectedDrawColor;
        this.cdr.markForCheck();
      });

    // Subscribe to map UI state
    this.mapStateService.uiState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.showMarkerForm = state.showMarkerForm;
        this.newMarkerX = state.newMarkerX;
        this.newMarkerY = state.newMarkerY;
        this.legendItems = state.legendItems;
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
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateMetaTags(): void {
    if (this.currentMap) {
      const mapMetadata = this.availableMaps.find(m => m.id === this.currentMap?.id);
      if (mapMetadata) {
        const canonicalUrl = `https://readyormaps.com/map/${mapMetadata.route}`;
        
        // Update page title
        this.titleService.setTitle(`${mapMetadata.name} - Ready or Maps`);
        
        // Update canonical URL
        this.updateCanonical(canonicalUrl);
        
        // Update meta description
        this.meta.updateTag({ 
          name: 'description', 
          content: mapMetadata.metaDescription 
        });
        
        // Update Open Graph tags for social sharing
        this.meta.updateTag({ 
          property: 'og:title', 
          content: `${mapMetadata.name} - Ready or Maps` 
        });
        this.meta.updateTag({ 
          property: 'og:description', 
          content: mapMetadata.metaDescription 
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
          content: 'article' 
        });
        
        // Update Twitter Card tags
        this.meta.updateTag({ 
          name: 'twitter:title', 
          content: `${mapMetadata.name} - Ready or Maps` 
        });
        this.meta.updateTag({ 
          name: 'twitter:description', 
          content: mapMetadata.metaDescription 
        });
      }
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
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
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
    this.loadDrawingsForCurrentMap();
  }

  loadDrawingsForCurrentMap(): void {
    if (!this.currentMap) {
      this.drawnLines = [];
      this.cdr.markForCheck();
      return;
    }
    
    const visibleLayer = this.currentMap.layers?.find(l => l.visible);
    if (visibleLayer) {
      const drawings = this.drawingService.getDrawingsForMapAndLayer(
        this.currentMap.id,
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
    if (!this.currentMap) return;
    
    const visibleLayer = this.currentMap.layers?.find(l => l.visible);
    if (visibleLayer) {
      this.drawingService.clearDrawingsForLayer(this.currentMap.id, visibleLayer.id);
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

  // Language
  onLanguageChanged(langCode: string): void {
    this.languageService.setLanguage(langCode);
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
      if (this.isDrawingMode && !this.showMarkerForm) {
        // Start drawing
        const container = this.mapViewerComponent?.mapContainer?.nativeElement as HTMLElement | undefined;
        const rect = this.getTopImageRect(container);
        if (rect) {
          if (this.debugDrawing) {
            console.debug('[draw start] rect=', rect, 'client=', { x: event.clientX, y: event.clientY }, 'zoom=', this.zoomLevel);
          }
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

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDrawing && this.isDrawingMode) {
      const container = this.mapViewerComponent?.mapContainer?.nativeElement as HTMLElement | undefined;
      const rect = this.getTopImageRect(container);
      if (rect) {
        if (this.debugDrawing) {
          console.debug('[draw move] rect=', rect, 'client=', { x: event.clientX, y: event.clientY }, 'zoom=', this.zoomLevel);
        }
        this.drawingService.continueDrawing(event.clientX, event.clientY, rect);
      }
      event.preventDefault();
    } else if (this.isPanning) {
      this.mapInteractionService.updatePan(event.clientX, event.clientY);
      event.preventDefault();
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    if (this.isDrawing) {
      if (this.currentMap) {
        const visibleLayer = this.currentMap.layers?.find(l => l.visible);
        if (visibleLayer) {
          const drawing = this.drawingService.finishDrawing(this.currentMap.id, visibleLayer.id);
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

}
