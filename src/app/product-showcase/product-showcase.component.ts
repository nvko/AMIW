import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-showcase',
  templateUrl: './product-showcase.component.html',
  styleUrls: ['./product-showcase.component.css']
})

export class ProductShowcaseComponent implements OnInit {

  products = [
    new Product('Mountain Dew', 2.99),
    new Product('Samsung Smart TV', 1125.99),
    new Product('Braun HC5090 Cordless & Rechargeable Hair Trimmer ', 36.99),
    new Product('Timbuk2 Command Laptop Messenger Bag', 74.50),
    new Product('Samsung G955 Galaxy S8+ Plus 64GB ', 275.99),
    new Product('Lifesmart 4-Element Space Heater', 59.99),
    new Product('Samsonite Tenacity 3 Piece Luggage Set ', 99.99),
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
