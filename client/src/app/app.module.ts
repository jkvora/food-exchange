import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SocketService } from './services/socket.service';
import { OrdersService } from './services/orders.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [SocketService,OrdersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
