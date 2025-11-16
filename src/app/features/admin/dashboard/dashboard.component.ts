import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobService } from '../../../core/services/job.service';
import { CompanyService } from '../../../core/services/company.service';
import { UserService } from '../../../core/services/user.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    stats = {
        totalJobs: 0,
        totalCompanies: 0,
        totalUsers: 0,
        activeJobs: 0
    };

    constructor(
        private jobService: JobService,
        private companyService: CompanyService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.loadStats();
    }

    loadStats(): void {
        // Load statistics - adjust based on your API
        this.jobService.getAllJobs(1, 1).subscribe({
            next: (response) => {

            }
        });

        this.companyService.getAllCompanies(1, 1).subscribe({

        });

        this.userService.getAllUsers().subscribe({
            next: (users) => {
                this.stats.totalUsers = users.length;
            }
        });
    }
}
