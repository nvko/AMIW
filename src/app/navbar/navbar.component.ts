import { NavbarService } from './../services/navbar.service';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  itemsInCart = 0;

  constructor(private navbarService: NavbarService) {
  }

  ngOnInit() {
    this.navbarService.getItemsInCart().subscribe(items => {
      this.itemsInCart = items.length;
    });

  }

}
