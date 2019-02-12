import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Router } from '@angular/router';
import { ProductShowcaseComponent } from '../product-showcase/product-showcase.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  itemsInCart: number;
  itemsInCartPrice: number = 0;
  products = new Array<Product>();
  badge = 'badge badge-secondary';
  message: Message;

  constructor(private httpService: HttpService, private router: Router) {
  }

  removeFromCart(event: Event, index: number) {
    this.itemsInCartPrice -= -this.products[index].price;
    this.httpService.removeFromCart(this.products[index].id, index).subscribe(data => {
      this.httpService.getProductsInCart('anon');
    })
  }

  buyProducts(event: Event) {
    this.httpService.buyProducts(this.products).subscribe();
    this.products = new Array();
  }

  ngOnInit() {
    this.httpService.getProductsInCart('anon').subscribe(items => {
      this.itemsInCart = 0;
      this.products = items;
      for (let i = 0; i < this.products.length; i++) {
        let quantity: number = + this.products[i].quantity;
        this.itemsInCart += quantity;
      }
      if (this.itemsInCart > 0) {
        this.badge = 'badge badge-success';
      } else {
        this.badge = 'badge badge-secondary';
      }
      this.itemsInCartPrice = 0;
      for (let i = 0; i < items.length; i++) {
        for (let q = 0; q < items[i].quantity; q++) {
          this.itemsInCartPrice += +items[i].price;
        }
      }
    });

  }

}
