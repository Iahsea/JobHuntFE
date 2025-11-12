import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobService } from '../../core/services/job.service';
import { CompanyService } from '../../core/services/company.service';
import { Job } from '../../models/job.model';
import { Company } from '../../models/company.model';
import { FeaturedJobsComponent } from './featured-jobs/featured-jobs.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterModule, FeaturedJobsComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    featuredJobs = signal(<Job[]>([]));
    isLoading = signal(true);

    private jobService = inject(JobService);


    ngOnInit(): void {
        this.loadFeaturedJobs();
    }

    loadFeaturedJobs(): void {
        this.jobService.getAllJobs().subscribe({
            next: (response) => {
                this.featuredJobs.set(response.data.result); // cập nhật signal
                console.log('Loaded jobs:', this.featuredJobs());
                this.isLoading.set(false);
            },
            error: (error) => {
                console.error('Error loading jobs:', error);
                this.isLoading.set(false);
            }
        });
    }
}
