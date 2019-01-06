import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { updateObj } from '../models/common.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {



  constructor(private http: HttpClient) { }

  /**
   * Get all  orders
   */
  getAllMetrics() {
    return this.http.get(environment.API_URL + "/allmetrics");
  }



  updateMetrics(updateObj:updateObj){
    return this.http.post(environment.API_URL + "/updatemetrics",updateObj);
  }
}
