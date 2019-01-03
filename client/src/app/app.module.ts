import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SocketService } from './services/socket.service';
import { OrdersService } from './services/orders.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/components/header/header.component';

import { MatToolbarModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [SocketService,OrdersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
