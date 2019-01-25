import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private itemsInCart = new Array<Product>();
  private itemsInCartObservable = new Subject<Array<Product>>();

  constructor() { }

  addItemsToCart(product: Product) {
    this.itemsInCart.push(product);
    this.itemsInCartObservable.next(this.itemsInCart);
  }

  getItemsInCart(): Observable<Array<Product>> {
    return this.itemsInCartObservable.asObservable();
  }

  removeItemFromCart(id: number) {
    this.itemsInCart.splice(id, 1);
    this.itemsInCartObservable.next(this.itemsInCart);
  }
}
