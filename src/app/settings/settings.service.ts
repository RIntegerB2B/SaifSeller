import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {Banner} from './banners/banner.model';
import {BannerImageData} from './banners/bannerImageData.model';
import {Ads} from './ads/ads.model';
import {Promotion} from './promotions/promotion.model';
import {Footer} from './footer/footer.model';
import {Product} from '../product/add-product/product.model';
import {Support} from './support/support.model';
import {ContactUs} from './contact-us/contact-us.model';
import {PrivacyPolicy} from './privacy-policy/privacy-policy.model';
import {FAQ} from './faq/faq.model';
import {TermsUse} from './terms-and-use/termsuse.model';

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

  // promotions
  addPromotion(data): Observable<any> {
    const footerUrl = 'promotions';
    const url: string = this.serviceUrl + footerUrl ;
    return this.httpClient.post<Promotion>(url, data);
  }

  getPromotions(): Observable<any> {
    const categoryUrl = 'promotions';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Promotion>(url);
  }
  deletePromotions(data): Observable<any> {
    const deleteUrl = 'deletepromotions/';
    const url: string = this.serviceUrl + deleteUrl + data._id ;
    return this.httpClient.delete<Promotion>(url);
  }

  // footer

  addFooterdetails(data: Footer): Observable<any> {
    const footerUrl = 'footer/';
    const url: string = this.serviceUrl + footerUrl ;
    return this.httpClient.post<Footer>(url, data);
  }
  uploadLogo(data , id): Observable<any> {
    const addUrl = 'createLogoImage/';
    const url: string = this.serviceUrl + addUrl + id ;
    return this.httpClient.put<boolean>(url, data);
  }

  getFooterDetails(): Observable<any> {
    const categoryUrl = 'footerDetails';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Ads>(url);
  }
  updateFooterDetails(data , id): Observable<any> {
    const addUrl = 'details/';
    const url: string = this.serviceUrl + addUrl + id ;
    return this.httpClient.put<Footer>(url, data);
  }
  // getProducts

  getProducts(): Observable<any> {
    const categoryUrl = 'product';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Product>(url);
  }

  // support

  addSupport(data): Observable<any> {
    const footerUrl = 'support';
    const url: string = this.serviceUrl + footerUrl ;
    return this.httpClient.post<Support>(url, data);
  }

  getSupportDetails(): Observable<any> {
    const categoryUrl = 'supportDetails';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Support>(url);
  }

  updateSupportDetails(data , id): Observable<any> {
    const addUrl = 'supportdetails/';
    const url: string = this.serviceUrl + addUrl + id ;
    return this.httpClient.put<Support>(url, data);
  }

  // contact us

  addContact(data): Observable<any> {
    const footerUrl = 'contactus';
    const url: string = this.serviceUrl + footerUrl ;
    return this.httpClient.post<ContactUs>(url, data);
  }

  getContactDetails(): Observable<any> {
    const categoryUrl = 'contactDetails';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<ContactUs>(url);
  }
  updateContactDetails(data , id): Observable<any> {
    const addUrl = 'contactdetails/';
    const url: string = this.serviceUrl + addUrl + id ;
    return this.httpClient.put<Support>(url, data);
  }

  // policy
  addPrivacyPolicy(data): Observable<any> {
    const footerUrl = 'privacypolicy';
    const url: string = this.serviceUrl + footerUrl ;
    return this.httpClient.post<PrivacyPolicy>(url, data);
  }

  getPolicyDetails(): Observable<any> {
    const categoryUrl = 'privacypolicy';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<PrivacyPolicy>(url);
  }
  updatePrivacyPolicy(data , id): Observable<any> {
    const addUrl = 'editprivacypolicy/';
    const url: string = this.serviceUrl + addUrl + id ;
    return this.httpClient.put<Support>(url, data);
  }
  // faq
  addFAQ(data): Observable<any> {
    const footerUrl = 'faq';
    const url: string = this.serviceUrl + footerUrl ;
    return this.httpClient.post<FAQ>(url, data);
  }
  getFAQ(): Observable<any> {
    const categoryUrl = 'faq';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<FAQ>(url);
  }
  getSingleFAQ(id): Observable<any> {
    const categoryUrl = 'singlefaq/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.httpClient.get<FAQ>(url);
  }
  updateFAQ(data , id): Observable<any> {
    const addUrl = 'editFAQ/';
    const url: string = this.serviceUrl + addUrl + id ;
    return this.httpClient.put<Support>(url, data);
  }
 deleteSingleFAQ(data): Observable<any> {
  const deleteUrl = 'faq/';
  const url: string = this.serviceUrl + deleteUrl + data._id;
  return this.httpClient.delete<FAQ>(url);
}


// terms

addTerms(data): Observable<any> {
  const footerUrl = 'termsanduse';
  const url: string = this.serviceUrl + footerUrl ;
  return this.httpClient.post<TermsUse>(url, data);
}

getTerms(): Observable<any> {
  const categoryUrl = 'termsanduse/';
  const url: string = this.serviceUrl + categoryUrl;
  return this.httpClient.get<TermsUse>(url);
}
updateTerm(data , id): Observable<any> {
  const addUrl = 'editTerms/';
  const url: string = this.serviceUrl + addUrl + id ;
  return this.httpClient.put<Support>(url, data);
}
deleteSingleTerm(data): Observable<any> {
const deleteUrl = 'terms/';
const url: string = this.serviceUrl + deleteUrl + data;
return this.httpClient.delete<FAQ>(url);
}
}
