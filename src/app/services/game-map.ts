import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GAME_MAPS } from '../config/game-maps.config';

export interface GameMarker {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  type: 'spawn' | 'resource' | 'wonder' | 'unit' | 'custom';
  color?: string;
  icon?: string;
  layerId?: string;
}

export interface MapLayer {
  id: string;
  name: string;
  imageUrl: string;
  visible: boolean;
  zIndex: number;
}

export interface GameMapConfig {
  id: string;
  name: string;
  imageUrl: string;
  width: number;
  height: number;
  markers: GameMarker[];
  description?: string;
  layers?: MapLayer[];
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

  private readonly gameMaps: GameMapConfig[] = GAME_MAPS;

  getAvailableMaps(): GameMapConfig[] {
    return this.gameMaps;
  }

  loadMap(mapId: string): void {
    const map = this.gameMaps.find(m => m.id === mapId);
    if (map) {
      this.loadingSubject.next(true);
      
      // Simulate loading delay for better UX
      setTimeout(() => {
        // Reset layers to default visibility (first layer visible)
        const resetMap = {
          ...map,
          layers: map.layers?.map((layer, index) => ({
            ...layer,
            visible: index === 0
          }))
        };
        this.currentMapSubject.next(resetMap);
        this.markersSubject.next(resetMap.markers);
        this.loadingSubject.next(false);
      }, 300);
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
      
      // Update the map reference in the gameMaps array
      const mapIndex = this.gameMaps.findIndex(m => m.id === currentMap.id);
      if (mapIndex !== -1) {
        (this.gameMaps as any)[mapIndex] = updatedMap;
      }
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
      
      // Update the map reference in the gameMaps array
      const mapIndex = this.gameMaps.findIndex(m => m.id === currentMap.id);
      if (mapIndex !== -1) {
        (this.gameMaps as any)[mapIndex] = updatedMap;
      }
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
      
      // Update the map reference in the gameMaps array
      const mapIndex = this.gameMaps.findIndex(m => m.id === currentMap.id);
      if (mapIndex !== -1) {
        (this.gameMaps as any)[mapIndex] = updatedMap;
      }
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
        
        // Update the map reference in the gameMaps array
        const mapIndex = this.gameMaps.findIndex(m => m.id === currentMap.id);
        if (mapIndex !== -1) {
          (this.gameMaps as any)[mapIndex] = updatedMap;
        }
        
        this.loadingSubject.next(false);
      }, 200);
    }
  }
}
