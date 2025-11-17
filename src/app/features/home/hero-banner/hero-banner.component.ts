import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';

@Component({
    selector: 'app-hero-banner',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule,
        TranslateModule,
        ScrollRevealDirective,
        SearchBoxComponent
    ],
    templateUrl: './hero-banner.component.html',
    styleUrls: ['./hero-banner.component.scss']
})
export class HeroBannerComponent {
    @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

    searchPlaceholder: string = '';
    locationPlaceholder: string = '';
    searchButtonText: string = '';
    suggestionLabel: string = '';
    suggestions: string[] = ['Designer', 'Programming', 'Digital Marketing', 'Video', 'Animation'];

    constructor(private translateService: TranslateService) {
        this.loadTranslations();

        // Subscribe to language changes
        this.translateService.onLangChange.subscribe(() => {
            this.loadTranslations();
        });
    }

    private loadTranslations(): void {
        this.translateService.get('HERO.SEARCH_PLACEHOLDER').subscribe((text: string) => {
            this.searchPlaceholder = text;
        });
        this.translateService.get('HERO.LOCATION_PLACEHOLDER').subscribe((text: string) => {
            this.locationPlaceholder = text;
        });
        this.translateService.get('HERO.SEARCH_BUTTON').subscribe((text: string) => {
            this.searchButtonText = text;
        });
        this.translateService.get('HERO.SUGGESTION').subscribe((text: string) => {
            this.suggestionLabel = text + ':';
        });
    }

    onSearch(event: { keyword: string, location: string }): void {
        console.log('Search:', event.keyword, event.location);
        // Implement search logic here
    }
}
