import { NavbarService } from './../services/navbar.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  itemsInCart = 0;
  itemsInCartPrice: number = 0;
  products = new Array<Product>();
  badge = 'badge badge-secondary';

  constructor(private navbarService: NavbarService) {
  }

  removeFromCart(event: Event, id: number) {
    this.itemsInCartPrice -= -this.products[id].price;
    this.navbarService.removeItemFromCart(id);
  }

  ngOnInit() {
    this.navbarService.getItemsInCart().subscribe(items => {
      this.itemsInCart = items.length;
      this.products = items;
      if (this.itemsInCart > 0) {
        this.badge = 'badge badge-success';
      } else {
        this.badge = 'badge badge-secondary';
      }
      this.itemsInCartPrice = 0;
      for (let i = 0; i < this.products.length; i++) {
        this.itemsInCartPrice += +this.products[i].price;
      }
    });
  }

}
