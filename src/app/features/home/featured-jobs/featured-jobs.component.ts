import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-featured-jobs',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatIconModule, RouterModule],
    templateUrl: './featured-jobs.component.html',
    styleUrls: ['./featured-jobs.component.scss']
})
export class FeaturedJobsComponent {
    @Input() jobs: any[] = [];
}
