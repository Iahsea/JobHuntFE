import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { JobService } from '../../../core/services/job.service';
import { Company } from '../../../models/company.model';
import { Job } from '../../../models/job.model';

@Component({
    selector: 'app-company-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './company-detail.component.html',
    styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
    company: Company | null = null;
    companyJobs: Job[] = [];
    isLoading = true;

    constructor(
        private route: ActivatedRoute,
        private companyService: CompanyService,
        private jobService: JobService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            this.loadCompanyDetail(id);
            this.loadCompanyJobs(id);
        });
    }

    loadCompanyDetail(id: number): void {
        this.isLoading = true;
        this.companyService.getCompanyById(id).subscribe({
            next: (company) => {
                this.company = company;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading company:', error);
                this.isLoading = false;
            }
        });
    }

    loadCompanyJobs(companyId: number): void {
        this.jobService.getJobsByCompany(companyId).subscribe({
            next: (jobs) => {
                this.companyJobs = jobs;
            },
            error: (error) => {
                console.error('Error loading company jobs:', error);
            }
        });
    }
}
