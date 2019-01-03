import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges, Input } from '@angular/core';


import { NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);


@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit, OnChanges {


  public startMinDate = new Date(2017, 1, 1);
  public endMaxDate = new Date(2019, 3, 1);

  public userStartDate=this.startMinDate;
  public userEndDate=this.endMaxDate;
  @Input() orderData;

  //Chart 
  private chart: am4charts.XYChart;

  constructor(private zone: NgZone) { }

  ngOnInit() {
  }

  ngOnChanges(change: SimpleChanges) {
    if (change.orderData.currentValue.length > 0) {
      this.drawChart()
    }
  }

  /**
  * Draw chart acc. to data
  * @param  data 
  */
  drawChart() {

    this.zone.runOutsideAngular(() => {
      // Create chart instance
      var chart = am4core.create("chartdiv", am4charts.XYChart);

      chart.marginRight = 400;
      let sliceOrderData = this.getTimeRangeData();


      // Add data
      chart.data = [{
        "order": "Cancelled",
        "count": sliceOrderData.cancelled
      }, {
        "order": "Delievered",
        "count": sliceOrderData.delievered
      }, {
        "order": "Not Delivered",
        "count": sliceOrderData.notdelievered
      }];

      //console.log('chart', chart);

      // Create axes
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "order";
      categoryAxis.title.text = "Orders";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;


      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Order Count";

      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "count";
      series.dataFields.categoryX = "order";
      series.name = "count";
      series.tooltipText = "{name}: [bold]{valueY}[/]";
  
      // Add cursor
      chart.cursor = new am4charts.XYCursor();
    });
  }


  getTimeRangeData() {
   
    let ordersDelievered = 0, ordersCancelled = 0, ordersNotDelievered = 0;
    for (let i = 0; i < this.orderData.length; i++) {
      if ((new Date(this.orderData[i].orderDate).getTime() - this.userStartDate.getTime() > 0) && (new Date(this.orderData[i].orderDate).getTime() - this.userEndDate.getTime() < 0)) {
        ordersDelievered += this.orderData[i].orderDelievered;
        ordersCancelled += this.orderData[i].orderCancelled;
        ordersNotDelievered += this.orderData[i].orderNotDelievered;
      }
    }

    return {
      cancelled: ordersCancelled,
      delievered: ordersDelievered,
      notdelievered: ordersNotDelievered
    }
  }

  dateChanged(event,val){
    if(val==1){
      this.userStartDate=event.value;
    }
    else if(val==2){
      this.userEndDate=event.value;
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }


}
