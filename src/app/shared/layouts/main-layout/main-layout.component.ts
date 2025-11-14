import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HowItWorksComponent } from '../../../features/how-it-works/how-it-works.component';
import { HeroBannerComponent } from '../../../features/home/hero-banner/hero-banner.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HowItWorksComponent,
    HeroBannerComponent
  ],
  template: `
    <app-header></app-header>
    <app-hero-banner></app-hero-banner>
    <app-how-it-works></app-how-it-works>
    <main class="main-container">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    .main-container {
      min-height: calc(100vh - 200px);
      max-width: 72rem;
      margin-left: auto;
      margin-right: auto;
      padding-left: 1rem;
      padding-right: 1rem;
      background-color: #FFFFFF;

      @media (max-width: 640px) {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
      }
    }
  `]
})
export class MainLayoutComponent { }
