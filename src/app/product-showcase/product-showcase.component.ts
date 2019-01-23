import { Component, OnInit, Input, Inject, Output } from '@angular/core';
import { Product } from '../models/product';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-product-showcase',
  templateUrl: './product-showcase.component.html',
  styleUrls: ['./product-showcase.component.css'],
})

export class ProductShowcaseComponent implements OnInit {

  products = new Array<Product>();

  constructor(private navbarService: NavbarService) {
    this.products.push(
      new Product(1, 'Mountain Dew', 2.99,
      'http://www.mountaindew.com/assets/meta/facebook.jpg'),
      new Product(2, 'Samsung Smart TV', 1125.99,
      'https://img.global.news.samsung.com/global/wp-content/uploads/2017/08/Smart-TV-Shazam_main-1_f.jpg'),
      new Product(3, 'Braun HC5090 Hair Trimmer ', 36.99,
      'https://img.grouponcdn.com/deal/xsVZskM2m76SZWmEoHG62hrzoVv/xs-1468x882/v1/c700x420.jpg'),
      new Product(4, 'Timbuk2 Laptop Bag', 74.50,
      'https://images-na.ssl-images-amazon.com/images/I/A1Us0MgqJ2L._SX425_.jpg'),
      new Product(5, 'Samsung G955 Galaxy S8+', 275.99,
      'https://www.dtechy.com/wp-content/uploads/2017/04/Samsung-Galaxy-S8-plus-SM-G955A-SM-G955FD-SM-G955U.jpg'),
      new Product(6, 'Lifesmart 4-Element Space Heater', 59.99,
      'https://images-na.ssl-images-amazon.com/images/I/71hxs1aNX0L._SY355_.jpg'),
      new Product(7, 'Samsonite Tenacity 3 Piece Luggage Set ', 99.99,
      'https://www.freestufffinder.com/wp-content/uploads/2018/03/Samsonite-Tenacity-3-Piece-Set.jpg')
    );
  }

  click(event: Event): void {
    const elementId: string = (event.target as Element).id;
    this.navbarService.addItemsToCart(this.getProductById(Number(elementId)));
  }

  getProductById(id: number) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        return this.products[i];
      }
    }
  }

  ngOnInit() {
  }

}
