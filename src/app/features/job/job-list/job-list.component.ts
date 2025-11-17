import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../../core/services/job.service';
import { Job } from '../../../models/job.model';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-job-list',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, SearchBoxComponent, TranslateModule],
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
    totalJobs = 73;
    viewMode: 'list' | 'grid' = 'list';
    sortBy: string = 'relevant';

    // Search box properties
    searchPlaceholder: string = 'Job title, Keywords, or Company';
    locationPlaceholder: string = 'City, State, or Remote';
    searchButtonText: string = 'Find Jobs';

    // Mock job data
    mockJobs = [
        {
            id: 1,
            title: 'Social Media Assistant',
            companyName: 'Nomad',
            companyLogo: 'https://via.placeholder.com/48/4ade80/ffffff?text=N',
            location: 'Paris, France',
            employmentType: 'Full-Time',
            categories: ['Marketing', 'Design'],
            description: 'Nomad is looking for a Social Media Assistant to join our team in Paris. You will be responsible for managing social media accounts and creating engaging content.',
            applications: 5,
            capacity: 10
        },
        {
            id: 2,
            title: 'Brand Designer',
            companyName: 'Dropbox',
            companyLogo: 'https://via.placeholder.com/48/0061ff/ffffff?text=D',
            location: 'San Fransisco, USA',
            employmentType: 'Full-Time',
            categories: ['Marketing', 'Design'],
            description: 'Dropbox is seeking a talented Brand Designer to help shape our visual identity and create stunning designs for our products.',
            applications: 2,
            capacity: 10
        },
        {
            id: 3,
            title: 'Interactive Developer',
            companyName: 'Terraform',
            companyLogo: 'https://via.placeholder.com/48/00d4ff/ffffff?text=T',
            location: 'Hamburg, Germany',
            employmentType: 'Full-Time',
            categories: ['Marketing', 'Design'],
            description: 'Terraform is hiring an Interactive Developer to build engaging web experiences and interactive applications.',
            applications: 8,
            capacity: 12
        },
        {
            id: 4,
            title: 'Email Marketing',
            companyName: 'Revolut',
            companyLogo: 'https://via.placeholder.com/48/1f2937/ffffff?text=R',
            location: 'Madrid, Spain',
            employmentType: 'Full-Time',
            categories: ['Marketing', 'Design'],
            description: 'Join Revolut as an Email Marketing specialist and help us create compelling email campaigns that drive engagement.',
            applications: 0,
            capacity: 10
        },
        {
            id: 5,
            title: 'Lead Engineer',
            companyName: 'Canva',
            companyLogo: 'https://via.placeholder.com/48/00c4cc/ffffff?text=C',
            location: 'Ankara, Turkey',
            employmentType: 'Full-Time',
            categories: ['Marketing', 'Design'],
            description: 'Canva is looking for a Lead Engineer to guide our engineering team and build scalable solutions.',
            applications: 5,
            capacity: 10
        },
        {
            id: 6,
            title: 'Product Designer',
            companyName: 'ClassPass',
            companyLogo: 'https://via.placeholder.com/48/5b7cff/ffffff?text=CP',
            location: 'Berlin, Germany',
            employmentType: 'Full-Time',
            categories: ['Marketing', 'Design'],
            description: 'ClassPass seeks a creative Product Designer to design intuitive and beautiful user experiences.',
            applications: 5,
            capacity: 10
        },
        {
            id: 7,
            title: 'Customer Manager',
            companyName: 'Pitch',
            companyLogo: 'https://via.placeholder.com/48/000000/ffffff?text=P',
            location: 'Berlin, Germany',
            employmentType: 'Full-Time',
            categories: ['Marketing', 'Design'],
            description: 'Pitch is hiring a Customer Manager to build strong relationships with our customers and ensure their success.',
            applications: 5,
            capacity: 10
        }
    ];

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

    constructor(private jobService: JobService) { }

    ngOnInit(): void {
        this.loadJobs();
    }

    loadJobs(page: number = 1, pageSize: number = 10): void {
        this.jobService.getAllJobs(page, pageSize).subscribe({
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
            },
            error: (error) => {
                console.error('Error loading jobs:', error);
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
}
