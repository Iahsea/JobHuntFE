import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CompanyService } from '../../../core/services/company.service';
import { UserService } from '../../../core/services/user.service';
import { JobService } from '../../../core/services/job.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule, 
        RouterModule, 
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatButtonModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('jobStatsChart', { static: false }) jobStatsCanvas!: ElementRef<HTMLCanvasElement>;
    
    stats = {
        totalJobs: 0,
        totalCompanies: 0,
        totalUsers: 0,
        activeJobs: 0
    };

    // Chart instance
    private chart: Chart | null = null;

    // Active filter
    activeTimeFilter: 'week' | 'month' | 'year' = 'week';
    activeTab: string = 'overview';

    // Jobs View Data
    jobsViewData = [
        { title: 'Senior Frontend Developer', company: 'TechCorp', views: 342, datePosted: 'Nov 15, 2025', status: 'Active' },
        { title: 'Full Stack Engineer', company: 'StartupHub', views: 289, datePosted: 'Nov 14, 2025', status: 'Active' },
        { title: 'UI/UX Designer', company: 'DesignLab', views: 256, datePosted: 'Nov 13, 2025', status: 'Active' },
        { title: 'Backend Developer', company: 'CloudSoft', views: 198, datePosted: 'Nov 12, 2025', status: 'Closed' },
        { title: 'DevOps Engineer', company: 'InfraTech', views: 187, datePosted: 'Nov 11, 2025', status: 'Active' },
        { title: 'Data Analyst', company: 'DataCo', views: 165, datePosted: 'Nov 10, 2025', status: 'Active' },
        { title: 'Mobile Developer', company: 'AppWorks', views: 142, datePosted: 'Nov 9, 2025', status: 'Active' },
        { title: 'Product Manager', company: 'ProductHub', views: 128, datePosted: 'Nov 8, 2025', status: 'Closed' }
    ];

    // Jobs Applied Data
    jobsAppliedData = [
        { candidateName: 'John Smith', candidateInitials: 'JS', jobTitle: 'Senior Frontend Developer', appliedDate: 'Nov 18, 2025', status: 'Pending' },
        { candidateName: 'Sarah Johnson', candidateInitials: 'SJ', jobTitle: 'Full Stack Engineer', appliedDate: 'Nov 18, 2025', status: 'Reviewed' },
        { candidateName: 'Michael Chen', candidateInitials: 'MC', jobTitle: 'UI/UX Designer', appliedDate: 'Nov 17, 2025', status: 'Shortlisted' },
        { candidateName: 'Emily Davis', candidateInitials: 'ED', jobTitle: 'Backend Developer', appliedDate: 'Nov 17, 2025', status: 'Pending' },
        { candidateName: 'David Wilson', candidateInitials: 'DW', jobTitle: 'DevOps Engineer', appliedDate: 'Nov 16, 2025', status: 'Reviewed' },
        { candidateName: 'Lisa Anderson', candidateInitials: 'LA', jobTitle: 'Data Analyst', appliedDate: 'Nov 16, 2025', status: 'Rejected' },
        { candidateName: 'Robert Taylor', candidateInitials: 'RT', jobTitle: 'Mobile Developer', appliedDate: 'Nov 15, 2025', status: 'Pending' },
        { candidateName: 'Jennifer Lee', candidateInitials: 'JL', jobTitle: 'Product Manager', appliedDate: 'Nov 15, 2025', status: 'Shortlisted' }
    ];

    // Date range picker
    dateRange = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null)
    });
    displayDateRange: string = '';

    constructor(
        private jobService: JobService,
        private companyService: CompanyService,
        private userService: UserService,
        private cdr: ChangeDetectorRef
    ) {
        // Set default dates (last 7 days)
        const today = new Date();
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        
        this.dateRange.setValue({
            start: lastWeek,
            end: today
        });
        
        this.updateDisplayDateRange();

        // Listen to date range changes
        this.dateRange.valueChanges.subscribe(() => {
            this.onDateRangeChange();
        });
    }

    ngOnInit(): void {
        this.loadStats();
    }

    ngAfterViewInit(): void {
        this.initChart();
    }

    ngOnDestroy(): void {
        if (this.chart) {
            this.chart.destroy();
        }
    }

    // Initialize Chart.js
    initChart(): void {
        // Check if canvas element exists and is ready
        if (!this.jobStatsCanvas || !this.jobStatsCanvas.nativeElement) {
            console.warn('Canvas element not ready yet');
            return;
        }

        // Destroy existing chart if it exists
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }

        const ctx = this.jobStatsCanvas.nativeElement.getContext('2d');
        if (!ctx) {
            console.warn('Could not get canvas context');
            return;
        }

        // Chart data for weekly view
        const chartData = this.getChartData('week');

        const config: ChartConfiguration = {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        align: 'start',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 20,
                            font: {
                                size: 13,
                                weight: 500
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#1f2937',
                        padding: 12,
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#374151',
                        borderWidth: 1,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 12
                            },
                            color: '#6b7280'
                        }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        grid: {
                            color: '#f3f4f6'
                        },
                        border: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 12
                            },
                            color: '#6b7280',
                            stepSize: 50
                        }
                    }
                }
            }
        };

        this.chart = new Chart(ctx, config);
    }

    // Get chart data based on time filter
    getChartData(timeFilter: string) {
        if (timeFilter === 'week') {
            return {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'Job View',
                        data: [180, 150, 200, 160, 220, 140, 190],
                        backgroundColor: '#f59e0b',
                        borderRadius: 6,
                        barThickness: 24
                    },
                    {
                        label: 'Job Applied',
                        data: [80, 65, 90, 70, 95, 60, 85],
                        backgroundColor: '#8b5cf6',
                        borderRadius: 6,
                        barThickness: 24
                    }
                ]
            };
        } else if (timeFilter === 'month') {
            return {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [
                    {
                        label: 'Job View',
                        data: [800, 900, 750, 850],
                        backgroundColor: '#f59e0b',
                        borderRadius: 6,
                        barThickness: 40
                    },
                    {
                        label: 'Job Applied',
                        data: [350, 400, 320, 380],
                        backgroundColor: '#8b5cf6',
                        borderRadius: 6,
                        barThickness: 40
                    }
                ]
            };
        } else {
            return {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Job View',
                        data: [3200, 2800, 3500, 3000, 3800, 3400, 3600, 3200, 3900, 3700, 4000, 3500],
                        backgroundColor: '#f59e0b',
                        borderRadius: 6,
                        barThickness: 20
                    },
                    {
                        label: 'Job Applied',
                        data: [1400, 1200, 1500, 1300, 1600, 1450, 1550, 1400, 1650, 1600, 1700, 1500],
                        backgroundColor: '#8b5cf6',
                        borderRadius: 6,
                        barThickness: 20
                    }
                ]
            };
        }
    }

    // Change time filter
    setTimeFilter(filter: 'week' | 'month' | 'year'): void {
        this.activeTimeFilter = filter;
        this.updateChart();
    }

    // Change tab
    setActiveTab(tab: string): void {
        this.activeTab = tab;
        
        // If switching to overview, re-render chart after view update
        if (tab === 'overview') {
            // Trigger change detection first
            this.cdr.detectChanges();
            
            // Then wait for DOM to be ready and render chart
            setTimeout(() => {
                this.initChart();
            }, 100);
        }
    }

    // Update chart with new data
    updateChart(): void {
        if (!this.chart) {
            this.initChart();
            return;
        }

        const newData = this.getChartData(this.activeTimeFilter);
        this.chart.data = newData;
        this.chart.update();
    }

    // Format date for display (Jul 19)
    formatDateDisplay(date: Date | null): string {
        if (!date) return '';
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate()}`;
    }

    // Update display date range
    updateDisplayDateRange() {
        const start = this.dateRange.value.start;
        const end = this.dateRange.value.end;
        
        if (start && end) {
            this.displayDateRange = `${this.formatDateDisplay(start)} - ${this.formatDateDisplay(end)}`;
        }
    }

    // Handle date range change
    onDateRangeChange() {
        const start = this.dateRange.value.start;
        const end = this.dateRange.value.end;
        
        if (start && end) {
            this.updateDisplayDateRange();
            
            // Console log the selected dates
            console.log('Selected Date Range:');
            console.log('Start Date:', start);
            console.log('End Date:', end);
            console.log('Display Format:', this.displayDateRange);
            
            // Reload stats based on date range
            this.loadStats();
        }
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
