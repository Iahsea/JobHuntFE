import { Component, OnInit, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { JobService } from '../../../core/services/job.service';
import { Job } from '../../../models/job.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ResumeModalComponent } from '../../../shared/components/resume-modal/resume-modal.component';
import { ResumeService } from '../../../core/services/resume.service';
import { ResumeCreateDto, ResumeStatus } from '../../../models/dto/resume.dto';
import { environment } from '../../../../environments/environment';
import { FileService } from '../../../core/services/file.service';
import { FileUploadFolder } from '../../../models/enums/common.enums';

@Component({
    selector: 'app-job-detail',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        BreadcrumbComponent,
        MatDialogModule
    ],
    templateUrl: './job-detail.component.html',
    styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
    job = signal<Job | null>(null);
    isLoading = signal(true);
    isSubmitting = signal(false);
    resumeSubmission = signal<any | null>(null); // State lưu thông tin apply/resume

    constructor(
        private route: ActivatedRoute,
        private jobService: JobService,
        private dialog: MatDialog,
        private resumeService: ResumeService,
        private fileService: FileService
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
                this.job.set(jobData);
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
        if (!this.job()) {
            return;
        }

        // Xử lý logo tối ưu: chỉ nối nếu là đường dẫn tương đối, giữ nguyên nếu đã là URL tuyệt đối
        const jobData = { ...this.job() };
        if (jobData.company && jobData.company.logo && !/^https?:\/\//i.test(jobData.company.logo)) {
            jobData.company.logo = `${environment.imagesUrl}${jobData.company.logo}`;
        }

        console.log('Applying for job:', jobData);

        const dialogRef = this.dialog.open(ResumeModalComponent, {
            width: '560px',
            maxWidth: '90vw',
            disableClose: false,
            panelClass: 'resume-modal-panel',
            data: {
                job: jobData
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.submitApplication(result);
            }
        });
    }

    submitApplication(data: { formData: any; file: File }): void {
        this.isSubmitting.set(true);

        // 1. Upload resume file
        this.fileService.uploadFile(data.file, FileUploadFolder.RESUME).subscribe({
            next: (uploadResponse) => {
                // 2. Submit resume
                const resumeData: ResumeCreateDto = {
                    email: data.formData.email,
                    url: uploadResponse.data.fileName,
                    status: ResumeStatus.PENDING,
                    user: {
                        id: 1 // TODO: Get from auth service
                    },
                    job: {
                        id: this.job()?.id || 0
                    }
                };

                this.resumeService.submitResume(resumeData).subscribe({
                    next: (response) => {
                        this.isSubmitting.set(false);
                        this.resumeSubmission.set(response.data);
                        this.showSuccessMessage('Application submitted successfully!');
                        console.log('Resume submitted:', response);
                    },
                    error: (error) => {
                        this.isSubmitting.set(false);
                        this.showErrorMessage('Failed to submit application. Please try again.');
                        console.error('Error submitting resume:', error);
                    }
                });
            },
            error: (error) => {
                this.isSubmitting.set(false);
                this.showErrorMessage('Failed to upload resume. Please try again.');
                console.error('Error uploading file:', error);
            }
        });
    }

    showSuccessMessage(message: string): void {
        // TODO: Replace with proper notification service (e.g., MatSnackBar)
        alert(message);
    }

    showErrorMessage(message: string): void {
        // TODO: Replace with proper notification service
        alert(message);
    }
}
