import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { CompanyDetailResponseDto } from '../../../models/dto';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';

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
        BreadcrumbComponent,
        TranslateModule
    ],
    templateUrl: './company-detail.component.html',
    styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
    company = signal<CompanyDetailResponseDto | null>(null);
    isLoading = signal(true);
    isProfileExpanded = false;

    constructor(
        private route: ActivatedRoute,
        private companyService: CompanyService,
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
                console.log('Loaded company response:', response);
                const company = response.data;
                company.logo = company.logo
                    ? `${environment.imagesUrl}${company.logo}`
                    : undefined;
                this.company.set(company);
                this.isLoading.set(false);
            },
            error: (error) => {
                console.error('Error loading company:', error);
                this.isLoading.set(false);
            }
        });
    }
}
