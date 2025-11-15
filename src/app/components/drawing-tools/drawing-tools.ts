import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-drawing-tools',
  imports: [CommonModule],
  templateUrl: './drawing-tools.html',
  styleUrl: './drawing-tools.css',
})
export class DrawingToolsComponent {
  @Input() isDrawingMode: boolean = false;
  @Input() selectedColor: string = '#FF0000';
  @Input() colors: string[] = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];
  @Input() hasDrawings: boolean = false;

  @Output() drawingModeToggled = new EventEmitter<boolean>();
  @Output() colorSelected = new EventEmitter<string>();
  @Output() clearDrawings = new EventEmitter<void>();

  constructor(private readonly languageService: LanguageService) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  toggleDrawingMode(): void {
    this.drawingModeToggled.emit(!this.isDrawingMode);
  }

  selectColor(color: string): void {
    this.colorSelected.emit(color);
  }

  onClearDrawings(): void {
    this.clearDrawings.emit();
  }
}
