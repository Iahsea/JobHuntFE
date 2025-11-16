import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobService } from '../../core/services/job.service';
import { CompanyService } from '../../core/services/company.service';
import { Job } from '../../models/job.model';
import { Company } from '../../models/company.model';
import { FeaturedJobsComponent } from './featured-jobs/featured-jobs.component';
import { TopCompaniesComponent } from './top-companies/top-companies.component';
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { HeroWrapperComponent } from './hero-wrapper/hero-wrapper.component';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        HeroWrapperComponent,
        HowItWorksComponent,
        FeaturedJobsComponent,
        TopCompaniesComponent,
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    featuredJobs = signal(<Job[]>([]));
    topCompanies = signal(<Company[]>([]));
    isLoading = signal(true);

    private jobService = inject(JobService);
    private companyService = inject(CompanyService);

    ngOnInit(): void {
        this.loadFeaturedJobs();
        this.loadTopCompanies();
    }

    loadFeaturedJobs(): void {
        this.jobService.getAllJobs(1, 8).subscribe({
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

    loadTopCompanies(): void {
        this.companyService.getAllCompanies(1, 8).subscribe({
            next: (response) => {
                const companies = (response.data?.result || response.data || []).map((company: any) => ({
                    ...company,
                    logo: company.logo
                        ? `${environment.imagesUrl}${company.logo}`
                        : null
                }));
                this.topCompanies.set(companies);
            },
            error: (error) => {
                console.error('Error loading companies:', error);
            }
        });
    }
}
