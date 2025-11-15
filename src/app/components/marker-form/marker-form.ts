import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { getMarkerTypes } from '../../config/marker-types.config';

export interface MarkerFormData {
  x: number;
  y: number;
  title: string;
  description: string;
  type: string;
}

@Component({
  selector: 'app-marker-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './marker-form.html',
  styleUrl: './marker-form.css',
})
export class MarkerFormComponent implements OnInit {
  @Input() x: number = 0;
  @Input() y: number = 0;
  @Input() markerTypes: string[] = getMarkerTypes();
  
  @Output() markerSaved = new EventEmitter<MarkerFormData>();
  @Output() formClosed = new EventEmitter<void>();

  title: string = '';
  description: string = '';
  type: string = 'spawn';

  constructor(private readonly languageService: LanguageService) {}

  ngOnInit(): void {
    this.type = this.markerTypes[0] || 'spawn';
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  onSave(): void {
    if (!this.title.trim()) {
      alert('Please enter a marker title');
      return;
    }

    this.markerSaved.emit({
      x: this.x,
      y: this.y,
      title: this.title,
      description: this.description,
      type: this.type
    });

    this.reset();
  }

  onClose(): void {
    this.reset();
    this.formClosed.emit();
  }

  private reset(): void {
    this.title = '';
    this.description = '';
    this.type = this.markerTypes[0] || 'spawn';
  }
}
