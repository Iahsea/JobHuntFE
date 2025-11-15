import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
    selector: 'app-page-layout',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    template: `
    <app-header></app-header>
    <main class="page-container">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
    styles: [`
    .page-container {
      min-height: calc(100vh - 200px);
      background-color: #FFFFFF;
    }
  `]
})
export class PageLayoutComponent { }
