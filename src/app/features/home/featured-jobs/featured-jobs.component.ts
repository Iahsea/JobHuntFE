import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { StripHtmlPipe } from '../../../shared/pipes/strip-html.pipe';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-featured-jobs',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        RouterModule,
        StripHtmlPipe,
        TranslateModule
    ],
    templateUrl: './featured-jobs.component.html',
    styleUrls: ['./featured-jobs.component.scss']
})
export class FeaturedJobsComponent implements OnInit {
    @Input() jobs: any[] = [];

    ngOnInit(): void {
        console.log('FeaturedJobsComponent initialized with jobs:', this.jobs);
    }
}
