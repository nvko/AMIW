import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { ProductShowcaseComponent } from './product-showcase/product-showcase.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    PurchaseHistoryComponent,
    ProductShowcaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'products', component: ProductShowcaseComponent},
      { path: 'cart', component: ShoppingCartComponent },
      { path: 'history', component: PurchaseHistoryComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
