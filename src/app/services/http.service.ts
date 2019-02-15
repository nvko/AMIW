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
  private url = 'http://localhost/REST/';

  private productsInCart = new Array<Product>();
  private productsInCartObservable = new Subject<Array<Product>>();

  constructor(private http: HttpClient) {
    this.productsInCart = new Array<Product>();
  }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.url + 'products/');
  }

  getProductId(id: number): Observable<Product> {
    const httpParams = new HttpParams().set('id', String(id));
    return this.http.get<Product>('http://localhost/getProductById.php', { params: httpParams });
  }

  getProductsInCart(user: string): Observable<Array<Product>> {
    this.http.get<Array<Product>>(this.url + 'cart/' + user).subscribe(data => {
      this.productsInCart = data;
      this.productsInCartObservable.next(this.productsInCart);
    });
    return this.productsInCartObservable;
  }

  addProductToCart(product: Product): Observable<Message> {
    return this.http.post<Message>('http://localhost/REST/cart/add', {
      user: 'anon',
      product_id: String(product.id)
    });
  }

  removeFromCart(product: Product, index: number): Observable<Message> {
    let options;
    return this.http.delete<Message>('http://localhost/REST/cart/delete');
  }


  buyProducts(products: Array<Product>): Observable<Message> {
    return this.http.post<Message>('http://localhost/REST/cart/buy', {
      user: 'anon'
    });
  }

  getPurchaseHistory(user: string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>('http://localhost/REST/history/' + user);
  }

}
