import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameMapConfig, GameMarker, MapObjective } from '../../services/game-map';
import { MarkerRendererComponent } from '../marker-renderer/marker-renderer';
import { CoordinateTrackerComponent } from '../coordinate-tracker/coordinate-tracker';
import { DrawingLayerComponent } from '../drawing-layer/drawing-layer';
import { ComputedCache } from '../../utils/memoize.util';
import { MARKER_TYPE_CONFIGS } from '../../config/marker-types.config';

export interface DrawingLine {
  id: string;
  path: { x: number; y: number }[];
  color: string;
  layerId: string;
  mapId: string;
  type: 'freehand' | 'line' | 'rectangle' | 'circle';
  timestamp: number;
}

export interface LegendItem {
  id: string;
  color: string;
  label: string;
  visible: boolean;
}

@Component({
  selector: 'app-map-viewer',
  imports: [CommonModule, MarkerRendererComponent, CoordinateTrackerComponent, DrawingLayerComponent],
  templateUrl: './map-viewer.html',
  styleUrl: './map-viewer.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapViewerComponent {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  @Input() currentMap: GameMapConfig | null = null;
  @Input() zoomLevel: number = 1;
  @Input() baseScale: number = 1;
  @Input() panOffsetX: number = 0;
  @Input() panOffsetY: number = 0;
  @Input() markers: GameMarker[] = [];
  @Input() objectives: MapObjective[] = [];
  @Input() drawnLines: DrawingLine[] = [];
  @Input() isDrawingMode: boolean = false;
  @Input() isEraserMode: boolean = false;
  @Input() selectedMarker: GameMarker | null = null;
  @Input() selectedDrawColor: string = '#FF0000';
  @Input() legendItems: LegendItem[] = [];
  @Input() isPanning: boolean = false;
  @Input() isDrawing: boolean = false;
  @Input() drawingPath: { x: number; y: number }[] = [];
  @Input() isLoading: boolean = false;

  @Output() mapClick = new EventEmitter<{ x: number; y: number }>();
  @Output() markerClick = new EventEmitter<GameMarker>();
  @Output() mouseWheel = new EventEmitter<WheelEvent>();
  @Output() mouseDown = new EventEmitter<MouseEvent>();
  @Output() mouseMove = new EventEmitter<MouseEvent>();
  @Output() mouseUp = new EventEmitter<MouseEvent>();
  @Output() layerSelected = new EventEmitter<string>();

  // Coordinate tracking
  currentCoords: { x: number; y: number } | null = null;
  showCoords: boolean = false;

  // Memoized map style computation
  private readonly mapStyleCache = new ComputedCache<any>(
    (baseScale: number, zoomLevel: number, panOffsetX: number, panOffsetY: number, isPanning: boolean, isDrawing: boolean) => {
      const effectiveScale = (baseScale || 1) * (zoomLevel || 1);
      return {
        transform: `scale(${effectiveScale}) translate(${panOffsetX / effectiveScale}px, ${panOffsetY / effectiveScale}px)`,
        'transform-origin': 'center center',
        transition: isPanning || isDrawing ? 'none' : 'transform 0.1s ease-out',
        'will-change': isPanning || isDrawing ? 'transform' : 'auto'
      };
    }
  );

  getMapStyle(): any {
    // Use memoized cache to avoid recomputing styles on every change detection
    return this.mapStyleCache.get(
      this.baseScale,
      this.zoomLevel,
      this.panOffsetX,
      this.panOffsetY,
      this.isPanning,
      this.isDrawing
    );
  }

  getCursor(): string {
    if (this.isPanning) return 'grabbing';
    if (this.isDrawingMode) {
      return this.isEraserMode ? 'not-allowed' : 'crosshair';
    }
    return 'grab';
  }

  onMapClick(event: MouseEvent): void {
    // Find the actual image element and compute percent coords relative to it
    const current = event.currentTarget as HTMLElement | null;
    let img: HTMLImageElement | null = null;

    if (current) img = current.querySelector('.layer-image');
    if (!img) {
      const target = event.target as HTMLElement | null;
      img = target?.closest('.image-wrapper')?.querySelector('.layer-image') || null;
    }
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    const percentX = (clickX / rect.width) * 100;
    const percentY = (clickY / rect.height) * 100;

    this.mapClick.emit({ x: Math.round(percentX * 100) / 100, y: Math.round(percentY * 100) / 100 });
  }

  onMarkerClickFromRenderer(marker: GameMarker): void {
    this.markerClick.emit(marker);
  }

  onMouseDown(event: MouseEvent): void {
    this.mouseDown.emit(event);
  }

  onMouseWheel(event: WheelEvent): void {
    this.mouseWheel.emit(event);
  }

  selectLayer(layerId: string): void {
    this.layerSelected.emit(layerId);
  }

  onMapMouseMove(event: MouseEvent): void {
    // Get the actual image element to calculate coordinates relative to it
    const target = event.currentTarget as HTMLElement;
    const imgElement = target.querySelector('.layer-image') as HTMLImageElement;

    if (!imgElement) {
      this.showCoords = false;
      return;
    }

    const rect = imgElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Check if mouse is within the image bounds
    if (mouseX < 0 || mouseX > rect.width || mouseY < 0 || mouseY > rect.height) {
      this.showCoords = false;
      this.currentCoords = null;
      return;
    }

    // Convert to percentage coordinates
    const percentX = (mouseX / rect.width) * 100;
    const percentY = (mouseY / rect.height) * 100;

    this.currentCoords = {
      x: Math.round(percentX * 100) / 100, // Round to 2 decimal places
      y: Math.round(percentY * 100) / 100
    };
    this.showCoords = true;
  }

  onMapMouseLeave(): void {
    this.showCoords = false;
    this.currentCoords = null;
  }

  /**
   * Get visible markers, filtering out markers associated with completed objectives
   * (excluding obj_order and obj_rescue which are always visible)
   */
  get visibleMarkers(): GameMarker[] {
    if (!this.objectives || this.objectives.length === 0) {
      return this.markers;
    }

    // Get IDs of markers that should be hidden (from completed objectives)
    const hiddenMarkerIds = new Set<string>();

    this.objectives.forEach(objective => {
      // Skip obj_order and obj_rescue - their markers are always visible
      if (objective.id === 'obj_order' || objective.id === 'obj_rescue') {
        return;
      }

      // If objective is completed and has associated markers, hide them
      if (objective.completed && objective.markerIds) {
        objective.markerIds.forEach(markerId => hiddenMarkerIds.add(markerId));
      }
    });

    // Filter out hidden markers
    return this.markers.filter(marker => !hiddenMarkerIds.has(marker.id));
  }

  /** 
   * Check if layer has spawn markers
   * @param  layerId - the layer ID to check
   * @returns true if layer has at lease one spawn point
   */
  hasSpawnMarkers(layerId: string): boolean {
    return this.markers.some( marker => 
      marker.layerId === layerId && marker.type === 'spawn'
    );
  }
}
