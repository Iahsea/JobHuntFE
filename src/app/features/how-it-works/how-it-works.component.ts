import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
    selector: 'app-how-it-works',
    standalone: true,
    imports: [CommonModule, MatIconModule, TranslateModule, ScrollRevealDirective],
    templateUrl: './how-it-works.component.html',
    styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent {
    steps = [
        {
            icon: 'person_add',
            title: 'HOW_IT_WORKS.CREATE_ACCOUNT',
            description: 'HOW_IT_WORKS.CREATE_ACCOUNT_DESC'
        },
        {
            icon: 'search',
            title: 'HOW_IT_WORKS.FIND_JOB',
            description: 'HOW_IT_WORKS.FIND_JOB_DESC'
        },
        {
            icon: 'cloud_upload',
            title: 'HOW_IT_WORKS.UPLOAD_CV',
            description: 'HOW_IT_WORKS.UPLOAD_CV_DESC'
        },

        {
            icon: 'verified',
            title: 'HOW_IT_WORKS.APPLY_JOB',
            description: 'HOW_IT_WORKS.APPLY_JOB_DESC'
        }
    ];
}
