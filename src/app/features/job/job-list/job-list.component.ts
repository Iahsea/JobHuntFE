import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../../core/services/job.service';
import { Job } from '../../../models/job.model';

@Component({
    selector: 'app-job-list',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
    jobs: Job[] = [];
    isLoading = true;
    currentPage = 1;
    totalPages = 1;
    searchKeyword = '';
    selectedLocation = '';
    selectedJobType = '';

    constructor(private jobService: JobService) { }

    ngOnInit(): void {
        this.loadJobs();
    }

    loadJobs(): void {
        this.isLoading = true;
        this.jobService.getAllJobs(this.currentPage, 12).subscribe({
            next: (response) => {
                this.jobs = response.data || response;
                this.totalPages = response.totalPages || 1;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading jobs:', error);
                this.isLoading = false;
            }
        });
    }

    onSearch(): void {
        const filters = {
            keyword: this.searchKeyword,
            location: this.selectedLocation,
            jobType: this.selectedJobType
        };
        this.jobService.searchJobs(filters).subscribe({
            next: (jobs) => {
                this.jobs = jobs;
            },
            error: (error) => {
                console.error('Error searching jobs:', error);
            }
        });
    }

    onPageChange(page: number): void {
        this.currentPage = page;
        this.loadJobs();
        window.scrollTo(0, 0);
    }
}
