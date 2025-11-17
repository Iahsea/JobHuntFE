import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-paginator',
    standalone: true,
    imports: [CommonModule, MatPaginatorModule],
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
    @Input() length: number = 0; // Total number of items
    @Input() pageSize: number = 10; // Items per page
    @Input() pageIndex: number = 0; // Current page (0-indexed)
    @Input() pageSizeOptions: number[] = [5, 10, 25, 50];
    @Input() showFirstLastButtons: boolean = true;

    @Output() page = new EventEmitter<PageEvent>();

    onPageChange(event: PageEvent): void {
        this.page.emit(event);
    }
}
