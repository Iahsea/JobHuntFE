import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Company } from '../../../models/company.model';

@Component({
    selector: 'app-top-companies',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        RouterModule,
        TranslateModule
    ],
    templateUrl: './top-companies.component.html',
    styleUrls: ['./top-companies.component.scss']
})
export class TopCompaniesComponent {
    @Input() companies: Company[] = [];

    getCompanyColor(index: number): string {
        const colors = ['#ff6b9d', '#10b981', '#3b82f6', '#8b5cf6'];
        return colors[index % colors.length];
    }
}
