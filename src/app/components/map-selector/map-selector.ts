import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameMapConfig } from '../../services/game-map';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../config/languages.config';

@Component({
  selector: 'app-map-selector',
  imports: [CommonModule, FormsModule],
  templateUrl: './map-selector.html',
  styleUrl: './map-selector.css',
})
export class MapSelectorComponent implements OnChanges {
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;
  
  @Input() maps: GameMapConfig[] = [];
  @Input() currentMapId: string | null = null;
  @Input() availableLanguages: Language[] = [];
  @Input() currentLanguage: string = 'en';
  
  @Output() mapSelected = new EventEmitter<string>();
  @Output() languageChanged = new EventEmitter<string>();

  dropdownOpen = false;
  searchQuery = '';
  filteredMaps: GameMapConfig[] = [];
  highlightedIndex = -1;

  constructor(private readonly languageService: LanguageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['maps']) {
      this.filteredMaps = [...this.maps];
    }
  }

  get currentMap(): GameMapConfig | null {
    return this.maps.find(m => m.id === this.currentMapId) || null;
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
    
    if (this.dropdownOpen) {
      setTimeout(() => this.searchInput?.nativeElement?.focus(), 100);
    } else {
      this.searchQuery = '';
      this.filteredMaps = [...this.maps];
      this.highlightedIndex = -1;
    }
  }

  filterMaps(): void {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.filteredMaps = [...this.maps];
    } else {
      this.filteredMaps = this.maps.filter(map =>
        this.translate(map.name).toLowerCase().includes(query) ||
        map.description?.toLowerCase().includes(query)
      );
    }
    this.highlightedIndex = -1;
  }

  selectMap(mapId: string): void {
    this.mapSelected.emit(mapId);
    this.dropdownOpen = false;
    this.searchQuery = '';
    this.filteredMaps = [...this.maps];
    this.highlightedIndex = -1;
  }

  switchLanguage(langCode: string): void {
    this.languageChanged.emit(langCode);
  }

  @HostListener('document:click')
  closeDropdown(): void {
    if (this.dropdownOpen) {
      this.dropdownOpen = false;
      this.searchQuery = '';
      this.filteredMaps = [...this.maps];
      this.highlightedIndex = -1;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if (!this.dropdownOpen) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.highlightedIndex = Math.min(this.highlightedIndex + 1, this.filteredMaps.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.highlightedIndex = Math.max(this.highlightedIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.highlightedIndex >= 0 && this.highlightedIndex < this.filteredMaps.length) {
          this.selectMap(this.filteredMaps[this.highlightedIndex].id);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.dropdownOpen = false;
        this.searchQuery = '';
        this.filteredMaps = [...this.maps];
        this.highlightedIndex = -1;
        break;
    }
  }
}
