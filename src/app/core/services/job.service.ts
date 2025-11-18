import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job, JobCreate } from '../../models/job.model';
import { JobDetailResponseDto, JobPaginationData, JobResponseDto } from '../../models/dto/job-response.dto';
import { environment } from '../../../environments/environment';
import { BaseResponse } from '../../models/dto';

@Injectable({
    providedIn: 'root'
})
export class JobService {
    private apiUrl = `${environment.apiBaseUrl}/jobs`; // Thay đổi theo API của bạn

    constructor(private http: HttpClient) { }

    getAllJobs(page: number = 1, size: number = 10, keyword: string = ''): Observable<BaseResponse<{ result: JobResponseDto[] }>> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());
        if (keyword) {
            params = params.set('filter', `name~'${keyword}'`);
        }
        return this.http.get<BaseResponse<{ result: JobResponseDto[] }>>(this.apiUrl, { params });
    }

    getJobById(id: number): Observable<BaseResponse<JobDetailResponseDto>> {
        return this.http.get<BaseResponse<JobDetailResponseDto>>(`${this.apiUrl}/${id}`);
    }

    createJob(job: JobCreate): Observable<BaseResponse<JobDetailResponseDto>> {
        return this.http.post<BaseResponse<JobDetailResponseDto>>(this.apiUrl, job);
    }

    updateJob(id: number, job: Partial<JobCreate>): Observable<BaseResponse<JobDetailResponseDto>> {
        return this.http.put<BaseResponse<JobDetailResponseDto>>(`${this.apiUrl}/${id}`, job);
    }

    deleteJob(id: number): Observable<BaseResponse<null>> {
        return this.http.delete<BaseResponse<null>>(`${this.apiUrl}/${id}`);
    }

    searchJobs(keyword: string): Observable<BaseResponse<JobResponseDto[]>> {
        let params = new HttpParams();
        if (keyword) {
            params = params.set('filter', `name~'${keyword}'`);
        }
        return this.http.get<BaseResponse<JobResponseDto[]>>(`${this.apiUrl}`, { params });
    }

    getJobsByCompany(companyId: number): Observable<BaseResponse<JobResponseDto[]>> {
        return this.http.get<BaseResponse<JobResponseDto[]>>(`${this.apiUrl}/company/${companyId}`);
    }
}
