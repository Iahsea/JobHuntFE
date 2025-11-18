import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ResumeCreateDto, ResumeResponseDto } from '../../models/dto/resume.dto';

@Injectable({
    providedIn: 'root'
})
export class ResumeService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/resumes`;

    submitResume(resumeData: ResumeCreateDto): Observable<{ data: ResumeResponseDto }> {
        return this.http.post<{ data: ResumeResponseDto }>(this.apiUrl, resumeData).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'An error occurred while submitting resume';

        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            errorMessage = error.error?.message || `Server Error: ${error.status}`;
        }

        console.error('Resume submission error:', errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}
