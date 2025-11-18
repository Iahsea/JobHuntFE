import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-card-skeleton',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './card-skeleton.component.html',
    styleUrls: ['./card-skeleton.component.scss']
})
export class CardSkeletonComponent {
    @Input() viewMode: 'list' | 'grid' = 'grid';
    @Input() count: number = 4;
    @Input() showDescription: boolean = true;
    @Input() showFooter: boolean = true;

    get skeletonArray(): number[] {
        return Array(this.count).fill(0);
    }
}
