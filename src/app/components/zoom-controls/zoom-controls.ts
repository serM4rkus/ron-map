import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zoom-controls',
  imports: [CommonModule],
  templateUrl: './zoom-controls.html',
  styleUrl: './zoom-controls.css',
})
export class ZoomControlsComponent {
  @Input() zoomLevel: number = 1;
  @Input() minZoom: number = 0.5;
  @Input() maxZoom: number = 3;

  @Output() zoomIn = new EventEmitter<void>();
  @Output() zoomOut = new EventEmitter<void>();
  @Output() resetZoom = new EventEmitter<void>();

  getZoomPercentage(): number {
    return Math.round(this.zoomLevel * 100);
  }

  onZoomIn(): void {
    this.zoomIn.emit();
  }

  onZoomOut(): void {
    this.zoomOut.emit();
  }

  onResetZoom(): void {
    this.resetZoom.emit();
  }
}
