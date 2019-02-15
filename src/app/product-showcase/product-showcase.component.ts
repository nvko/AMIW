import { HttpService } from './../services/http.service';
import { Component, OnInit, Input, Inject, Output } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-showcase',
  templateUrl: './product-showcase.component.html',
  styleUrls: ['./product-showcase.component.css'],
})

export class ProductShowcaseComponent implements OnInit {

  products = new Array<Product>();

  constructor(private httpService: HttpService) {
  }

  addProductToCart(event: Event): void {
    const elementId: string = (event.target as Element).id;
    const index = Number(elementId);
    this.httpService.addProductToCart(this.products[index]).subscribe(data => {
      this.httpService.getProductsInCart('anon');
    });
  }

  ngOnInit() {
    this.httpService.getProducts().subscribe(items => {
      this.products = items;
    });
  }

}
