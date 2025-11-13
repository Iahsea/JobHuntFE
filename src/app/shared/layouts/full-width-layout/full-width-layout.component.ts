import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
    selector: 'app-full-width-layout',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    template: `
    <app-header></app-header>
    <main class="full-width-container">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
    styles: [`
    .full-width-container {
      min-height: calc(100vh - 200px);
      width: 100%;
    }
  `]
})
export class FullWidthLayoutComponent { }
