import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job, JobCreate } from '../../models/job.model';

@Injectable({
    providedIn: 'root'
})
export class JobService {
    private apiUrl = 'http://localhost:8080/api/jobs'; // Thay đổi theo API của bạn

    constructor(private http: HttpClient) { }

    getAllJobs(page: number = 1, limit: number = 10): Observable<any> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());
        return this.http.get<any>(this.apiUrl, { params });
    }

    getJobById(id: number): Observable<Job> {
        return this.http.get<Job>(`${this.apiUrl}/${id}`);
    }

    createJob(job: JobCreate): Observable<Job> {
        return this.http.post<Job>(this.apiUrl, job);
    }

    updateJob(id: number, job: Partial<Job>): Observable<Job> {
        return this.http.put<Job>(`${this.apiUrl}/${id}`, job);
    }

    deleteJob(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    searchJobs(filters: any): Observable<Job[]> {
        let params = new HttpParams();
        Object.keys(filters).forEach(key => {
            if (filters[key]) {
                params = params.set(key, filters[key]);
            }
        });
        return this.http.get<Job[]>(`${this.apiUrl}/search`, { params });
    }

    getJobsByCompany(companyId: number): Observable<Job[]> {
        return this.http.get<Job[]>(`${this.apiUrl}/company/${companyId}`);
    }
}
