import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  itemsInCart = 0;
  itemsInCartPrice = 0;

  products = new Array<Product>();
  badge = 'badge badge-secondary';
  message: Message;

  ngOnInit() {
    this.getCart();
  }

  constructor(private httpService: HttpService) {
  }

  removeFromCart(event: Event, index: number) {
    this.itemsInCartPrice -= -this.products[index].price;
    this.httpService.removeFromCart(this.products[index], index).subscribe(data => {
      this.httpService.getProductsInCart('anon');
    })
  }

  buyProducts(event: Event) {
    this.httpService.buyProducts(this.products).subscribe(data => {
      this.httpService.getProductsInCart('anon');
      this.products = new Array();
    });
  }

  getCart() {
    this.httpService.getProductsInCart('anon').subscribe(items => {
      this.itemsInCart = 0;
      this.products = items;
      if (this.products != null) {
        for (let i = 0; i < this.products.length; i++) {
          const quantity: number = + this.products[i].quantity;
          this.itemsInCart += quantity;
        }
      }

      if (this.itemsInCart > 0) {
        this.badge = 'badge badge-success';
      } else {
        this.badge = 'badge badge-secondary';
      }

      this.itemsInCartPrice = 0;
      if (items != null) {
        for (let i = 0; i < items.length; i++) {
          for (let q = 0; q < items[i].quantity; q++) {
            this.itemsInCartPrice += +items[i].price;
          }
        }
      }
    });
  }

}
