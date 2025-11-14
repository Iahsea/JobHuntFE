import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
    selector: 'app-hero-banner',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule,
        TranslateModule,
        ScrollRevealDirective
    ],
    templateUrl: './hero-banner.component.html',
    styleUrls: ['./hero-banner.component.scss']
})
export class HeroBannerComponent implements AfterViewInit {
    searchKeyword: string = '';
    searchLocation: string = '';
    @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

    onSearch(): void {
        console.log('Search:', this.searchKeyword, this.searchLocation);
        // Implement search logic here
    }

    ngAfterViewInit() {
        const video = this.bgVideo.nativeElement;

        // Thử play ngay, nếu browser block sẽ catch lỗi
        video.play().catch(err => {
            console.warn('Autoplay bị block, sẽ play khi người dùng tương tác:', err);

            // Tạo listener để play sau khi người dùng click vào trang
            const playOnInteraction = () => {
                video.play().catch(() => { });
                window.removeEventListener('click', playOnInteraction);
            };
            window.addEventListener('click', playOnInteraction);
        });
    }

}
