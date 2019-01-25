import { HttpService } from './../services/http.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Product } from '../models/product';

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

  constructor(private httpService: HttpService) {
  }

  removeFromCart(event: Event, index: number) {
    this.itemsInCartPrice -= -this.products[index].price;
    this.httpService.removeFromCart(this.products[index].id, index).subscribe(data => {
      this.httpService.getProductsInCart('anon');
    })
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
