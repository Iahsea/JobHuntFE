import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        TranslateModule
    ],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    languages: any[] = [];
    currentLanguage: any;

    constructor(public languageService: LanguageService) { }

    ngOnInit(): void {
        // Lý do: Lấy danh sách các ngôn ngữ hỗ trợ từ LanguageService để hiển thị trên giao diện (dropdown chọn ngôn ngữ).
        // Nếu không gọi, biến languages sẽ rỗng và không render được danh sách ngôn ngữ.
        this.languages = this.languageService.getLanguages();
        this.updateCurrentLanguage();
    }

    changeLanguage(langCode: string): void {
        this.languageService.setLanguage(langCode);
        this.updateCurrentLanguage();
    }

    private updateCurrentLanguage(): void {
        const currentLangCode = this.languageService.getCurrentLanguage();
        this.currentLanguage = this.languages.find(lang => lang.code === currentLangCode);
    }
}