import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Product } from './../models/product';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class HttpService {


  constructor(private http: HttpClient) { }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>('http://localhost/getProducts.php');
  }

  getProductId(id: number): Observable<Product> {
    return this.http.get<Product>('http://localhost/getProductById.php?id=' + id);
  }

  getProductsInCart(username: string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>('http://localhost/getProductsInCart.php?username=' + username);
  }

  getPurchaseHistory(username: string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>('http://localhost/getPurchaseHistory.php?username=' + username);
  }

  addProductToCart(id: number) {

  }

  addBoughtProducts(products: Array<Product>) {

  }


}
