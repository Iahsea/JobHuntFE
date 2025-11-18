import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { SearchComponent, SearchCriteria } from '../../../shared/components/search/search.component';
import { JobService } from '../../../core/services/job.service';

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
        SearchComponent
    ],
    templateUrl: './hero-banner.component.html',
    styleUrls: ['./hero-banner.component.scss']
})
export class HeroBannerComponent {
    suggestions: string[] = [];
    private searchSubject = new Subject<string>();

    constructor(
        private router: Router,
        private jobService: JobService
    ) {
        this.searchSubject.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((keyword) => {
                if (keyword && keyword.trim()) {
                    return this.jobService.searchJobs(keyword);
                }
                return [];
            })
        ).subscribe({
            next: (response: any) => {
                if (response && response.data) {
                    console.log('Suggestions response:', response);
                    console.log('Suggestions data:', response.data);
                    // Lấy danh sách job titles từ response để làm suggestions
                    this.suggestions = response.data.map((job: any) => job.title);
                }
            }
        });
    }

    handleKeywordChange(event: any): void {
        const value = event && event.target ? (event.target as HTMLInputElement).value : event;
        this.onKeywordChange(value);
    }

    onKeywordChange(keyword: string): void {
        this.searchSubject.next(keyword);
    }

    onSearch(criteria: SearchCriteria): void {
        this.jobService.searchJobs(criteria.keyword).subscribe({
            next: (response) => {
                console.log('Search results:', response.data);
            }
        });
    }
}
