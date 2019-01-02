import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { SOCKET_EVENT } from '../models/common.model';
import { Subject } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  ioConnection: any;
  messages = [];

  //UnSubscription  Object
  private unsubscribe = new Subject<void>();

  constructor(
    private socketService: SocketService
    ,private orderService:OrdersService) { }

  ngOnInit(): void {
    this.initIoConnection();
    this.getallOrders();
  }

  private getallOrders() {
    this.orderService.getallOrders().pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      console.log(res);
      
    });
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message) => {
        console.log(message);
        this.messages.push(message);
      });


    this.socketService.onEvent(SOCKET_EVENT.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });

    this.socketService.onEvent(SOCKET_EVENT.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  public sendMessage(message: string): void {
    this.socketService.send("Hi");
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribe.next();
    this.unsubscribe.complete();
    // this.zone.runOutsideAngular(() => {
    //   if (this.chart) {
    //     this.chart.dispose();
    //   }
    // });
  }

}
