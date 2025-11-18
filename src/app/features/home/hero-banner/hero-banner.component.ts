import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, map, catchError } from 'rxjs/operators';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { SearchComponent, SearchCriteria } from '../../../shared/components/search/search.component';
import { JobService } from '../../../core/services/job.service';
import { Observable, of, Subject } from 'rxjs';
import { Job } from '../../../models/job.model';

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
    suggestions$!: Observable<Job[]>;
    private searchSubject = new Subject<string>();

    constructor(
        private router: Router,
        private jobService: JobService
    ) {
        this.suggestions$ = this.searchSubject.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((keyword) => {
                if (keyword && keyword.trim()) {
                    return this.jobService.getAllJobs(1, 10, keyword).pipe(
                        map((response: any) =>
                            response && response.data && response.data.result
                                ? response.data.result
                                : []
                        ),
                        catchError(() => of([]))
                    );
                }
                return of([]);
            })
        );
    }

    handleKeywordChange(event: any): void {
        const value = event && event.target ? (event.target as HTMLInputElement).value : event;
        this.onKeywordChange(value);
    }

    onKeywordChange(keyword: string): void {
        this.searchSubject.next(keyword);
    }

    onSearch(criteria: SearchCriteria): void {
        this.jobService.getAllJobs(1, 10, criteria.keyword).subscribe({
            next: (response) => {
                if (response && response.data && response.data.result && response.data.result.length > 0) {
                    const firstJob = response.data.result[0];
                    this.router.navigate(['/jobs', firstJob.id]);
                }
            }
        });
    }
}
