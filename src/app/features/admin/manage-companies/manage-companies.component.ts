import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-companies',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule],
    templateUrl: './manage-companies.component.html',
    styleUrls: ['./manage-companies.component.scss']
})
export class ManageCompaniesComponent {
    displayedColumns: string[] = ['name', 'industry', 'location', 'jobs', 'actions'];
    companies = [
        { id: 1, name: 'Tech Corp', industry: 'Technology', location: 'Ho Chi Minh', jobs: 25 },
        { id: 2, name: 'Design Studio', industry: 'Design', location: 'Ha Noi', jobs: 10 }
    ];
}
