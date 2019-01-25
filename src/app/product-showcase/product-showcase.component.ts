import { element } from 'protractor';
import { HttpService } from './../services/http.service';
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

  constructor(private navbarService: NavbarService, private httpService: HttpService) {
    this.getProducts();
  }

  getProducts() {
    this.httpService.getProducts().subscribe(data => {
      this.products = data;
    })
  }

  click(event: Event): void {
    const elementId: string = (event.target as Element).id;
    let id = Number(elementId);
    if (id < this.products.length) {
      this.navbarService.addItemsToCart(this.products[id]);
    }
  }

  ngOnInit() {
  }

}
