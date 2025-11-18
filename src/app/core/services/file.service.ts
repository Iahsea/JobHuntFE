import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FileUploadResponse } from '../../models/dto/file.dto';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/files`;

    uploadFile(file: File, folder: string): Observable<FileUploadResponse> {
        // Validate file before upload
        if (!file) {
            return throwError(() => new Error('No file provided'));
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        return this.http.post<FileUploadResponse>(this.apiUrl, formData).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'An error occurred while uploading file';

        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            errorMessage = error.error?.message || `Server Error: ${error.status}`;
        }

        console.error('File upload error:', errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}
