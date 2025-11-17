import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-search-box',
    standalone: true,
    imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule],
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
    @Input() searchPlaceholder: string = 'Job title, Keyword...';
    @Input() locationPlaceholder: string = 'Your Location';
    @Input() buttonText: string = 'Search';
    @Input() suggestionLabel: string = 'Suggestion:';
    @Input() suggestions: string[] = ['Designer', 'Programming', 'Digital Marketing', 'Video', 'Animation'];
    @Input() showSuggestions: boolean = true;
    @Input() iconColor: string = '#60a5fa'; // Default blue color matching button
    @Input() textColor: string = '#1f2937'; // Default dark text color

    searchKeyword: string = '';
    searchLocation: string = '';

    @Output() search = new EventEmitter<{ keyword: string, location: string }>();

    onSearch(): void {
        this.search.emit({
            keyword: this.searchKeyword,
            location: this.searchLocation
        });
    }

    onSuggestionClick(suggestion: string): void {
        this.searchKeyword = suggestion;
        this.onSearch();
    }
}
