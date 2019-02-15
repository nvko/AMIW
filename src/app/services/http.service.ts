import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Injectable({
  providedIn: 'root'
})

export class HttpService {

  // change the URL to your own domain
  private url = 'http://localhost/REST';

  private productsInCart = new Array<Product>();
  private productsInCartObservable = new Subject<Array<Product>>();

  constructor(private http: HttpClient) {
    this.productsInCart = new Array<Product>();
  }

  // PRODUCTS
  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.url + '/products/');
  }

  getProductId(id: number): Observable<Product> {
    return this.http.get<Product>(this.url + '/products/' + id);
  }

  // CART
  getProductsInCart(user: string): Observable<Array<Product>> {
    this.http.get<Array<Product>>(this.url + '/cart/' + user).subscribe(data => {
      this.productsInCart = data;
      this.productsInCartObservable.next(this.productsInCart);
    });
    return this.productsInCartObservable;
  }

  addProductToCart(product: Product): Observable<Message> {
    return this.http.post<Message>(this.url + '/cart/add', {
      user: 'anon',
      product_id: String(product.id),
    });
  }

  removeFromCart(user: string, product: Product): Observable<Message> {
    return this.http.delete<Message>(this.url + '/cart/delete/' + user + '/' + product.id);
  }


  // HISTORY
  buyProducts(products: Array<Product>): Observable<Message> {
    return this.http.post<Message>(this.url + '/cart/buy', {
      user: 'anon'
    });
  }

  getPurchaseHistory(user: string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.url + '/history/' + user);
  }

}
