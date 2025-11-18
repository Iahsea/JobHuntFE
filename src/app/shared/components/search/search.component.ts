import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface SearchCriteria {
    keyword: string;
    location: string;
}

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule],
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {
    @Input() keywordPlaceholder = 'Job title, keywords, or company';
    @Input() locationPlaceholder = 'City or postcode';
    @Input() buttonText = 'Find Job';
    @Input() showSuggestions = true;
    @Input() suggestions: string[] = ['Designer', 'Programming', 'Digital Marketing', 'Video', 'Animation'];
    @Input() suggestionLabel = 'Suggestion:';
    @Input() variant: 'default' | 'compact' = 'default';

    @Output() search = new EventEmitter<SearchCriteria>();

    searchKeyword = '';
    searchLocation = '';

    onSearch(): void {
        this.search.emit({
            keyword: this.searchKeyword.trim(),
            location: this.searchLocation.trim()
        });
    }
}
