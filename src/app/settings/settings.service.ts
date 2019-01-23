import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {Banner} from './banners/banner.model';
import {BannerImageData} from './banners/bannerImageData.model';
import {Ads} from './ads/ads.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  serviceUrl: string = AppSetting.serviceUrl;

  constructor(private httpClient: HttpClient) { }

  uploadBanners(data , position): Observable<any> {
    const addUrl = 'banners/';
    const url: string = this.serviceUrl + addUrl + position ;
    return this.httpClient.put<boolean>(url, data);
  }

  getBanners(): Observable<any> {
    const categoryUrl = 'banners';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Banner>(url);
  }
  deleteBanner(data): Observable<any> {
    const deleteUrl = 'deletebanners/';
    const url: string = this.serviceUrl + deleteUrl + data._id ;
    return this.httpClient.delete<Banner>(url);
  }

  // ads
  getAds(): Observable<any> {
    const categoryUrl = 'ads';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Ads>(url);
  }
  uploadAds(data , position): Observable<any> {
    const addUrl = 'ads/';
    const url: string = this.serviceUrl + addUrl + position ;
    return this.httpClient.put<boolean>(url, data);
  }
  deleteAds(data): Observable<any> {
    const deleteUrl = 'deleteads/';
    const url: string = this.serviceUrl + deleteUrl + data._id ;
    return this.httpClient.delete<Ads>(url);
  }
}
