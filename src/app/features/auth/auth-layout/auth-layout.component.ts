import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-auth-layout',
    standalone: true,
    imports: [RouterOutlet],
    template: `
    <div class="auth-container min-h-screen flex items-center justify-center bg-gray-50">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AuthLayoutComponent { }
