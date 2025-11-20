import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';


export interface MenuItem {
    icon: string;
    label: string;
    route: string;
}

export interface MenuSection {
    title?: string;
    items: MenuItem[];
}

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatBadgeModule,
        MatTooltipModule
    ],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    @Input() menuSections: MenuSection[] = [];
    @Input() userInfo?: { name: string; email: string; avatar?: string };
    @Input() logoText: string = 'JobHuntly';

    @Input() isExpanded: boolean = true;
    @Output() isExpandedChange = new EventEmitter<boolean>();

    toggleSidebar(): void {
        this.isExpanded = !this.isExpanded;
        this.isExpandedChange.emit(this.isExpanded);
    }
}
