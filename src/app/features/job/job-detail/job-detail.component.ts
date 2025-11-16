import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { JobService } from '../../../core/services/job.service';
import { Job } from '../../../models/job.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-job-detail',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        BreadcrumbComponent
    ],
    templateUrl: './job-detail.component.html',
    styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
    job = signal<Job | null>(null);
    isLoading = signal(true);
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
        this.isLoading.set(true);
        this.jobService.getJobById(id).subscribe({
            next: (response) => {
                this.job.set(response.data);
                console.log('Loaded response:', response);
                console.log('Loaded job:', this.job());
                this.isLoading.set(false);
            },
            error: (error) => {
                console.error('Error loading job:', error);
                this.isLoading.set(false);
            }
        });
    }



    applyJob(): void {
        alert('Chức năng ứng tuyển đang được phát triển!');
    }
}
