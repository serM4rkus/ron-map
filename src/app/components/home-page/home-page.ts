import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { GAME_MAPS_METADATA, GameMapMetadata } from '../../config/game-maps-metadata.config';
import { getAllCategories, MapCategoryInfo } from '../../config/map-categories.config';
import { RandomChallengeComponent } from '../random-challenge/random-challenge';
// import { LanguageSwitcherComponent } from '../language-switcher/language-switcher';
import { TranslatePipe } from '../../pipes/translate.pipe';

interface CategoryGroup {
  category: MapCategoryInfo;
  maps: GameMapMetadata[];
  collapsed: boolean;
}

type ViewMode = 'grid' | 'list';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, FormsModule, RandomChallengeComponent, TranslatePipe], // excluded LanguageSwitcherComponent
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  allMaps: GameMapMetadata[] = [];
  categoryGroups: CategoryGroup[] = [];
  searchQuery = '';
  viewMode: ViewMode = 'grid';
  isLoading = true;
  allCollapsed = false;

  constructor(
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly titleService: Title,
    private readonly metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.setMetaTags();
    this.addStructuredData();
    this.loadAllMaps();
    this.initializeCategoryGroups();
    this.isLoading = false;
    this.cdr.markForCheck();
  }

  private setMetaTags(): void {
    const title = 'Ready or Maps - Interactive Maps for Ready or Not';
    const description = 'Browse all Ready or Not interactive maps. Plan your tactical missions with detailed floor plans, objectives, and spawn points for all 21+ maps including base game and DLC content.';
    const url = 'https://readyormaps.com/';
    
    this.titleService.setTitle(title);
    
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: 'Ready or Not, interactive maps, tactical shooter, floor plans, mission planning, game maps, objectives, spawn points, Ready or Not DLC' });
    
    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:url', content: url });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://readyormaps.com/ReadyOrMaps.png' });
    
    // Twitter Card
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    this.metaService.updateTag({ name: 'twitter:image', content: 'https://readyormaps.com/ReadyOrMaps.png' });
    
    // Canonical URL
    this.updateCanonical(url);
  }

  private updateCanonical(url: string): void {
    if (isPlatformBrowser(this.platformId)) {
      let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', url);
    }
  }

  private addStructuredData(): void {
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Ready or Maps',
      'url': 'https://readyormaps.com',
      'description': 'Interactive maps for Ready or Not tactical shooter',
      'publisher': {
        '@type': 'Organization',
        'name': 'Ready or Maps'
      }
    };

    const webApplicationSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Ready or Maps',
      'url': 'https://readyormaps.com',
      'description': 'Browse all Ready or Not interactive maps. Plan your tactical missions with detailed floor plans, objectives, and spawn points for all 21+ maps including base game and DLC content.',
      'applicationCategory': 'GameApplication',
      'operatingSystem': 'Any',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'browserRequirements': 'Requires JavaScript. Requires HTML5.'
    };

    this.injectStructuredData('website-schema', websiteSchema);
    this.injectStructuredData('webapplication-schema', webApplicationSchema);
  }

  private injectStructuredData(id: string, data: any): void {
    if (isPlatformBrowser(this.platformId)) {
      let script = document.getElementById(id) as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    }
  }

  private loadAllMaps(): void {
    this.allMaps = GAME_MAPS_METADATA;
  }

  private initializeCategoryGroups(): void {
    const categories = getAllCategories();
    
    this.categoryGroups = categories.map(category => {
      const maps = this.allMaps.filter(map => map.category === category.id);
      return {
        category,
        maps,
        collapsed: false
      };
    }).filter(group => group.maps.length > 0);
  }

  get filteredCategoryGroups(): CategoryGroup[] {
    if (!this.searchQuery.trim()) {
      return this.categoryGroups;
    }

    const query = this.searchQuery.toLowerCase();
    return this.categoryGroups
      .map(group => ({
        ...group,
        maps: group.maps.filter(map => 
          map.name.toLowerCase().includes(query) ||
          map.description.toLowerCase().includes(query)
        )
      }))
      .filter(group => group.maps.length > 0);
  }

  get totalMapsCount(): number {
    return this.filteredCategoryGroups.reduce((sum, group) => sum + group.maps.length, 0);
  }

  toggleCategory(group: CategoryGroup): void {
    group.collapsed = !group.collapsed;
    this.cdr.markForCheck();
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
    this.cdr.markForCheck();
  }

  navigateToMap(map: GameMapMetadata): void {
    this.router.navigate(['/map', map.route]);
  }

  navigateToAbout(): void {
    this.router.navigate(['/about']);
  }

  onSearchChange(): void {
    this.cdr.markForCheck();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.cdr.markForCheck();
  }

  toggleAllCategories(): void {
    this.allCollapsed = !this.allCollapsed;
    this.categoryGroups.forEach(group => group.collapsed = this.allCollapsed);
    this.cdr.markForCheck();
  }
}
