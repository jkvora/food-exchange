import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SocketService } from './services/socket.service';
import { OrdersService } from './services/orders.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/components/header/header.component';

import { MatToolbarModule,MatNativeDateModule,MatDatepickerModule, MatInputModule, MatButtonModule} from '@angular/material';
import { BarchartComponent } from './components/barchart/barchart.component';
import { FormsModule } from '@angular/forms';
import { AppRouting } from './app-routing.module';
import { UpdateordersComponent } from './components/updateorders/updateorders.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    HeaderComponent,
    BarchartComponent,
    UpdateordersComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,

    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [SocketService,OrdersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
