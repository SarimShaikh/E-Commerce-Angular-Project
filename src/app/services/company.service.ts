import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private baseUrl = 'http://localhost:8082/api/v1/inventory';

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-companies`);
  }

  AddCompany(companyInfo: Company): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-company`, companyInfo);
  }

  UpdateCompany(companyInfo: Company): Observable<any> {
    return this.http.put(`${this.baseUrl}/update-company`, companyInfo);
  }
  DeleteCompany(companyId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-company/${companyId}`);
  }
}
