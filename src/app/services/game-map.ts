import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GAME_MAPS_METADATA, GameMapMetadata } from '../config/game-maps-metadata.config';

// Re-export for convenience
export type { GameMapMetadata };

export interface MarkerConnection {
  /** ID of the target marker to connect to */
  targetId: string;
  /** Optional custom label to display in navigation modal. 
   * If not provided, the target marker's title will be used. */
  label?: string;
}

export interface GameMarker {
  id: string;
  x: number;
  y: number;
  title: string;
  description?: string;
  type: 'spawn' | 'hard_objective' | 'soft_objective' | 'stairs_down' | 'stairs_up' | 'stairs_up_down' | 'comms';
  color?: string;
  icon?: string;
  /** Optional URL to a custom SVG image to use as the marker icon. If provided,
   * the SVG will be rendered instead of the material icon name. Use relative
   * or absolute URLs. Example: '/assets/icons/custom-flag.svg' */
  svgIconUrl?: string;
  layerId?: string;
  /** Array of connections for stairs navigation. Supports both simple string array (marker IDs)
   * for backward compatibility, or connection objects with targetId and optional label.
   * Example: ['marker1', 'marker2'] or [{ targetId: 'marker1', label: 'Go to Floor 2' }] */
  connections?: (string | MarkerConnection)[];
  /** If true, automatically navigate to first connection without showing modal,
   * and pulse all connected markers on the target floor. Useful for showing all stairs on a floor at once. */
  autoNavigateAll?: boolean;
}

export interface MapLayer {
  id: string;
  name: string;
  imageUrl: string;
  visible: boolean;
  zIndex: number;
  isDefault?: boolean; // Optional flag to mark the default layer to load first
}

export interface MapObjective {
  id: string;
  title: string;
  description?: string;
  type: 'hard' | 'soft';
  completed?: boolean;
  markerIds?: string[]; // IDs of markers associated with this objective
  floorName?: string; // Name of the floor where objective is located
}

export interface GameMapConfig {
  id: string;
  name: string;
  width: number;
  height: number;
  markers: GameMarker[];
  description?: string;
  layers?: MapLayer[];
  objectives?: MapObjective[];
}

@Injectable({
  providedIn: 'root',
})

export class GameMapService {
  private readonly currentMapSubject = new BehaviorSubject<GameMapConfig | null>(null);
  public currentMap$ = this.currentMapSubject.asObservable();

  private readonly markersSubject = new BehaviorSubject<GameMarker[]>([]);
  public markers$ = this.markersSubject.asObservable();

  private readonly selectedMarkerSubject = new BehaviorSubject<GameMarker | null>(null);
  public selectedMarker$ = this.selectedMarkerSubject.asObservable();

  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private readonly pulsingMarkersSubject = new BehaviorSubject<string[]>([]);
  public pulsingMarkers$ = this.pulsingMarkersSubject.asObservable();

  private readonly gameMapsMetadata: GameMapMetadata[] = GAME_MAPS_METADATA;
  private readonly loadedMaps = new Map<string, GameMapConfig>();
  private pulsingTimeout: any = null;
  
  // Constants for navigation timing
  private readonly LAYER_SWITCH_DELAY = 250;
  private readonly PULSE_DURATION = 2000;

  getAvailableMaps(): GameMapMetadata[] {
    return this.gameMapsMetadata;
  }

  async loadMap(mapId: string): Promise<void> {
    this.loadingSubject.next(true);
    
    try {
      // Check if map is already loaded in cache
      let map = this.loadedMaps.get(mapId);
      
      if (!map) {
        // Lazy load the map configuration
        const metadata = this.gameMapsMetadata.find(m => m.id === mapId);
        if (!metadata) {
          console.error(`Map with id '${mapId}' not found`);
          this.loadingSubject.next(false);
          return;
        }
        
        // Load the map configuration directly
        map = await metadata.loader();
        
        // Cache the loaded map
        this.loadedMaps.set(mapId, map);
      }
      
      // Simulate loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Find the default layer or fall back to the first layer
      const defaultLayer = map.layers?.find(layer => layer.isDefault);
      const defaultLayerId = defaultLayer?.id || map.layers?.[0]?.id;
      
      // Reset layers to default visibility
      const resetMap = {
        ...map,
        layers: map.layers?.map(layer => ({
          ...layer,
          visible: layer.id === defaultLayerId
        }))
      };
      
      this.currentMapSubject.next(resetMap);
      this.markersSubject.next(resetMap.markers);
    } catch (error) {
      console.error(`Error loading map '${mapId}':`, error);
    } finally {
      this.loadingSubject.next(false);
    }
  }

  getCurrentMap(): GameMapConfig | null {
    return this.currentMapSubject.getValue();
  }

  // Marker Management
  selectMarker(marker: GameMarker | null): void {
    this.selectedMarkerSubject.next(marker);
  }

  getSelectedMarker(): GameMarker | null {
    return this.selectedMarkerSubject.getValue();
  }

  addMarker(marker: GameMarker): void {
    const currentMarkers = this.markersSubject.getValue();
    const updatedMarkers = [...currentMarkers, marker];
    this.markersSubject.next(updatedMarkers);
    
    // Update markers in the current map
    const currentMap = this.currentMapSubject.getValue();
    if (currentMap) {
      const updatedMap = { ...currentMap, markers: updatedMarkers };
      this.currentMapSubject.next(updatedMap);
      
      // Update the map reference in the cache
      this.loadedMaps.set(currentMap.id, updatedMap);
    }
  }

  removeMarker(markerId: string): void {
    const currentMarkers = this.markersSubject.getValue();
    const updatedMarkers = currentMarkers.filter(m => m.id !== markerId);
    this.markersSubject.next(updatedMarkers);
    
    // Clear selection if the removed marker was selected
    if (this.selectedMarkerSubject.getValue()?.id === markerId) {
      this.selectedMarkerSubject.next(null);
    }
    
    // Update markers in the current map
    const currentMap = this.currentMapSubject.getValue();
    if (currentMap) {
      const updatedMap = { ...currentMap, markers: updatedMarkers };
      this.currentMapSubject.next(updatedMap);
      
      // Update the map reference in the cache
      this.loadedMaps.set(currentMap.id, updatedMap);
    }
  }

  updateMarker(markerId: string, updates: Partial<GameMarker>): void {
    const currentMarkers = this.markersSubject.getValue();
    const updatedMarkers = currentMarkers.map(m => 
      m.id === markerId ? { ...m, ...updates } : m
    );
    this.markersSubject.next(updatedMarkers);
    
    // Update selected marker if it was updated
    const selectedMarker = this.selectedMarkerSubject.getValue();
    if (selectedMarker?.id === markerId) {
      this.selectedMarkerSubject.next({ ...selectedMarker, ...updates });
    }
    
    // Update markers in the current map
    const currentMap = this.currentMapSubject.getValue();
    if (currentMap) {
      const updatedMap = { ...currentMap, markers: updatedMarkers };
      this.currentMapSubject.next(updatedMap);
      
      // Update the map reference in the cache
      this.loadedMaps.set(currentMap.id, updatedMap);
    }
  }

  // Layer Management
  selectLayer(layerId: string): void {
    const currentMap = this.currentMapSubject.getValue();
    if (currentMap?.layers) {
      this.loadingSubject.next(true);
      
      // Simulate loading delay for better UX
      setTimeout(() => {
        // Set all layers to invisible except the selected one
        const updatedLayers = currentMap.layers!.map(layer => ({
          ...layer,
          visible: layer.id === layerId
        }));
        const updatedMap = { ...currentMap, layers: updatedLayers };
        this.currentMapSubject.next(updatedMap);
        
        // Update the map reference in the cache
        this.loadedMaps.set(currentMap.id, updatedMap);
        
        this.loadingSubject.next(false);
      }, 200);
    }
  }

  // Stairs Navigation
  navigateToConnectedMarker(targetMarkerId: string, sourceMarkerId?: string): void {
    const markerIds = sourceMarkerId ? [sourceMarkerId, targetMarkerId] : [targetMarkerId];
    this.navigateAndPulseMarkers(targetMarkerId, markerIds);
  }

  navigateAndPulseAllConnections(sourceMarkerId: string, connectionIds: string[]): void {
    if (connectionIds.length === 0) return;
    const markerIds = [sourceMarkerId, ...connectionIds];
    this.navigateAndPulseMarkers(connectionIds[0], markerIds);
  }

  private navigateAndPulseMarkers(targetMarkerId: string, markerIds: string[]): void {
    const targetMarker = this.markersSubject.getValue().find(m => m.id === targetMarkerId);
    
    if (targetMarker?.layerId) {
      this.selectLayer(targetMarker.layerId);
      
      // Use Set for O(1) deduplication instead of O(n²) filter
      const uniqueMarkerIds = Array.from(new Set(markerIds));
      
      setTimeout(() => {
        this.startPulsingMarkers(uniqueMarkerIds);
      }, this.LAYER_SWITCH_DELAY);
    }
  }

  startPulsingMarker(markerId: string): void {
    this.startPulsingMarkers([markerId]);
  }

  startPulsingMarkers(markerIds: string[]): void {
    // Clear any existing pulsing timeout
    if (this.pulsingTimeout) {
      clearTimeout(this.pulsingTimeout);
      this.pulsingTimeout = null;
    }
    
    // Set the pulsing markers
    this.pulsingMarkersSubject.next(markerIds);
    
    // Stop pulsing after configured duration
    this.pulsingTimeout = setTimeout(() => {
      this.pulsingMarkersSubject.next([]);
      this.pulsingTimeout = null;
    }, this.PULSE_DURATION);
  }

  getPulsingMarkers(): string[] {
    return this.pulsingMarkersSubject.getValue();
  }
}
