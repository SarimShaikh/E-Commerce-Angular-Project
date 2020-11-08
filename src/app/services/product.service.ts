import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8082/api/v1/inventory';

  constructor(private http: HttpClient) {}

  AddProduct(productInfo: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-item`, productInfo);
  }
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-items`);
  }
  AddProductDetail(productInfo: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-item-details`, productInfo);
  }

  getInventory(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-inventory`);
  }
}
