import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewproductsService {
  private baseUrl = 'http://localhost:8082/api/v1/inventory';
  private salesUrl = 'http://localhost:8083/api/v1/sales';

  constructor(private http: HttpClient) {}

  getProductsAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-items`);
  }
  getProductsAllByPage(page, size, itemName): Observable<any> {
    if (itemName === undefined) {
      return this.http.get(
        `${this.baseUrl}/get-items?page=${page}&size=${size}`
      );
    } else {
      return this.http.get(
        `${this.baseUrl}/get-items?itemName=${itemName}&page=${page}&size=${size}`
      );
    }
  }

  getProductsAllWithCategoryByPage(
    page,
    size,
    categoryId,
    subCategoryId
  ): Observable<any> {
    if (subCategoryId === undefined) {
      return this.http.get(
        `${this.baseUrl}/get-category-items?categoryId=${categoryId}&page=${page}&size=${size}`
      );
    } else {
      return this.http.get(
        `${this.baseUrl}/get-category-items?categoryId=${categoryId}&subCategoryId=${subCategoryId}&page=${page}&size=${size}`
      );
    }
  }

  getQuantityStatus(itemDetailId, quantity) {
    return this.http.get(
      `${this.salesUrl}/check-quantity?itemDetailId=${itemDetailId}&quantity=${quantity}`
    );
  }

  SubmitOrder(orderInfo: any): Observable<any> {
    return this.http.post(`${this.salesUrl}/place-order`, orderInfo);
  }
}
