import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LANGUAGES, TRANSLATIONS, Language } from '../config/languages.config';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly currentLanguageSubject = new BehaviorSubject<string>('en');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor() {
    // Force English as default (language switcher is hidden)
    this.currentLanguageSubject.next('en');
    localStorage.setItem('selectedLanguage', 'en');
  }

  getAvailableLanguages(): Language[] {
    return LANGUAGES;
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.getValue();
  }

  setLanguage(languageCode: string): void {
    this.currentLanguageSubject.next(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
  }

  translate(key: string): string {
    const currentLang = this.currentLanguageSubject.getValue();
    return TRANSLATIONS[key]?.[currentLang] || key;
  }
}
