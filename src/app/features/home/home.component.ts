import { Component, OnInit } from '@angular/core';
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
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    featuredJobs: Job[] = [];
    topCompanies: Company[] = [];
    isLoading = true;

    constructor(
        private jobService: JobService,
        private companyService: CompanyService
    ) { }

    ngOnInit(): void {
        this.loadFeaturedJobs();
        this.loadTopCompanies();
    }

    loadFeaturedJobs(): void {
        this.jobService.getAllJobs(1, 6).subscribe({
            next: (response) => {
                this.featuredJobs = response.data || response;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading jobs:', error);
                this.isLoading = false;
            }
        });
    }

    loadTopCompanies(): void {
        this.companyService.getAllCompanies(1, 8).subscribe({
            next: (response) => {
                this.topCompanies = response.data || response;
            },
            error: (error) => {
                console.error('Error loading companies:', error);
            }
        });
    }
}
