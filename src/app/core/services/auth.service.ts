import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserLogin, UserRegistration } from '../../models/user.model';
import { AuthResponse } from '../../models/auth.model';
import { OAuthConfig } from "../configurations/configuration";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8089/api/v1/auth'; // Thay đổi theo API của bạn
    private currentUserSubject = new BehaviorSubject<any>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) {
        this.loadUserFromStorage();
    }

    private loadUserFromStorage(): void {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user') || localStorage.getItem('userGoogle');
        if (token && user) {
            this.currentUserSubject.next(JSON.parse(user));
        }
    }

    register(userData: UserRegistration): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/register`, userData);
    }

    login(credentials: UserLogin): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                this.currentUserSubject.next(response.data.user);
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userGoogle');
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
    }

    loginWithGoogle(){
        const callbackUrl = OAuthConfig.redirectUri;
        const authUrl = OAuthConfig.authUri;
        const googleClientId = OAuthConfig.clientId;

        const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
        callbackUrl
        )}&response_type=token&client_id=${googleClientId}&scope=openid%20email%20profile`;

        console.log(targetUrl);

        window.location.href = targetUrl;
    };

    changeCodeToToken(code: string): Observable<any> {
        return this.http.post<any>(`http://localhost:8089/api/v1/outbound/authentication`, { code });
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    setCurrentUser(user: any) {
        this.currentUserSubject.next(user);
    }


    getCurrentUser(): any {
        return this.currentUserSubject.value;
    }

    isAdmin(): boolean {
        const user = this.getCurrentUser();
        return user?.role === 'admin';
    }
}
