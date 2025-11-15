import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';
// import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        TranslateModule,
    ],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    languages: any[] = [];
    currentLanguage: any;
    isHeaderVisible = true;
    isHeaderScrolled = false;
    private lastScrollTop = 0;

    constructor(public languageService: LanguageService) { }

    ngOnInit(): void {
        this.languages = this.languageService.getLanguages();
        this.updateCurrentLanguage();
    }

    changeLanguage(langCode: string): void {
        this.languageService.setLanguage(langCode);
        this.updateCurrentLanguage();
    }

    private updateCurrentLanguage(): void {
        const currentLangCode = this.languageService.getCurrentLanguage();
        this.currentLanguage = this.languages.find(lang => lang.code === currentLangCode);
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        this.isHeaderScrolled = st > 10;
        if (st > this.lastScrollTop && st > 80) {
            // Scroll down
            this.isHeaderVisible = false;
        } else {
            // Scroll up
            this.isHeaderVisible = true;
        }
        this.lastScrollTop = st <= 0 ? 0 : st;
    }

    ngOnDestroy(): void {
        // Cleanup logic if needed
    }
}