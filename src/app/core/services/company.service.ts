import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company, CompanyCreate } from '../../models/company.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    private apiUrl = `${environment.apiBaseUrl}/companies`; // Thay đổi theo API của bạn

    constructor(private http: HttpClient) { }

    getAllCompanies(page: number = 1, limit: number = 10): Observable<any> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());
        return this.http.get<any>(this.apiUrl, { params });
    }

    getCompanyById(id: number): Observable<Company> {
        return this.http.get<Company>(`${this.apiUrl}/${id}`);
    }

    createCompany(company: CompanyCreate): Observable<Company> {
        return this.http.post<Company>(this.apiUrl, company);
    }

    updateCompany(id: number, company: Partial<Company>): Observable<Company> {
        return this.http.put<Company>(`${this.apiUrl}/${id}`, company);
    }

    deleteCompany(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    searchCompanies(keyword: string): Observable<Company[]> {
        const params = new HttpParams().set('keyword', keyword);
        return this.http.get<Company[]>(`${this.apiUrl}/search`, { params });
    }
}
