import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { CompanyService } from '../../../core/services/company.service';
import { Company } from '../../../models/company.model';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { CardSkeletonComponent } from '../../../shared/components/card-skeleton/card-skeleton.component';

@Component({
    selector: 'app-company-list',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, SearchBoxComponent, PaginatorComponent, CardSkeletonComponent],
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
    companies: Company[] = [];
    isLoading = true;
    searchKeyword = '';
    currentPage = 1;
    pageSize = 8;
    pageSizeOptions = [4, 8, 12, 20];
    totalPages = 1;
    totalCompanies = 0;
    viewMode: 'list' | 'grid' = 'grid';
    sortBy: string = 'relevant';

    // Search box properties
    searchPlaceholder: string = 'Company name or Industry';
    locationPlaceholder: string = 'City, State, or Country';
    searchButtonText: string = 'Find Companies';

    // Filter data
    industries = [
        { label: 'Advertising', value: 'advertising', count: 43 },
        { label: 'Business Service', value: 'business-service', count: 4 },
        { label: 'Blockchain', value: 'blockchain', count: 8 },
        { label: 'Cloud', value: 'cloud', count: 15 },
        { label: 'Consumer Tech', value: 'consumer-tech', count: 5 },
        { label: 'Education', value: 'education', count: 34 },
        { label: 'Fintech', value: 'fintech', count: 44 },
        { label: 'Gaming', value: 'gaming', count: 33 },
        { label: 'Food & Beverage', value: 'food-beverage', count: 5 },
        { label: 'Healthcare', value: 'healthcare', count: 3 },
        { label: 'Hosting', value: 'hosting', count: 5 },
        { label: 'Media', value: 'media', count: 4 }
    ];

    companySizes = [
        { label: '1-50', value: '1-50', count: 25 },
        { label: '51-150', value: '51-150', count: 57 },
        { label: '151-250', value: '151-250', count: 45 },
        { label: '251-500', value: '251-500', count: 6 },
        { label: '501-1000', value: '501-1000', count: 4 },
        { label: '1000 - above', value: '1000+', count: 23 }
    ];

    constructor(private companyService: CompanyService) { }

    ngOnInit(): void {
        this.loadCompanies();
    }

    loadCompanies(): void {
        this.isLoading = true;
        // Add delay to see skeleton (remove in production)
        setTimeout(() => {
            this.companyService.getAllCompanies(this.currentPage, this.pageSize).subscribe({
                next: (response) => {
                    this.totalCompanies = response.data.meta.total;
                    this.totalPages = response.data.meta.pages;
                    this.companies = response.data.result.map(company => ({
                        id: company.id,
                        name: company.name,
                        description: company.description || '',
                        address: company.address || 'Unknown',
                        logo: company.logo || 'https://via.placeholder.com/80/6366f1/ffffff?text=' + (company.name?.charAt(0) || 'C'),
                        website: company.website,
                        industry: company.industry || 'Technology',
                        companySize: company.companySize,
                        coverImage: company.coverImage,
                        foundedDate: company.foundedDate,
                        employeeCount: company.employeeCount,
                        benefits: company.benefits,
                        createdAt: company.createdAt,
                        updatedAt: company.updatedAt,
                        createdBy: company.createdBy,
                        updatedBy: company.updatedBy,
                        phone: '',
                        email: '',
                        size: company.companySize
                    }));
                    this.isLoading = false;
                },
                error: (error) => {
                    console.error('Error loading companies:', error);
                    this.isLoading = false;
                }
            });
        }, 1500); // 1.5 second delay to see skeleton
    }

    onSearch(event: { keyword: string, location: string }): void {
        console.log('Search keyword:', event.keyword);
        console.log('Search location:', event.location);
        this.searchKeyword = event.keyword;
        // TODO: Implement company search logic
    }

    onFilterChange(filterType: string, value: string): void {
        console.log(`Filter changed: ${filterType} - ${value}`);
        // TODO: Implement filter logic
    }

    setViewMode(mode: 'list' | 'grid'): void {
        this.viewMode = mode;
        console.log('View mode changed to:', mode);
    }

    onSortChange(): void {
        console.log('Sort changed to:', this.sortBy);
        // TODO: Implement sort logic
    }

    onPageChange(event: PageEvent): void {
        this.currentPage = event.pageIndex + 1; // Material paginator is 0-indexed
        this.pageSize = event.pageSize;
        this.loadCompanies();
        // Scroll to top of company list
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

}
