import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
    selector: 'app-jobs',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatChipsModule],
    templateUrl: './manage-jobs.component.html',
    styleUrls: ['./manage-jobs.component.scss']
})
export class ManageJobsComponent {
    displayedColumns: string[] = ['title', 'company', 'location', 'salary', 'status', 'actions'];
    jobs = [
        { id: 1, title: 'Frontend Developer', company: 'Tech Corp', location: 'Ho Chi Minh', salary: '$2000-$3000', status: 'Active' },
        { id: 2, title: 'UI/UX Designer', company: 'Design Studio', location: 'Ha Noi', salary: '$1500-$2500', status: 'Closed' }
    ];
}
