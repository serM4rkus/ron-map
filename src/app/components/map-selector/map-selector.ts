import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GameMapMetadata, GameMapConfig } from '../../services/game-map';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../config/languages.config';
import { getAllCategories, MapCategoryInfo, MapCategoryId } from '../../config/map-categories.config';

@Component({
  selector: 'app-map-selector',
  imports: [CommonModule, FormsModule],
  templateUrl: './map-selector.html',
  styleUrl: './map-selector.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapSelectorComponent implements OnChanges {
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;

  @Input() maps: GameMapMetadata[] = [];
  @Input() currentMapId: string | null = null;
  @Input() currentMap: GameMapConfig | null = null;
  @Input() availableLanguages: Language[] = [];
  @Input() currentLanguage: string = 'en';

  @Output() mapSelected = new EventEmitter<string>();
  @Output() languageChanged = new EventEmitter<string>();

  dropdownOpen = false;
  searchQuery = '';
  filteredMaps: GameMapMetadata[] = [];
  highlightedIndex = -1;

  // Category filter state
  filterOpen = false;
  allCategories: MapCategoryInfo[] = [];
  selectedCategories: Set<MapCategoryId> = new Set();

  constructor(
    private readonly languageService: LanguageService,
    private readonly router: Router
  ) {
    // Initialize categories
    this.allCategories = getAllCategories();
    // Select all categories by default
    this.allCategories.forEach(cat => this.selectedCategories.add(cat.id as MapCategoryId));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['maps']) {
      this.applyFilters();
    }
  }

  get currentMapMetadata(): GameMapMetadata | null {
    return this.maps.find(m => m.id === this.currentMapId) || null;
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  openAboutPage(): void {
    this.router.navigate(['/about']);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;

    if (this.dropdownOpen) {
      setTimeout(() => this.searchInput?.nativeElement?.focus(), 100);
      // Close filter if open
      if (this.filterOpen) {
        this.filterOpen = false;
      }
    } else {
      this.resetSearch();
    }
  }

  filterMaps(): void {
    this.applyFilters();
    this.highlightedIndex = -1;
  }

  applyFilters(): void {
    const query = this.searchQuery.toLowerCase().trim();

    // Filter by category first
    let maps = this.maps.filter(map => this.selectedCategories.has(map.category));

    // Then filter by search query
    if (query) {
      maps = maps.filter(map =>
        this.translate(map.name).toLowerCase().includes(query)
      );
    }

    this.filteredMaps = maps;
  }

  selectMap(mapId: string): void {
    this.mapSelected.emit(mapId);
    this.dropdownOpen = false;
    this.resetSearch();
  }

  toggleFilter(event: Event): void {
    event.stopPropagation();
    this.filterOpen = !this.filterOpen;

    // Close dropdown if open
    if (this.filterOpen && this.dropdownOpen) {
      this.dropdownOpen = false;
      this.resetSearch();
    }
  }

  toggleCategory(categoryId: string): void {
    const catId = categoryId as MapCategoryId;
    if (this.selectedCategories.has(catId)) {
      this.selectedCategories.delete(catId);
    } else {
      this.selectedCategories.add(catId);
    }
    this.applyFilters();
  }

  isCategorySelected(categoryId: string): boolean {
    return this.selectedCategories.has(categoryId as MapCategoryId);
  }

  getMapCountForCategory(categoryId: string): number {
    return this.maps.filter(map => map.category === categoryId).length;
  }

  switchLanguage(langCode: string): void {
    this.languageChanged.emit(langCode);
  }

  @HostListener('document:click')
  closeDropdown(): void {
    if (this.dropdownOpen) {
      this.dropdownOpen = false;
      this.resetSearch();
    }
    if (this.filterOpen) {
      this.filterOpen = false;
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
        this.resetSearch();
        break;
    }
  }

  private resetSearch(): void {
    if (this.searchQuery) {
      this.searchQuery = '';
      this.applyFilters();
    }
    this.highlightedIndex = -1;
  }

  // Language
  onLanguageChanged(langCode: string): void {
    this.languageService.setLanguage(langCode);
  }
}
