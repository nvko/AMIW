import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  isEmpty = true;

  constructor(private navbarService: NavbarService) { }

  ngOnInit() {
    this.navbarService.getItemsInCart().subscribe(items => {
      let itemsInCart = new Array<Product>();
      itemsInCart = items;
      if (itemsInCart.length > 0) {
        this.isEmpty = false;
      }
    });
  }

}
