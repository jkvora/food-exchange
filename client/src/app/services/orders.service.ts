import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  API_URL = "http://localhost:3000/"

  constructor(private http: HttpClient) { }

  /**
   * Get all  orders
   */
  getallOrders() {
    return this.http.get(this.API_URL + "allorders");
  }
}
