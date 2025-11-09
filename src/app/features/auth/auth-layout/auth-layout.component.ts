import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-auth-layout',
    standalone: true,
    imports: [RouterOutlet],
    template: `
    <div class="auth-container">
      <router-outlet></router-outlet>  <!-- ← LoginComponent, RegisterComponent render ở đây -->
    </div>
  `
})
export class AuthLayoutComponent {}
