import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { HeroBannerComponent } from '../hero-banner/hero-banner.component';

@Component({
    selector: 'app-hero-wrapper',
    standalone: true,
    imports: [CommonModule, HeaderComponent, HeroBannerComponent],
    templateUrl: './hero-wrapper.component.html',
    styleUrls: ['./hero-wrapper.component.scss']
})
export class HeroWrapperComponent implements AfterViewInit {

    @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

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
