import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LegendItem } from '../components/map-viewer/map-viewer';
import { MARKER_TYPE_CONFIGS } from '../config/marker-types.config';

export interface MapUIState {
  showMarkerForm: boolean;
  newMarkerX: number;
  newMarkerY: number;
  legendItems: LegendItem[];
}

@Injectable({
  providedIn: 'root',
})
export class MapStateService {
  private readonly uiStateSubject = new BehaviorSubject<MapUIState>({
    showMarkerForm: false,
    newMarkerX: 0,
    newMarkerY: 0,
    legendItems: MARKER_TYPE_CONFIGS.map(config => ({
      id: config.type,
      color: config.color,
      label: config.label,
      visible: true
    }))
  });

  public readonly uiState$ = this.uiStateSubject.asObservable();

  getUIState(): MapUIState {
    return this.uiStateSubject.getValue();
  }

  // Marker form management
  showMarkerForm(x: number, y: number): void {
    const current = this.uiStateSubject.getValue();
    this.uiStateSubject.next({
      ...current,
      showMarkerForm: true,
      newMarkerX: x,
      newMarkerY: y
    });
  }

  hideMarkerForm(): void {
    const current = this.uiStateSubject.getValue();
    this.uiStateSubject.next({
      ...current,
      showMarkerForm: false
    });
  }

  // Legend management
  toggleLegendItem(itemId: string): void {
    const current = this.uiStateSubject.getValue();
    const updatedItems = current.legendItems.map(item =>
      item.id === itemId ? { ...item, visible: !item.visible } : item
    );
    this.uiStateSubject.next({
      ...current,
      legendItems: updatedItems
    });
  }

  showAllLegendItems(): void {
    const current = this.uiStateSubject.getValue();
    const updatedItems = current.legendItems.map(item => ({
      ...item,
      visible: true
    }));
    this.uiStateSubject.next({
      ...current,
      legendItems: updatedItems
    });
  }

  hideAllLegendItems(): void {
    const current = this.uiStateSubject.getValue();
    const updatedItems = current.legendItems.map(item => ({
      ...item,
      visible: false
    }));
    this.uiStateSubject.next({
      ...current,
      legendItems: updatedItems
    });
  }

  getColorForType(type: string): string {
    const legendItem = this.uiStateSubject.getValue().legendItems.find(
      item => item.id === type
    );
    return legendItem?.color || '#667BC6';
  }
}
