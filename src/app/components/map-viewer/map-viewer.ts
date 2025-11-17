import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameMapConfig, GameMarker } from '../../services/game-map';
import { getMarkerConfig } from '../../config/marker-types.config';

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
  imports: [CommonModule],
  templateUrl: './map-viewer.html',
  styleUrl: './map-viewer.css',
})
export class MapViewerComponent {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  @Input() currentMap: GameMapConfig | null = null;
  @Input() zoomLevel: number = 1;
  @Input() baseScale: number = 1;
  @Input() panOffsetX: number = 0;
  @Input() panOffsetY: number = 0;
  @Input() markers: GameMarker[] = [];
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

  getMapStyle(): any {
    const effectiveScale = (this.baseScale || 1) * (this.zoomLevel || 1);
    return {
      transform: `scale(${effectiveScale}) translate(${this.panOffsetX / effectiveScale}px, ${this.panOffsetY / effectiveScale}px)`,
      'transform-origin': 'center center',
      transition: this.isPanning || this.isDrawing ? 'none' : 'transform 0.1s ease-out',
      'will-change': this.isPanning || this.isDrawing ? 'transform' : 'auto'
    };
  }

  getMarkerStyle(marker: GameMarker): any {
    // With image-wrapper as inline-block, the wrapper matches the image dimensions exactly
    // So percentage positioning works correctly across all aspect ratios
    return {
      left: marker.x + '%',
      top: marker.y + '%'
    };
  }

  getMarkerClass(marker: GameMarker): any {
    return {
      'marker': true,
      'marker-spawn': marker.type === 'spawn',
      'marker-hard-objective': marker.type === 'hard_objective',
      'marker-soft-objective': marker.type === 'soft_objective',
      'marker-selected': this.selectedMarker?.id === marker.id
    };
  }

  getMarkerIcon(marker: GameMarker): string {
    const config = getMarkerConfig(marker.type);
    return config.icon;
  }

  getMarkerColor(marker: GameMarker): string {
    // Use custom color if provided, otherwise use config color
    if (marker.color) {
      return marker.color;
    }
    const config = getMarkerConfig(marker.type);
    return config.color;
  }

  getMarkerIconColor(marker: GameMarker): string {
    const config = getMarkerConfig(marker.type);
    return config.iconColor;
  }

  getVisibleMarkers(): GameMarker[] {
    if (!this.currentMap) return [];
    
    const visibleLayerIds = new Set(
      this.currentMap.layers?.filter(l => l.visible).map(l => l.id) || []
    );
    const visibleLegendTypes = new Set(
      this.legendItems.filter(item => item.visible).map(item => item.id)
    );
    
    return this.markers.filter(marker => {
      const layerVisible = !marker.layerId || visibleLayerIds.has(marker.layerId);
      const typeVisible = visibleLegendTypes.has(marker.type);
      return layerVisible && typeVisible;
    });
  }

  getDrawingPathString(path: { x: number; y: number }[]): string {
    if (path.length === 0) return '';
    return path.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');
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

  selectMarker(marker: GameMarker, event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
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
}
