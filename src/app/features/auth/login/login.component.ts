import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { HeaderComponent } from "../../../shared/components/header/header.component";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, HeaderComponent, TranslateModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    errorMessage = '';
    isLoading = false;
    showPassword = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';

            this.authService.login(this.loginForm.value).subscribe({
                next: (response) => {
                    this.isLoading = false;
                    this.router.navigate(['/']);
                },
                error: (error) => {
                    this.isLoading = false;
                    this.errorMessage = error.error?.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
                }
            });
        }
    }

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }

    onGoogleLogin(): void {
        // TODO: Implement Google OAuth login
        console.log('Google login clicked');
        this.errorMessage = 'Tính năng đăng nhập bằng Google sẽ sớm được cập nhật.';
    }
}
