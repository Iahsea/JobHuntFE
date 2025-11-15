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
    styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
    companies: Company[] = [];
    isLoading = true;
    searchKeyword = '';
    currentPage = 1;
    totalPages = 1;

    constructor(private companyService: CompanyService) { }

    ngOnInit(): void {

    }

}
