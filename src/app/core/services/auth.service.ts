import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserLogin, UserRegistration } from '../../models/user.model';
import { AuthResponse } from '../../models/auth.model';

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
        const user = localStorage.getItem('user');
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
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getCurrentUser(): any {
        return this.currentUserSubject.value;
    }

    isAdmin(): boolean {
        const user = this.getCurrentUser();
        return user?.role === 'admin';
    }
}
