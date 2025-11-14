import { Directive, ElementRef, OnInit, OnDestroy, Renderer2, Input } from '@angular/core';

@Directive({
    selector: '[appScrollReveal]',
    standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
    @Input() revealDelay: number = 0;
    @Input() revealDuration: number = 800;
    @Input() revealFrom: 'bottom' | 'top' | 'left' | 'right' = 'bottom';

    private observer?: IntersectionObserver;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit(): void {

        const element = this.el.nativeElement;
        if (element.tagName === 'VIDEO' || element.querySelector('video')) {
            return;
        }

        // Add initial class
        this.renderer.addClass(this.el.nativeElement, 'scroll-reveal-init');

        // Set direction as a data attribute for CSS
        this.renderer.setAttribute(this.el.nativeElement, 'data-reveal-from', this.revealFrom);

        // Set custom properties for delay and duration
        this.renderer.setStyle(this.el.nativeElement, '--scroll-reveal-delay', `${this.revealDelay}ms`);
        this.renderer.setStyle(this.el.nativeElement, '--scroll-reveal-duration', `${this.revealDuration}ms`);

        // Create intersection observer
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.reveal();
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        this.observer.observe(this.el.nativeElement);
    }

    private reveal(): void {
        this.renderer.addClass(this.el.nativeElement, 'scroll-reveal-show');
        // Unobserve after reveal
        if (this.observer) {
            this.observer.unobserve(this.el.nativeElement);
        }
    }

    ngOnDestroy(): void {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}