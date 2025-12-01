import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface MapInteractionState {
  zoomLevel: number;
  panOffsetX: number;
  panOffsetY: number;
  isPanning: boolean;
  panStartX: number;
  panStartY: number;
  hasMoved: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MapInteractionService {
  private readonly MIN_ZOOM = 0.5;
  private readonly MAX_ZOOM = 3;
  private readonly ZOOM_STEP = 0.1;

  private readonly interactionState = new BehaviorSubject<MapInteractionState>({
    zoomLevel: 1,
    panOffsetX: 0,
    panOffsetY: 0,
    isPanning: false,
    panStartX: 0,
    panStartY: 0,
    hasMoved: false
  });

  public readonly state$ = this.interactionState.asObservable();

  getState(): MapInteractionState {
    return this.interactionState.getValue();
  }

  // Zoom operations
  zoomIn(): void {
    const current = this.interactionState.getValue();
    if (current.zoomLevel < this.MAX_ZOOM) {
      this.updateState({
        zoomLevel: Math.min(this.MAX_ZOOM, current.zoomLevel + this.ZOOM_STEP)
      });
    }
  }

  zoomOut(): void {
    const current = this.interactionState.getValue();
    if (current.zoomLevel > this.MIN_ZOOM) {
      this.updateState({
        zoomLevel: Math.max(this.MIN_ZOOM, current.zoomLevel - this.ZOOM_STEP)
      });
    }
  }

  resetZoom(): void {
    this.updateState({
      zoomLevel: 1,
      panOffsetX: 0,
      panOffsetY: 0
    });
  }

  handleMouseWheel(deltaY: number): void {
    if (deltaY < 0) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  }

  // Pan operations
  startPan(clientX: number, clientY: number): void {
    const current = this.interactionState.getValue();
    this.updateState({
      isPanning: true,
      panStartX: clientX - current.panOffsetX,
      panStartY: clientY - current.panOffsetY,
      hasMoved: false
    });
  }

  updatePan(clientX: number, clientY: number): void {
    const current = this.interactionState.getValue();
    if (!current.isPanning) return;

    const newOffsetX = clientX - current.panStartX;
    const newOffsetY = clientY - current.panStartY;

    // Check if movement is significant enough to be considered a "move"
    const hasMoved = 
      Math.abs(newOffsetX - current.panOffsetX) > 3 || 
      Math.abs(newOffsetY - current.panOffsetY) > 3;

    this.updateState({
      panOffsetX: newOffsetX,
      panOffsetY: newOffsetY,
      hasMoved: hasMoved || current.hasMoved
    });
  }

  endPan(): boolean {
    const current = this.interactionState.getValue();
    const wasPanning = current.isPanning;
    const hadMoved = current.hasMoved;

    this.updateState({
      isPanning: false
    });

    // Reset hasMoved after a short delay to allow click handlers to check it
    setTimeout(() => {
      this.updateState({ hasMoved: false });
    }, 50);

    return wasPanning && !hadMoved;
  }

  /**
   * Centers the viewport on a marker with given percentage coordinates
   * @param markerXPercent - Marker X position as percentage (0-100)
   * @param markerYPercent - Marker Y position as percentage (0-100)
   */
  centerOnMarker(markerXPercent: number, markerYPercent: number): void {
    const current = this.interactionState.getValue();
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate the center of the viewport
    const viewportCenterX = viewportWidth / 2;
    const viewportCenterY = viewportHeight / 2;
    
    // Convert marker percentage coordinates to viewport pixels
    // We need to consider that the map is scaled and positioned
    // The marker position is relative to the map's original size
    // We want to move the map so that the marker ends up in the viewport center
    
    // Calculate offset needed to center the marker
    // Since the marker is at markerXPercent% of the map width,
    // and we want it centered in the viewport, we need to offset the map
    // The offset calculation considers the current zoom level
    const effectiveScale = current.zoomLevel;
    
    // Calculate how much to shift the map to center the marker
    // This is an approximation that works well for typical viewport/map ratios
    const mapCenterOffsetX = (50 - markerXPercent) * (viewportWidth / 100) * effectiveScale;
    const mapCenterOffsetY = (50 - markerYPercent) * (viewportHeight / 100) * effectiveScale;
    
    this.updateState({
      panOffsetX: mapCenterOffsetX,
      panOffsetY: mapCenterOffsetY
    });
  }

  // State management
  private updateState(partial: Partial<MapInteractionState>): void {
    const current = this.interactionState.getValue();
    this.interactionState.next({ ...current, ...partial });
  }

  reset(): void {
    this.interactionState.next({
      zoomLevel: 1,
      panOffsetX: 0,
      panOffsetY: 0,
      isPanning: false,
      panStartX: 0,
      panStartY: 0,
      hasMoved: false
    });
  }
}
