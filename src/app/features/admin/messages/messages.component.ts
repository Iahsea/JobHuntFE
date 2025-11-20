import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-messages',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
    messages = [
        { id: 1, sender: 'John Doe', subject: 'Application Update', preview: 'Your application has been reviewed...', time: '2 hours ago', unread: true },
        { id: 2, sender: 'HR Manager', subject: 'Interview Invitation', preview: 'We would like to invite you...', time: '1 day ago', unread: false }
    ];
}
