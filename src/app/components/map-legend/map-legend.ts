import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

export interface LegendItem {
  id: string;
  color: string;
  label: string;
  visible: boolean;
}

@Component({
  selector: 'app-map-legend',
  imports: [CommonModule],
  templateUrl: './map-legend.html',
  styleUrl: './map-legend.css',
})
export class MapLegendComponent {
  @Input() legendItems: LegendItem[] = [];
  @Output() legendItemToggled = new EventEmitter<string>();
  @Output() showAll = new EventEmitter<void>();
  @Output() hideAll = new EventEmitter<void>();

  constructor(private readonly languageService: LanguageService) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  toggleLegendItem(itemId: string): void {
    this.legendItemToggled.emit(itemId);
  }

  showAllLegendItems(): void {
    this.showAll.emit();
  }

  hideAllLegendItems(): void {
    this.hideAll.emit();
  }

  areAllLegendItemsVisible(): boolean {
    return this.legendItems.every(item => item.visible);
  }

  isAnyLegendItemVisible(): boolean {
    return this.legendItems.some(item => item.visible);
  }
}
