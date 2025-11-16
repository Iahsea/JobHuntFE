import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../../core/services/job.service';
import { Job } from '../../../models/job.model';

@Component({
    selector: 'app-job-list',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
    jobs: Job[] = [];
    isLoading = true;
    currentPage = 1;
    totalPages = 1;
    searchKeyword = '';
    selectedLocation = '';
    selectedJobType = '';

    constructor(private jobService: JobService) { }

    ngOnInit(): void {

    }



}
