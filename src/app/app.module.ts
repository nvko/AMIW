import { HttpService } from './services/http.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { ProductShowcaseComponent } from './product-showcase/product-showcase.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PurchaseHistoryComponent,
    ProductShowcaseComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'products', component: ProductShowcaseComponent },
      { path: 'history', component: PurchaseHistoryComponent },
      { path: '', redirectTo: '/products', pathMatch: 'full' }
    ]),
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
