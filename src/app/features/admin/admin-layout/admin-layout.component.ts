import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
    menuItems = [
        { icon: 'speedometer2', label: 'Dashboard', route: '/admin' },
        { icon: 'briefcase', label: 'Quản lý việc làm', route: '/admin/jobs' },
        { icon: 'building', label: 'Quản lý công ty', route: '/admin/companies' },
        { icon: 'people', label: 'Quản lý người dùng', route: '/admin/users' }
    ];
}
