import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameMapConfig, GameMarker } from '../../services/game-map';

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
  @Input() panOffsetX: number = 0;
  @Input() panOffsetY: number = 0;
  @Input() markers: GameMarker[] = [];
  @Input() drawnLines: DrawingLine[] = [];
  @Input() isDrawingMode: boolean = false;
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
    return {
      transform: `scale(${this.zoomLevel}) translate(${this.panOffsetX / this.zoomLevel}px, ${this.panOffsetY / this.zoomLevel}px)`,
      'transform-origin': 'center center',
      transition: this.isPanning || this.isDrawing ? 'none' : 'transform 0.1s ease-out',
      'will-change': this.isPanning || this.isDrawing ? 'transform' : 'auto'
    };
  }

  getMarkerStyle(marker: GameMarker): any {
    return {
      left: marker.x + 'px',
      top: marker.y + 'px'
    };
  }

  getMarkerClass(marker: GameMarker): any {
    return {
      'marker': true,
      'marker-spawn': marker.type === 'spawn',
      'marker-resource': marker.type === 'resource',
      'marker-wonder': marker.type === 'wonder',
      'marker-unit': marker.type === 'unit',
      'marker-selected': this.selectedMarker?.id === marker.id
    };
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
    if (this.isDrawingMode) return 'crosshair';
    return 'grab';
  }

  onMapClick(event: MouseEvent): void {
    const rect = (event.target as HTMLImageElement).getBoundingClientRect();
    const clickX = (event.clientX - rect.left) / this.zoomLevel;
    const clickY = (event.clientY - rect.top) / this.zoomLevel;
    
    this.mapClick.emit({
      x: Math.round(clickX),
      y: Math.round(clickY)
    });
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
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) / this.zoomLevel;
    const mouseY = (event.clientY - rect.top) / this.zoomLevel;
    
    this.currentCoords = {
      x: Math.round(mouseX),
      y: Math.round(mouseY)
    };
    this.showCoords = true;
  }

  onMapMouseLeave(): void {
    this.showCoords = false;
    this.currentCoords = null;
  }
}
