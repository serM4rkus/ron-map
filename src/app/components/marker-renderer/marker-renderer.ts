import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameMarker, GameMapService, MarkerConnection } from '../../services/game-map';
import { getMarkerConfig } from '../../config/marker-types.config';
import { LegendItem } from '../map-viewer/map-viewer';
import { ComputedCache } from '../../utils/memoize.util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-marker-renderer',
  imports: [CommonModule],
  templateUrl: './marker-renderer.html',
  styleUrl: './marker-renderer.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkerRendererComponent implements OnInit, OnDestroy {
  @Input() markers: GameMarker[] = [];
  @Input() currentMapLayers: any[] = [];
  @Input() legendItems: LegendItem[] = [];
  @Input() selectedMarker: GameMarker | null = null;

  @Output() markerClick = new EventEmitter<GameMarker>();

  hoveredMarkerId: string | null = null;
  private pulsingMarkerIds = new Set<string>();
  showingConnectionsForMarkerId: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private gameMapService: GameMapService,
    private cdr: ChangeDetectorRef
  ) {}

  // Memoized computation for visible markers
  private readonly visibleMarkersCache = new ComputedCache<GameMarker[]>(
    (markers: GameMarker[], layers: any[], legendItems: LegendItem[]) => {
      if (!layers || layers.length === 0) return [];
      
      const visibleLayerIds = new Set(
        layers.filter(l => l.visible).map(l => l.id)
      );
      const visibleLegendTypes = new Set(
        legendItems.filter(item => item.visible).map(item => item.id)
      );
      
      return markers.filter(marker => {
        const layerVisible = !marker.layerId || visibleLayerIds.has(marker.layerId);
        const typeVisible = visibleLegendTypes.has(marker.type);
        return layerVisible && typeVisible;
      });
    }
  );

  getMarkerStyle(marker: GameMarker): any {
    return {
      left: marker.x + '%',
      top: marker.y + '%'
    };
  }

  ngOnInit(): void {
    // Subscribe to pulsing markers changes
    this.gameMapService.pulsingMarkers$
      .pipe(takeUntil(this.destroy$))
      .subscribe(markerIds => {
        this.pulsingMarkerIds = new Set(markerIds);
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getMarkerClass(marker: GameMarker): any {
    return {
      'marker': true,
      'marker-spawn': marker.type === 'spawn',
      'marker-hard-objective': marker.type === 'hard_objective',
      'marker-soft-objective': marker.type === 'soft_objective',
      'marker-stairs-down': marker.type === 'stairs_down',
      'marker-stairs-up': marker.type === 'stairs_up',
      'marker-stairs-up-down': marker.type === 'stairs_up_down',
      'marker-comms': marker.type === 'comms',
      'marker-selected': this.selectedMarker?.id === marker.id,
      'marker-pulsing': this.pulsingMarkerIds.has(marker.id)
    };
  }

  getMarkerIcon(marker: GameMarker): string {
    const config = getMarkerConfig(marker.type);
    return config.icon;
  }

  getMarkerSvgUrl(marker: GameMarker): string | undefined {
    if (marker.svgIconUrl) return marker.svgIconUrl;
    const config = getMarkerConfig(marker.type) as any;
    return config?.svgIconUrl;
  }

  getMarkerColor(marker: GameMarker): string {
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
    // Use memoized cache to avoid recomputing on every change detection cycle
    return this.visibleMarkersCache.get(
      this.markers,
      this.currentMapLayers,
      this.legendItems
    );
  }

  onMarkerClick(marker: GameMarker, event: Event): void {
    // Handle stairs navigation
    if (marker.type === 'stairs_down' || 
        marker.type === 'stairs_up' || 
        marker.type === 'stairs_up_down') {
      event.stopPropagation();
      event.preventDefault();
      this.handleStairsClick(marker);
      return;
    }
    
    // Handle comms markers (keep original behavior)
    if (marker.type === 'comms') {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    
    if ((event as KeyboardEvent).key) {
      const fakeMouse = new MouseEvent('click');
      this.selectMarker(marker, fakeMouse);
    } else {
      this.selectMarker(marker, event as unknown as MouseEvent);
    }
  }

  handleStairsClick(marker: GameMarker): void {
    if (!marker.connections || marker.connections.length === 0) {
      console.warn(`Stairs marker ${marker.id} has no connections defined`);
      return;
    }

    // If autoNavigateAll is true, navigate to first connection and pulse all targets
    if (marker.autoNavigateAll && marker.connections.length > 0) {
      const connectionIds = marker.connections.map(conn => this.getConnectionTargetId(conn));
      this.gameMapService.navigateAndPulseAllConnections(marker.id, connectionIds);
      return;
    }

    // If marker has only one connection, navigate directly
    if (marker.connections.length === 1) {
      const targetId = this.getConnectionTargetId(marker.connections[0]);
      this.navigateToMarker(targetId, marker.id);
    } else {
      // If marker has multiple connections, show selection menu
      this.showingConnectionsForMarkerId = marker.id;
      this.cdr.markForCheck();
    }
  }

  navigateToMarker(targetMarkerId: string, sourceMarkerId?: string): void {
    this.gameMapService.navigateToConnectedMarker(targetMarkerId, sourceMarkerId);
    this.showingConnectionsForMarkerId = null;
    this.cdr.markForCheck();
  }

  closeConnectionMenu(): void {
    this.showingConnectionsForMarkerId = null;
    this.cdr.markForCheck();
  }

  getConnectionTargetId(connection: string | MarkerConnection): string {
    return typeof connection === 'string' ? connection : connection.targetId;
  }

  getConnectionLabel(connection: string | MarkerConnection): string | undefined {
    return typeof connection === 'string' ? undefined : connection.label;
  }

  getConnectionTitle(connection: string | MarkerConnection): string {
    const targetId = this.getConnectionTargetId(connection);
    const customLabel = this.getConnectionLabel(connection);
    
    // Use custom label if provided
    if (customLabel) {
      return customLabel;
    }
    
    // Fall back to the connection marker's title
    const connectionMarker = this.markers.find(m => m.id === targetId);
    return connectionMarker?.title || 'Unknown';
  }

  selectMarker(marker: GameMarker, event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.markerClick.emit(marker);
  }

  onMarkerHover(marker: GameMarker): void {
    if (marker.type === 'stairs_down' || 
        marker.type === 'stairs_up' || 
        marker.type === 'stairs_up_down' || 
        marker.type === 'comms') {
      this.hoveredMarkerId = marker.id;
    }
  }

  onMarkerHoverLeave(): void {
    this.hoveredMarkerId = null;
  }

  shouldShowTooltip(marker: GameMarker): boolean {
    if (this.selectedMarker?.id === marker.id) return true;
    if ((marker.type === 'stairs_down' || 
         marker.type === 'stairs_up' || 
         marker.type === 'stairs_up_down' || 
         marker.type === 'comms') && 
        this.hoveredMarkerId === marker.id) return true;
    return false;
  }
}
