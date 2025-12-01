import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { getMarkerConfig } from '../../config/marker-types.config';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapLegendComponent {
  @Input() legendItems: LegendItem[] = [];
  @Output() legendItemToggled = new EventEmitter<string>();
  @Output() showAll = new EventEmitter<void>();
  @Output() hideAll = new EventEmitter<void>();
  // Types to hide from the legend UI
  private readonly hiddenLegendTypes = new Set<string>(['stairs_down', 'stairs_up', 'stairs_up_down', 'comms']);
  
  // Collapse/expand state (expanded by default)
  isExpanded = true;

  // Legend items after filtering out hidden types
  get filteredLegendItems(): LegendItem[] {
    return this.legendItems.filter(item => !this.hiddenLegendTypes.has(item.id));
  }

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
    return this.filteredLegendItems.every(item => item.visible);
  }

  isAnyLegendItemVisible(): boolean {
    return this.filteredLegendItems.some(item => item.visible);
  }

  getMarkerIcon(itemId: string): string {
    const config = getMarkerConfig(itemId);
    return config.icon;
  }

  getMarkerIconColor(itemId: string): string {
    const config = getMarkerConfig(itemId);
    return config.iconColor;
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }
}
