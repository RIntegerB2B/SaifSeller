import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {Booking} from './view-bookings/booking.model';
import {Product} from '../product/add-product/product.model';
import {BulkRegModel} from './view-bulk-registration/bulk.model';
@Injectable({
  providedIn: 'root'
})
export class BookingManagementService {
  serviceUrl: string = AppSetting.serviceUrl;

  constructor(private httpClient: HttpClient) { }

getAllBookings(): Observable<any> {
    const categoryUrl = 'allbookings';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Booking>(url);
  }

  getSingleBookingDetails( id): Observable<any> {
    const categoryUrl = 'bookings/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.httpClient.get<Booking>(url);
  }

  // products

  getProducts(): Observable<any> {
    const categoryUrl = 'product';
    const url: string = this.serviceUrl + categoryUrl ;
    return this.httpClient.get<Product>(url);
  }

  // update Status

  updateStatus(id, order: Booking): Observable<any> {
    const categoryUrl = 'statusupdate/' + id;
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.put<Product>(url, order);
  }

   // bulk registration

   getBulkRegistration(): Observable<any> {
    const categoryUrl = 'bulkregistration';
    const url: string = this.serviceUrl + categoryUrl ;
    return this.httpClient.get<BulkRegModel>(url);
  }
}
