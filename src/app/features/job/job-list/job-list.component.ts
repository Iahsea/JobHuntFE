import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { JobService } from '../../../core/services/job.service';
import { Job } from '../../../models/job.model';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-job-list',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, SearchBoxComponent, TranslateModule, PaginatorComponent],
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
    totalJobs = 0;
    viewMode: 'list' | 'grid' = 'list';
    sortBy: string = 'relevant';
    isLoading: boolean = true;

    // Pagination
    currentPage = 1;
    pageSize = 4;
    pageSizeOptions = [4, 8, 12, 20];

    // Search box properties
    searchPlaceholder: string = 'Job title, Keywords, or Company';
    locationPlaceholder: string = 'City, State, or Remote';
    searchButtonText: string = 'Find Jobs';

    // Job data from API
    mockJobs: any[] = [];

    // Skeleton placeholder array
    skeletonArray = Array(4).fill(0);

    // Filter data
    employmentTypes = [
        { label: 'Full-time', value: 'full-time', count: 3 },
        { label: 'Part-Time', value: 'part-time', count: 5 },
        { label: 'Remote', value: 'remote', count: 2 },
        { label: 'Internship', value: 'internship', count: 24 },
        { label: 'Contract', value: 'contract', count: 3 }
    ];

    categories = [
        { label: 'Design', value: 'design', count: 24 },
        { label: 'Sales', value: 'sales', count: 3 },
        { label: 'Marketing', value: 'marketing', count: 3 },
        { label: 'Business', value: 'business', count: 3 },
        { label: 'Human Resource', value: 'hr', count: 6 },
        { label: 'Finance', value: 'finance', count: 4 },
        { label: 'Engineering', value: 'engineering', count: 4 },
        { label: 'Technology', value: 'technology', count: 5 }
    ];

    jobLevels = [
        { label: 'Entry Level', value: 'entry', count: 57 },
        { label: 'Mid Level', value: 'mid', count: 3 },
        { label: 'Senior Level', value: 'senior', count: 5 },
        { label: 'Director', value: 'director', count: 12 },
        { label: 'VP or Above', value: 'vp', count: 8 }
    ];

    salaryRanges = [
        { label: '$700 - $1000', value: '700-1000', count: 4 },
        { label: '$100 - $1500', value: '100-1500', count: 6 },
        { label: '$1500 - $2000', value: '1500-2000', count: 10 },
        { label: '$3000 or above', value: '3000+', count: 4 }
    ];

    constructor(
        private jobService: JobService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadJobs();
    }

    navigateToJobDetail(jobId: number): void {
        this.router.navigate(['/jobs', jobId]);
    }

    loadJobs(): void {
        this.isLoading = true;
        this.jobService.getAllJobs(this.currentPage, this.pageSize).subscribe({
            next: (response) => {
                this.totalJobs = response.data.meta.total;
                this.mockJobs = response.data.result.map(job => ({
                    id: job.id,
                    title: job.name,
                    companyName: job.company?.name || 'Unknown',
                    companyLogo: job.company?.logo || 'https://via.placeholder.com/48/6366f1/ffffff?text=' + (job.company?.name?.charAt(0) || '?'),
                    location: job.location || 'Remote',
                    employmentType: this.formatJobType(job.jobType),
                    categories: job.skills?.map(s => s.name) || [],
                    description: job.description || '',
                    applications: 0, // API doesn't provide this yet
                    capacity: job.quantity || 10
                }));
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading jobs:', error);
                this.isLoading = false;
            }
        });
    }

    formatJobType(jobType?: string): string {
        if (!jobType) return 'Full-Time';
        return jobType.split('_').map(word =>
            word.charAt(0) + word.slice(1).toLowerCase()
        ).join('-');
    }

    onSearch(event: { keyword: string, location: string }): void {
        console.log('Search keyword:', event.keyword);
        console.log('Search location:', event.location);
    }

    onFilterChange(filterType: string, value: string): void {
        console.log(`Filter changed: ${filterType} - ${value}`);
    }

    setViewMode(mode: 'list' | 'grid'): void {
        this.viewMode = mode;
        console.log('View mode changed to:', mode);
    }

    onSortChange(): void {
        console.log('Sort changed to:', this.sortBy);
    }

    onPageChange(event: PageEvent): void {
        this.currentPage = event.pageIndex + 1; // Material paginator is 0-indexed
        this.pageSize = event.pageSize;
        this.loadJobs();
        // Scroll to top of job list
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
