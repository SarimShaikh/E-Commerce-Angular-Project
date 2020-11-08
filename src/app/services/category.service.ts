import { Category } from './../models/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:8082/api/v1/inventory';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-categories`);
  }
  AddCategory(categoryInfo: Category): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-category`, categoryInfo);
  }
  UpdateCategory(categoryInfo: any): Observable<any> {
    console.log(categoryInfo);
    return this.http.put(`${this.baseUrl}/update-category`, categoryInfo);
  }

  AddSubCategory(categoryInfo: Category): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-sub-category`, categoryInfo);
  }
  DeleteCategory(Id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-category/${Id}`);
  }

  UpdateSubCategory(categoryInfo: Category): Observable<any> {
    console.log(categoryInfo);
    return this.http.put(`${this.baseUrl}/update-Subcategory`, categoryInfo);
  }
}
