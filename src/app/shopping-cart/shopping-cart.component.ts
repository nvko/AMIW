import { HttpService } from './../services/http.service';
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

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getProductsInCart('anon').subscribe(items => {
      let productsInCart = new Array<Product>();
      productsInCart = items;
      if (productsInCart.length > 0) {
        this.isEmpty = false;
      }
    });
  }

}
