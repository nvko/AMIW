import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

  products = new Array<Product>();
  transactions = new Array<Array<Product>>();
  productsFiltered = new Array<Product>();

  constructor(private httpService: HttpService) { }

  getFilterToken(token: string) {
    this.productsFiltered = this.products.filter(x => x.transaction_token = token);
    console.log(this.productsFiltered.length);
  }

  ngOnInit() {
    this.httpService.getPurchaseHistory('anon').subscribe(data => {
      let token = data[0].transaction_token;
      for (let i = 0; i < data.length; i++) {
        if (data[i].transaction_token === token) {
          this.products.push(data[i]);
        } else {
          this.transactions.push(this.products);
          this.products = new Array();
          this.products.push(data[i]);
          token = data[i].transaction_token;
        }

        if (i === data.length - 1) {
          this.transactions.push(this.products);
        }
      }
    });
  }

  getOverallProductPrice(price: number, quantity: number) {
    return price * quantity;
  }

  getOverallPrice(index: number) {
    let price = 0
    for (let i = 0; i < this.transactions[index].length; i++) {
      price += +this.transactions[index][i].price * this.transactions[index][i].quantity;
    }
    return price.toFixed(2);
  }

  getOveralQuantity(index: number) {
    let quantity = 0;
    for (let i = 0; i < this.transactions[index].length; i++) {
      quantity += +this.transactions[index][i].quantity;
    }
    return quantity;
  }

}
