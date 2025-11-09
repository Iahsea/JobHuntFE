import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';


@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDividerModule,
        FormsModule
    ],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isAuthenticated = true;
    currentUser: any = null;
    isAdmin = true;
    selectedCountry = 'India';
    selectedLanguage = 'English';
    searchQuery = '';

    countries = [
        { value: 'India', flag: '🇮🇳', label: 'India' },
        { value: 'Vietnam', flag: '🇻🇳', label: 'Vietnam' },
        { value: 'USA', flag: '🇺🇸', label: 'USA' }
    ];

    languages = [
        { value: 'English', label: 'English' },
        { value: 'Vietnamese', label: 'Tiếng Việt' },
        { value: 'Hindi', label: 'हिन्दी' }
    ];

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.authService.currentUser$.subscribe(user => {
            this.currentUser = user;
            this.isAuthenticated = !!user;
            this.isAdmin = this.authService.isAdmin();
        });
    }

    logout(): void {
        this.authService.logout();
    }

    onSearch(): void {
        console.log('Searching for:', this.searchQuery);
        // Implement search logic
    }
}