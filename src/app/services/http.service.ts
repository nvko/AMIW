import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Injectable({
  providedIn: 'root'
})

export class HttpService {

  private productsInCart = new Array<Product>();
  private productsInCartObservable = new Subject<Array<Product>>();

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>('http://localhost/getProducts.php');
  }

  getProductId(id: number): Observable<Product> {
    const httpParams = new HttpParams().set('id', String(id));
    return this.http.get<Product>('http://localhost/getProductById.php', { params: httpParams });
  }

  getProductsInCart(user: string): Observable<Array<Product>> {
    const httpParams = new HttpParams().set('user', user);
    this.http.get<Array<Product>>('http://localhost/getProductsInCart.php', { params: httpParams }).subscribe(data => {
      this.productsInCart = data;
      this.productsInCartObservable.next(this.productsInCart);
    });
    return this.productsInCartObservable;
  }

  addProductToCart(product: Product): Observable<Message> {
    this.productsInCart.push(product);
    this.productsInCartObservable.next(this.productsInCart);
    const httpParams = new HttpParams().set('id', String(product.id));
    return this.http.get<Message>('http://localhost/addProductToCart.php', { params: httpParams });
  }

  removeFromCart(id: number, index: number): Observable<Message> {
    this.productsInCart.slice(index, 1);
    this.productsInCartObservable.next(this.productsInCart);
    const httpParams = new HttpParams().set('id', String(id));
    return this.http.get<Message>('http://localhost/removeProductFromCart.php', { params: httpParams });
  }


}
