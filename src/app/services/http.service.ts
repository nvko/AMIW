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

  constructor(private http: HttpClient) { }

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
    this.productsInCart.push(product);
    this.productsInCartObservable.next(this.productsInCart);
    return this.http.post<Message>('http://localhost/REST/cart/add', {
      user: 'anon',
      product_id: String(product.id),
    });
  }

  removeFromCart(id: number, index: number): Observable<Message> {
    this.productsInCart.slice(index, 1);
    this.productsInCartObservable.next(this.productsInCart);
    const httpParams = new HttpParams().set('id', String(id)).set('name', 'anon');
    return this.http.get<Message>('http://localhost/removeProductFromCart.php', { params: httpParams });
  }


  buyProducts(products: Array<Product>): Observable<Message> {
    this.productsInCart = new Array();
    this.productsInCartObservable.next(this.productsInCart);
    const httpParams = new HttpParams().set('user', 'anon');
    return this.http.get<Message>('http://localhost/buyProducts.php', { params: httpParams });
  }

  getPurchaseHistory(user: string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>('http://localhost/REST/history/' + user);
  }

}
