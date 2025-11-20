import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent, MenuSection } from '../../../shared/components/sidebar/sidebar.component';
import { AdminHeaderComponent } from '../components/admin-header/admin-header.component';

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, SidebarComponent, AdminHeaderComponent],
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
    menuSections: MenuSection[] = [
        {
            items: [
                { icon: 'dashboard', label: 'Dashboard', route: '/admin/dashboard' },
                { icon: 'message', label: 'Messages', route: '/admin/messages' },
                { icon: 'work', label: 'My Applications', route: '/admin/applications' },
                { icon: 'search', label: 'Find Jobs', route: '/admin/manage-jobs' },
                { icon: 'business', label: 'Browse Companies', route: '/admin/manage-companies' },
                { icon: 'person', label: 'My Public Profile', route: '/admin/profile' },
                { icon: 'users', label: 'Manage Users', route: '/admin/manage-users' },
                { icon: 'resume', label: 'Manage Resumes', route: '/admin/manage-resumes' }
            ]
        },
        {
            title: 'Settings',
            items: [
                { icon: 'settings', label: 'Settings', route: '/admin/settings' },
                { icon: 'help', label: 'Help Center', route: '/admin/help' }
            ]
        }
    ];

    userInfo = {
        name: 'Jake Gyll',
        email: 'jake@uilib.com',
        avatar: ''
    };

    isSidebarExpanded = true;

    constructor(private cdr: ChangeDetectorRef) { }

    onSidebarToggle(expanded: boolean) {
        this.isSidebarExpanded = expanded;
        console.log('Sidebar toggled:', expanded);
        console.log('Right content should have collapsed class:', !expanded);
        this.cdr.detectChanges();
    }
}
