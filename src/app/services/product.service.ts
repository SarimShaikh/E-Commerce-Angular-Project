import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8082/api/v1/inventory';
  private salesUrl = 'http://localhost:8083/api/v1/sales';

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

  UpdateProductDetail(productDetailInfo: any): Observable<any> {
    console.log(productDetailInfo);
    return this.http.put(
      `${this.baseUrl}/update-item-details`,
      productDetailInfo
    );
  }

  UpdateProduct(productInfo: any): Observable<any> {
    console.log(productInfo);
    return this.http.put(`${this.baseUrl}/update-item`, productInfo);
  }

  DeleteProduct(itemId: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-itemAndDetail/${itemId}`);
  }

  DeleteProductDetail(itemDetailId: any): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/delete-item-Details/${itemDetailId}`
    );
  }

  getAllImages(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-images`);
  }

  UploadImages(itemId: any, files: any): Observable<any> {
    var formData = new FormData();

    for (var i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    //console.log(formData.getAll('files'));
    return this.http.post(`${this.baseUrl}/upload-images/${itemId}`, formData);
  }
  DeleteImage(imageId: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-item-image/${imageId}`);
  }

  UpdateInventory(productInfo: any): Observable<any> {
    console.log(productInfo);
    return this.http.put(`${this.baseUrl}/update-inventory`, productInfo);
  }

  getRentailItems(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-rental-items`);
  }

  getReturnItems(): Observable<any> {
    return this.http.get(`${this.salesUrl}/return-items`);
  }

  returnItem(id: any): Observable<any> {
    return this.http.delete(`${this.salesUrl}/delete-rental-item/${id}`);
  }

  getOrder(page: any, size: any, orderNumber: any): Observable<any> {
    if (orderNumber === undefined) {
      return this.http.get(
        `${this.salesUrl}/get-orders?page=${page}&size=${size}`
      );
    }
    if (orderNumber !== undefined || orderNumber !== null) {
      return this.http.get(
        `${this.salesUrl}/get-orders?orderNum=${orderNumber}&page=${page}&size=${size}`
      );
    }
  }
}
