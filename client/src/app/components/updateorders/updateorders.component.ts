import { Component, OnInit } from '@angular/core';
import { UPDATE_TYPE, updateObj } from 'src/app/models/common.model';
import { OrdersService } from 'src/app/services/orders.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-updateorders',
  templateUrl: './updateorders.component.html',
  styleUrls: ['./updateorders.component.css']
})
export class UpdateordersComponent implements OnInit {

  updateType = UPDATE_TYPE;

  orderCancelled: number = 0;
  orderDelievered: number = 0;
  orderNotDelievered: number = 0;
  existingCustomer: number = 0;
  newCustomer: number = 0;


  //UnSubscription  Object
  private unsubscribe = new Subject<void>();

  constructor(private orderService: OrdersService) { }

  ngOnInit() {
  }

  updateStatus(update: UPDATE_TYPE) {
    let obj: updateObj=new updateObj();
    obj.dateTime = (new Date()).toISOString();
    obj.updateType = update;
    obj.value = this.getValueFromUpdateType(update);
    this.orderService.updateMetrics(obj).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      console.log(res);
    });
  }

  getValueFromUpdateType(update: UPDATE_TYPE) {
    switch (update) {
      case UPDATE_TYPE.ORDER_NOT_DELIEVERED: {
        return this.orderNotDelievered;
      }
      case UPDATE_TYPE.ORDER_DELIEVERD: {
        return this.orderDelievered;
      }

      case UPDATE_TYPE.ORDER_CANCELLED: {
        return this.orderCancelled;
      }
      case UPDATE_TYPE.EXISTING_CUSTOMERS: {
        return this.existingCustomer;
      }
      case UPDATE_TYPE.NEW_CUSTOMERS: {
        return this.newCustomer;
      }

    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
