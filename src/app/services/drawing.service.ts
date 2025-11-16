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

  eraseDrawingsInArea(mapId: string, layerId: string, eraserPath: { x: number; y: number }[], color?: string): void {
    if (eraserPath.length < 2) return;

    const drawings = this.drawingsSubject.getValue();
    const eraserRadius = 5; // Radius around eraser path to check for intersections

    const updated = drawings.filter(drawing => {
      // Only check drawings on the same map and layer
      if (drawing.mapId !== mapId || drawing.layerId !== layerId) {
        return true;
      }

      // If a color is provided, only consider drawings with that color;
      // otherwise, default to erasing any drawing intersecting the area.
      if (color && drawing.color !== color) {
        return true;
      }

      // Check if any point in the drawing path intersects with the eraser path
      for (const drawPoint of drawing.path) {
        for (const eraserPoint of eraserPath) {
          const distance = Math.sqrt(
            Math.pow(drawPoint.x - eraserPoint.x, 2) + 
            Math.pow(drawPoint.y - eraserPoint.y, 2)
          );

          // If the distance is within the eraser radius, remove this drawing
          if (distance < eraserRadius) {
            return false;
          }
        }
      }

      return true;
    });

    this.drawingsSubject.next(updated);
    this.saveDrawings();
  }
}
