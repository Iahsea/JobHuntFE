import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, HeaderComponent, TranslateModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    errorMessage = '';
    isLoading = false;
    showPassword = false;
    passwordTouched = false;

    // Password validation flags
    hasMinLength = false;
    hasSymbol = false;
    hasNumber = false;
    hasUpperCase = false;
    hasLowerCase = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, this.passwordValidator.bind(this)]],
            termsAgreement: [false, Validators.requiredTrue]
        });
    }

    ngOnInit(): void {
        // Subscribe to password changes for real-time validation
        this.registerForm.get('password')?.valueChanges.subscribe(password => {
            this.validatePassword(password);
        });
    }

    passwordValidator(control: any) {
        const password = control.value;
        if (!password) return { required: true };

        this.validatePassword(password);

        if (this.isPasswordValid) {
            return null;
        }
        return { invalidPassword: true };
    }

    validatePassword(password: string): void {
        this.hasMinLength = password.length >= 12;
        this.hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        this.hasNumber = /\d/.test(password);
        this.hasUpperCase = /[A-Z]/.test(password);
        this.hasLowerCase = /[a-z]/.test(password);
        
        if (password.length > 0) {
            this.passwordTouched = true;
        }
    }

    get isPasswordValid(): boolean {
        return this.hasMinLength && this.hasSymbol && this.hasNumber && 
               this.hasUpperCase && this.hasLowerCase;
    }

    get isFormValid(): boolean {
        return !!(this.registerForm.get('name')?.valid &&
               this.registerForm.get('email')?.valid &&
               this.isPasswordValid &&
               this.registerForm.get('termsAgreement')?.value === true);
    }

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }

    onGoogleSignUp(isChecked: boolean): void {
        if (!isChecked) {
            this.errorMessage = 'Vui lòng đồng ý với điều khoản để đăng ký bằng Google.';
            return;
        }
        // TODO: Implement Google OAuth sign up
        console.log('Google sign up clicked');
        this.errorMessage = 'Tính năng đăng ký bằng Google sẽ sớm được cập nhật.';
    }

    onSubmit(): void {
        if (this.isFormValid && !this.isLoading) {
            this.isLoading = true;
            this.errorMessage = '';

            const userData = {
                name: this.registerForm.get('name')?.value,
                email: this.registerForm.get('email')?.value,
                password: this.registerForm.get('password')?.value
            };

            this.authService.register(userData).subscribe({
                next: (response) => {
                    this.isLoading = false;
                    this.router.navigate(['/auth/login']);
                },
                error: (error) => {
                    this.isLoading = false;
                    this.errorMessage = error.error?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
                }
            });
        }
    }
}
