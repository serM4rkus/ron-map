import { Component, ChangeDetectionStrategy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-page',
  imports: [CommonModule],
  templateUrl: './about-page.html',
  styleUrl: './about-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPageComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly location: Location,
    private readonly meta: Meta,
    private readonly titleService: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    const canonicalUrl = 'https://readyormaps.com/about';
    
    // Set page title
    this.titleService.setTitle('About - Ready or Maps');
    
    // Set canonical URL
    this.updateCanonical(canonicalUrl);
    
    // Set meta description
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Learn about Ready or Maps - a fan-made interactive map tool for Ready or Not tactical shooter. Features detailed floor plans, objectives, and route planning tools.' 
    });
    
    // Set Open Graph tags for social sharing
    this.meta.updateTag({ 
      property: 'og:title', 
      content: 'About - Ready or Maps' 
    });
    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Learn about Ready or Maps - a fan-made interactive map tool for Ready or Not tactical shooter. Features detailed floor plans, objectives, and route planning tools.' 
    });
    this.meta.updateTag({ 
      property: 'og:url', 
      content: canonicalUrl 
    });
    this.meta.updateTag({ 
      property: 'og:site_name', 
      content: 'Ready or Maps' 
    });
    this.meta.updateTag({ 
      property: 'og:locale', 
      content: 'en_US' 
    });
    this.meta.updateTag({ 
      property: 'og:type', 
      content: 'website' 
    });
    
    // Update Twitter Card tags
    this.meta.updateTag({ 
      name: 'twitter:title', 
      content: 'About - Ready or Maps' 
    });
    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: 'Learn about Ready or Maps - a fan-made interactive map tool for Ready or Not tactical shooter. Features detailed floor plans, objectives, and route planning tools.' 
    });
    
    // Add structured data
    this.addStructuredData(canonicalUrl);
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

  private addStructuredData(canonicalUrl: string): void {
    const aboutPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      'name': 'About - Ready or Maps',
      'url': canonicalUrl,
      'description': 'Learn about Ready or Maps - a fan-made interactive map tool for Ready or Not tactical shooter. Features detailed floor plans, objectives, and route planning tools.',
      'mainEntity': {
        '@type': 'WebApplication',
        'name': 'Ready or Maps',
        'url': 'https://readyormaps.com',
        'applicationCategory': 'GameApplication',
        'operatingSystem': 'Any'
      }
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://readyormaps.com'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'About',
          'item': canonicalUrl
        }
      ]
    };

    this.injectStructuredData('aboutpage-schema', aboutPageSchema);
    this.injectStructuredData('breadcrumb-schema', breadcrumbSchema);
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

  goBack(): void {
    // Use browser history to go back to the previous page (the map)
    // If no history exists (direct navigation to /about), go to home
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
