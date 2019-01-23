import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private itemsInCart = new Array<Product>();
  private itemsInCartObservable = new Subject<Array<Product>>();
  // make it already in array ^

  constructor() { }

  addItemsToCart(product: Product) {
    this.itemsInCart.push(product);
    this.itemsInCartObservable.next(this.itemsInCart);
    console.log('[NavbarService] itemsInCart:' + this.itemsInCart.length);
  }

  getItemsInCart(): Observable<Array<Product>> {
    return this.itemsInCartObservable.asObservable();
  }
}
