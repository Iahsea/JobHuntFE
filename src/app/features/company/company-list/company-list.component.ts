import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../../core/services/company.service';
import { Company } from '../../../models/company.model';

@Component({
    selector: 'app-company-list',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
    companies: Company[] = [];
    isLoading = true;
    searchKeyword = '';
    currentPage = 1;
    totalPages = 1;

    constructor(private companyService: CompanyService) { }

    ngOnInit(): void {
        this.loadCompanies();
    }

    loadCompanies(): void {
        this.isLoading = true;
        this.companyService.getAllCompanies(this.currentPage, 12).subscribe({
            next: (response) => {
                this.companies = response.data || response;
                this.totalPages = response.totalPages || 1;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading companies:', error);
                this.isLoading = false;
            }
        });
    }

    onSearch(): void {
        if (this.searchKeyword.trim()) {
            this.companyService.searchCompanies(this.searchKeyword).subscribe({
                next: (companies) => {
                    this.companies = companies;
                },
                error: (error) => {
                    console.error('Error searching companies:', error);
                }
            });
        } else {
            this.loadCompanies();
        }
    }

    onPageChange(page: number): void {
        this.currentPage = page;
        this.loadCompanies();
        window.scrollTo(0, 0);
    }
}
