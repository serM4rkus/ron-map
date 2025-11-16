import { Component, OnInit, ViewChild, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameMapService, GameMapConfig, GameMarker } from '../../services/game-map';
import { LanguageService } from '../../services/language.service';
import { DrawingService } from '../../services/drawing.service';
import { Language } from '../../config/languages.config';
import { MARKER_TYPE_CONFIGS } from '../../config/marker-types.config';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MapSelectorComponent } from '../map-selector/map-selector';
import { MapViewerComponent, DrawingLine } from '../map-viewer/map-viewer';
import { ZoomControlsComponent } from '../zoom-controls/zoom-controls';
import { DrawingToolsComponent } from '../drawing-tools/drawing-tools';
import { MapLegendComponent } from '../map-legend/map-legend';
import { MarkerFormComponent } from '../marker-form/marker-form';

@Component({
  selector: 'app-game-map',
  imports: [
    CommonModule,
    MapSelectorComponent,
    MapViewerComponent,
    ZoomControlsComponent,
    DrawingToolsComponent,
    MapLegendComponent,
    MarkerFormComponent
  ],
  templateUrl: './game-map.html',
  styleUrl: './game-map.css',
})
export class GameMapComponent implements OnInit, OnDestroy {
  @ViewChild(MapViewerComponent, { static: false }) mapViewerComponent!: MapViewerComponent;

  currentMap: GameMapConfig | null = null;
  markers: GameMarker[] = [];
  selectedMarker: GameMarker | null = null;
  availableMaps: GameMapConfig[] = [];
  showMarkerForm = false;
  newMarkerX = 0;
  newMarkerY = 0;
  zoomLevel = 1;
  minZoom = 0.5;
  maxZoom = 3;
  zoomStep = 0.1;

  // Legend properties
  legendItems = MARKER_TYPE_CONFIGS.map(config => ({
    id: config.type,
    color: config.color,
    label: config.label,
    visible: true
  }));

  // Drawing properties
  isDrawingMode = false;
  isDrawing = false;
  isEraserMode = false;
  drawingPath: { x: number; y: number }[] = [];
  drawnLines: DrawingLine[] = [];
  selectedDrawColor = '#FF0000';
  drawColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];

  // Language properties
  availableLanguages: Language[] = [];
  currentLanguage = 'en';

  // Pan/Drag properties
  isPanning = false;
  panStartX = 0;
  panStartY = 0;
  panOffsetX = 0;
  panOffsetY = 0;
  hasMoved = false;

  // Loading state
  isLoading = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly gameMapService: GameMapService,
    private readonly languageService: LanguageService,
    private readonly drawingService: DrawingService
  ) { }

  ngOnInit(): void {
    this.availableMaps = this.gameMapService.getAvailableMaps();
    this.availableLanguages = this.languageService.getAvailableLanguages();

    this.languageService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.currentLanguage = lang;
      });

    this.gameMapService.currentMap$
      .pipe(takeUntil(this.destroy$))
      .subscribe(map => {
        this.currentMap = map;
        this.loadDrawingsForCurrentMap();
      });

    this.gameMapService.markers$
      .pipe(takeUntil(this.destroy$))
      .subscribe(markers => {
        this.markers = markers;
      });

    this.gameMapService.selectedMarker$
      .pipe(takeUntil(this.destroy$))
      .subscribe(marker => {
        this.selectedMarker = marker;
      });

    this.gameMapService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.isLoading = loading;
      });

    if (this.availableMaps.length > 0) {
      this.loadMap(this.availableMaps[0].id);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Map Selection
  loadMap(mapId: string): void {
    this.gameMapService.loadMap(mapId);
    this.gameMapService.selectMarker(null);
  }

  onMapSelected(mapId: string): void {
    this.loadMap(mapId);
  }

  // Zoom Controls
  onZoomIn(): void {
    if (this.zoomLevel < this.maxZoom) {
      this.zoomLevel = Math.min(this.maxZoom, this.zoomLevel + this.zoomStep);
    }
  }

  onZoomOut(): void {
    if (this.zoomLevel > this.minZoom) {
      this.zoomLevel = Math.max(this.minZoom, this.zoomLevel - this.zoomStep);
    }
  }

  onResetZoom(): void {
    this.zoomLevel = 1;
    this.panOffsetX = 0;
    this.panOffsetY = 0;
  }

  onMouseWheel(event: WheelEvent): void {
    event.preventDefault();
    if (event.deltaY < 0) {
      this.onZoomIn();
    } else {
      this.onZoomOut();
    }
  }

  // Layer Selection
  onLayerSelected(layerId: string): void {
    this.gameMapService.selectLayer(layerId);
    this.loadDrawingsForCurrentMap();
  }

  loadDrawingsForCurrentMap(): void {
    if (!this.currentMap) {
      this.drawnLines = [];
      return;
    }
    
    const visibleLayer = this.currentMap.layers?.find(l => l.visible);
    if (visibleLayer) {
      const drawings = this.drawingService.getDrawingsForMapAndLayer(
        this.currentMap.id,
        visibleLayer.id
      );
      this.drawnLines = drawings;
    }
  }

  // Drawing Tools
  onDrawingModeToggled(enabled: boolean): void {
    this.isDrawingMode = enabled;
    if (!this.isDrawingMode) {
      this.drawingPath = [];
      this.isDrawing = false;
      this.isEraserMode = false;
    }
  }

  onColorSelected(color: string): void {
    this.selectedDrawColor = color;
    this.isEraserMode = false;
  }

  onEraserModeToggled(enabled: boolean): void {
    this.isEraserMode = enabled;
  }

  onClearDrawings(): void {
    if (!this.currentMap) return;
    
    const visibleLayer = this.currentMap.layers?.find(l => l.visible);
    if (visibleLayer) {
      this.drawingService.clearDrawingsForLayer(this.currentMap.id, visibleLayer.id);
      this.drawnLines = [];
    }
    this.drawingPath = [];
  }

  // Legend
  onLegendItemToggled(itemId: string): void {
    const item = this.legendItems.find(i => i.id === itemId);
    if (item) {
      item.visible = !item.visible;
    }
  }

  onShowAllLegend(): void {
    for (const item of this.legendItems) {
      item.visible = true;
    }
  }

  onHideAllLegend(): void {
    for (const item of this.legendItems) {
      item.visible = false;
    }
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
      color: this.getColorForType(data.type),
      layerId: visibleLayer?.id || 'base'
    };

    this.gameMapService.addMarker(newMarker);
    this.showMarkerForm = false;
  }

  onMarkerFormClosed(): void {
    this.showMarkerForm = false;
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
    
    this.newMarkerX = coords.x;
    this.newMarkerY = coords.y;
    this.showMarkerForm = true;
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
      this.hasMoved = false;
      
      if (this.isDrawingMode && !this.showMarkerForm) {
        this.isDrawing = true;
        // Compute percent coords relative to the displayed image
        const container = this.mapViewerComponent?.mapContainer?.nativeElement as HTMLElement | undefined;
        const canvasRect = container?.getBoundingClientRect();
        if (canvasRect) {
          const sx = ((event.clientX - canvasRect.left) / canvasRect.width) * 100;
          const sy = ((event.clientY - canvasRect.top) / canvasRect.height) * 100;
          this.drawingPath = [{ x: Math.round(sx * 100) / 100, y: Math.round(sy * 100) / 100 }];
        } else {
          this.drawingPath = [{ x: 0, y: 0 }];
        }
        event.preventDefault();
      } else if (!this.showMarkerForm) {
        this.isPanning = true;
        this.panStartX = event.clientX - this.panOffsetX;
        this.panStartY = event.clientY - this.panOffsetY;
        event.preventDefault();
      }
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDrawing && this.isDrawingMode) {
      this.hasMoved = true;
      const container = this.mapViewerComponent?.mapContainer?.nativeElement;
      const canvasRect = container?.getBoundingClientRect();
      if (canvasRect) {
        const px = ((event.clientX - canvasRect.left) / canvasRect.width) * 100;
        const py = ((event.clientY - canvasRect.top) / canvasRect.height) * 100;
        this.drawingPath.push({ x: Math.round(px * 100) / 100, y: Math.round(py * 100) / 100 });
      }
      event.preventDefault();
    } else if (this.isPanning) {
      const newOffsetX = event.clientX - this.panStartX;
      const newOffsetY = event.clientY - this.panStartY;
      
      if (Math.abs(newOffsetX - this.panOffsetX) > 3 || Math.abs(newOffsetY - this.panOffsetY) > 3) {
        this.hasMoved = true;
      }
      
      this.panOffsetX = newOffsetX;
      this.panOffsetY = newOffsetY;
      event.preventDefault();
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    if (this.isDrawing) {
      this.isDrawing = false;
      
      if (this.drawingPath.length > 1 && this.currentMap) {
        const visibleLayer = this.currentMap.layers?.find(l => l.visible);
        if (visibleLayer) {
          if (this.isEraserMode) {
            // Erase drawings that intersect with the eraser path and match the selected color
            this.drawingService.eraseDrawingsInArea(
              this.currentMap.id,
              visibleLayer.id,
              this.drawingPath,
              this.selectedDrawColor
            );
            this.loadDrawingsForCurrentMap();
          } else {
            // Add new drawing
            const newDrawing: DrawingLine = {
              id: 'd' + Date.now(),
              path: [...this.drawingPath],
              color: this.selectedDrawColor,
              layerId: visibleLayer.id,
              mapId: this.currentMap.id,
              type: 'freehand',
              timestamp: Date.now()
            };
            
            this.drawingService.addDrawing(newDrawing);
            this.drawnLines.push(newDrawing);
          }
        }
      }
      this.drawingPath = [];
    }
    
    // Close tooltip when clicking on map (not dragging)
    if (this.isPanning && !this.hasMoved && !this.showMarkerForm) {
      this.gameMapService.selectMarker(null);
    }
    
    if (this.isPanning) {
      this.isPanning = false;
    }
    
    setTimeout(() => {
      this.hasMoved = false;
    }, 50);
  }

  // Helper Methods
  getColorForType(type: string): string {
    const legendItem = this.legendItems.find(item => item.id === type);
    return legendItem?.color || '#667BC6';
  }
}
