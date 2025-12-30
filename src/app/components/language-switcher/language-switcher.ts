import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../config/languages.config';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSwitcherComponent {
  availableLanguages: Language[] = [];
  currentLanguage: string = 'en';

  constructor(private readonly languageService: LanguageService) {
    this.availableLanguages = this.languageService.getAvailableLanguages();
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  onLanguageChanged(langCode: string): void {
    this.languageService.setLanguage(langCode);
  }
}
