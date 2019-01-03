import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { SOCKET_EVENT } from '../models/common.model';
import { Subject } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';
import { takeUntil } from 'rxjs/operators';


import {  NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);


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


    //Chart 
    private chart: am4charts.XYChart;

  constructor(
    private socketService: SocketService,
    private orderService:OrdersService,
    private zone: NgZone) { }

  ngOnInit(): void {
    this.initIoConnection();
    this.getallOrders();
  }

  private getallOrders() {
    this.orderService.getallOrders().pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      console.log(res);
      this.drawChart(res);
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


  /**
   * Draw chart acc. to data
   * @param  data 
   */
  drawChart(orderdata) {

    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);


      chart.paddingRight = 20;

      let data = [];
      let visits = 10;
      for (let i = 1; i < orderdata.length; i++) {
        visits = orderdata[i].orderCancelled;
        data.push({ date: orderdata[i].orderDate, name: "name" + i, value: visits });
      }

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";

      series.tooltipText = "{valueY.value}";
      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
    });
  }



  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
