import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { StripHtmlPipe } from '../../../shared/pipes/strip-html.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
    selector: 'app-featured-jobs',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        RouterModule,
        StripHtmlPipe,
        TranslateModule,
        ScrollRevealDirective
    ],
    templateUrl: './featured-jobs.component.html',
    styleUrls: ['./featured-jobs.component.scss']
})
export class FeaturedJobsComponent implements OnInit {
    @Input() jobs: any[] = [];

    constructor(private router: Router) {
    }

    ngOnInit(): void {
        console.log('FeaturedJobsComponent initialized with jobs:', this.jobs);
    }

    goToDetailJob(jobId: number): void {
        this.router.navigate(['/jobs', jobId]);
    }
}
