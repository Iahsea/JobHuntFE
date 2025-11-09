import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Language {
    code: string;
    name: string;
    flag: string;
}

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private currentLang = 'en';
    private availableLanguages: Language[] = [
        { code: 'en', name: 'English', flag: 'https://flagcdn.com/w20/us.png' },
        { code: 'vi', name: 'Tiếng Việt', flag: 'https://flagcdn.com/w20/vn.png' },
        { code: 'hi', name: 'हिन्दी', flag: 'https://flagcdn.com/w20/in.png' }
    ];

    constructor(private translate: TranslateService) {
        this.initLanguage();
    }

    private initLanguage(): void {
        const savedLang = localStorage.getItem('language') || 'en';
        this.translate.setDefaultLang('en');
        this.translate.use(savedLang);
        this.currentLang = savedLang;
    }

    getCurrentLanguage(): string {
        return this.currentLang;
    }

    setLanguage(lang: string): void {
        this.translate.use(lang);
        this.currentLang = lang;
        localStorage.setItem('language', lang);
    }

    getLanguages(): Language[] {
        return this.availableLanguages;
    }
}
