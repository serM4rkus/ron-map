import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    private readonly titleService: Title
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
  }

  private updateCanonical(url: string): void {
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
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
}
