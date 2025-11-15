import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DrawingLine } from '../components/map-viewer/map-viewer';

@Injectable({
  providedIn: 'root',
})
export class DrawingService {
  private readonly STORAGE_KEY = 'ron-map-drawings';
  private readonly drawingsSubject = new BehaviorSubject<DrawingLine[]>([]);
  public drawings$ = this.drawingsSubject.asObservable();

  constructor() {
    this.loadDrawings();
  }

  private loadDrawings(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const drawings = JSON.parse(stored) as DrawingLine[];
        this.drawingsSubject.next(drawings);
      }
    } catch (error) {
      console.error('Failed to load drawings:', error);
    }
  }

  private saveDrawings(): void {
    try {
      const drawings = this.drawingsSubject.getValue();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(drawings));
    } catch (error) {
      console.error('Failed to save drawings:', error);
    }
  }

  getDrawings(): DrawingLine[] {
    return this.drawingsSubject.getValue();
  }

  getDrawingsForMapAndLayer(mapId: string, layerId: string): DrawingLine[] {
    return this.drawingsSubject.getValue().filter(
      d => d.mapId === mapId && d.layerId === layerId
    );
  }

  addDrawing(drawing: DrawingLine): void {
    const drawings = this.drawingsSubject.getValue();
    const updated = [...drawings, drawing];
    this.drawingsSubject.next(updated);
    this.saveDrawings();
  }

  removeDrawing(drawingId: string): void {
    const drawings = this.drawingsSubject.getValue();
    const updated = drawings.filter(d => d.id !== drawingId);
    this.drawingsSubject.next(updated);
    this.saveDrawings();
  }

  clearDrawingsForMap(mapId: string): void {
    const drawings = this.drawingsSubject.getValue();
    const updated = drawings.filter(d => d.mapId !== mapId);
    this.drawingsSubject.next(updated);
    this.saveDrawings();
  }

  clearDrawingsForLayer(mapId: string, layerId: string): void {
    const drawings = this.drawingsSubject.getValue();
    const updated = drawings.filter(d => !(d.mapId === mapId && d.layerId === layerId));
    this.drawingsSubject.next(updated);
    this.saveDrawings();
  }

  clearAllDrawings(): void {
    this.drawingsSubject.next([]);
    this.saveDrawings();
  }
}
