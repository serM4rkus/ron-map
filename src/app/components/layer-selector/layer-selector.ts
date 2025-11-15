import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

export interface MapLayer {
  id: string;
  name: string;
  visible: boolean;
  zIndex: number;
  imageUrl: string;
}

@Component({
  selector: 'app-layer-selector',
  imports: [CommonModule],
  templateUrl: './layer-selector.html',
  styleUrl: './layer-selector.css',
})
export class LayerSelectorComponent {
  @Input() layers: MapLayer[] = [];
  @Output() layerSelected = new EventEmitter<string>();

  constructor(private languageService: LanguageService) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  selectLayer(layerId: string): void {
    this.layerSelected.emit(layerId);
  }
}
