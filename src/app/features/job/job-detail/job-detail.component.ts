import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { JobService } from '../../../core/services/job.service';
import { Job } from '../../../models/job.model';

@Component({
    selector: 'app-job-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './job-detail.component.html',
    styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
    job: Job | null = null;
    isLoading = true;
    relatedJobs: Job[] = [];

    constructor(
        private route: ActivatedRoute,
        private jobService: JobService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            this.loadJobDetail(id);
        });
    }

    loadJobDetail(id: number): void {
        this.isLoading = true;
        this.jobService.getJobById(id).subscribe({
            next: (job) => {
                this.job = job;
                this.isLoading = false;
                if (job.companyId) {
                    this.loadRelatedJobs(job.companyId);
                }
            },
            error: (error) => {
                console.error('Error loading job:', error);
                this.isLoading = false;
            }
        });
    }

    loadRelatedJobs(companyId: number): void {
        this.jobService.getJobsByCompany(companyId).subscribe({
            next: (jobs) => {
                this.relatedJobs = jobs.filter(j => j.id !== this.job?.id).slice(0, 3);
            },
            error: (error) => {
                console.error('Error loading related jobs:', error);
            }
        });
    }

    applyJob(): void {
        alert('Chức năng ứng tuyển đang được phát triển!');
    }
}
