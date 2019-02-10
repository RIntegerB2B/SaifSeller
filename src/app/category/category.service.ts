import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {SuperCategory} from './super-category/superCategory.model';
import {MainCategory} from './main-category/mainCategory.model';
import {SubCategory} from './sub-category/sub-category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  serviceUrl: string = AppSetting.serviceUrl;

  constructor(private httpClient: HttpClient) { }

getSuperCategory(): Observable<any> {
    const categoryUrl = 'categoryDetails';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<SuperCategory>(url);
  }

  addSuperCategory(data: SuperCategory): Observable<any> {
    const categoryUrl = 'addCategory';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.post<SuperCategory>(url, data);
  }

  deleteSuperCategory(data): Observable<any> {
    const deleteUrl = 'categoryDelete/';
    const url: string = this.serviceUrl + deleteUrl + data._id;
    return this.httpClient.delete<SuperCategory>(url);
  }
  addMainCategory(data: MainCategory): Observable<any> {
    const categoryUrl = 'mainCategory';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.post<MainCategory>(url, data);
  }
  getMainCategory(id): Observable<any> {
    const categoryUrl = 'superCategorydetail/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.httpClient.get<MainCategory>(url);
  }
  deleteMainCategory(id, data): Observable<any> {
    const deleteUrl = 'category/';
    const deleteUrl1 = '/mainCategory/';
    const url: string = this.serviceUrl + deleteUrl + id + deleteUrl1 + data._id;
    return this.httpClient.delete<MainCategory>(url);
  }

  // sub category

  addSubCategory(data: SubCategory, superId, mainid): Observable<any> {
    const Caturl = 'subCategory/';
    const CatUrl1 = '/add/';
    const url: string = this.serviceUrl + Caturl + superId + CatUrl1 + mainid ;
    return this.httpClient.put<SubCategory>(url, data);
  }
  getSubCategory(superId, mainId): Observable<any> {
    const categoryUrl = 'category/';
   const categoryUrl1 = '/mainCategory/';
    const url: string = this.serviceUrl + categoryUrl + superId + categoryUrl1 + mainId;
    return this.httpClient.get<SubCategory>(url);
  }

 /*  /category/:categoryId/mainCategory/:mainCategoryId/subCategory/:subCategoryId */
  deleteSubCategory(superId, mainId, element): Observable<any> {
    const deleteUrl = 'category/';
    const deleteUrl1 = '/mainCategory/';
    const deleteUrl2 = '/subCategory/';
    const url: string = this.serviceUrl + deleteUrl + superId + deleteUrl1 + mainId + deleteUrl2 + element._id;
    return this.httpClient.delete<SubCategory>(url);
  }
}
