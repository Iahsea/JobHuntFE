import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyCreate } from '../../models/company.model';
import { CompanyDetailResponseDto, CompanyResponseDto, BaseResponse, CompanyListResponseDto } from '../../models/dto';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    private apiUrl = `${environment.apiBaseUrl}/companies`; // Thay đổi theo API của bạn

    constructor(private http: HttpClient) { }

    getAllCompanies(page: number = 1, size: number = 10): Observable<BaseResponse<CompanyListResponseDto>> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());
        return this.http.get<BaseResponse<CompanyListResponseDto>>(this.apiUrl, { params });
    }

    getCompanyById(id: number): Observable<BaseResponse<CompanyDetailResponseDto>> {
        return this.http.get<BaseResponse<CompanyDetailResponseDto>>(`${this.apiUrl}/${id}`);
    }

    createCompany(company: CompanyCreate): Observable<BaseResponse<CompanyDetailResponseDto>> {
        return this.http.post<BaseResponse<CompanyDetailResponseDto>>(this.apiUrl, company);
    }

    updateCompany(id: number, company: Partial<CompanyCreate>): Observable<BaseResponse<CompanyDetailResponseDto>> {
        return this.http.put<BaseResponse<CompanyDetailResponseDto>>(`${this.apiUrl}/${id}`, company);
    }

    deleteCompany(id: number): Observable<BaseResponse<null>> {
        return this.http.delete<BaseResponse<null>>(`${this.apiUrl}/${id}`);
    }

    searchCompanies(keyword: string): Observable<BaseResponse<CompanyResponseDto[]>> {
        const params = new HttpParams().set('keyword', keyword);
        return this.http.get<BaseResponse<CompanyResponseDto[]>>(`${this.apiUrl}/search`, { params });
    }
}
