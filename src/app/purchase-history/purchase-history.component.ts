import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Purchase } from '../models/purchase';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

  purchases = new Array<Purchase>();

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getPurchaseHistory().subscribe(data => {
      this.purchases = data;
    });
  }

}
