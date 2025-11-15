import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { JobService } from '../../../core/services/job.service';
import { Company } from '../../../models/company.model';
import { Job } from '../../../models/job.model';
import { CompanyDetailResponseDto } from '../../../models/dto';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor, NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-company-detail',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatIconModule,
        MatDividerModule,
        MatButtonModule,
    ],
    templateUrl: './company-detail.component.html',
    styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
    company = signal<CompanyDetailResponseDto | null>(null);
    isLoading = signal(true);

    constructor(
        private route: ActivatedRoute,
        private companyService: CompanyService,
        private jobService: JobService
    ) { }

    ngOnInit(): void {
        window.scrollTo({ top: 0, behavior: 'auto' });
        this.route.params.subscribe(params => {
            const id = +params['id'];
            this.loadCompanyDetail(id);
        });
    }

    loadCompanyDetail(id: number): void {
        this.isLoading.set(true);
        this.companyService.getCompanyById(id).subscribe({
            next: (response) => {
                this.company.set(response.data);
                this.isLoading.set(false);
            },
            error: (error) => {
                console.error('Error loading company:', error);
                this.isLoading.set(false);
            }
        });
    }

    trackByJobId(index: number, job: any): number {
        return job.id;
    }
}
