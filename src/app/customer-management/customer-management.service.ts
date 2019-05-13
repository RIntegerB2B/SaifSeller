import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import {RegModel} from './view-customers/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerManagementService {
  serviceUrl: string = AppSetting.serviceUrl;

  constructor(private httpClient: HttpClient) {
   }

   // orders

   getAllCustomers(): Observable<any> {
    const categoryUrl = 'customers';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<RegModel>(url);
  }
}
