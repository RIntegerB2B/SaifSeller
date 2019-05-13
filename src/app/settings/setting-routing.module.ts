import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {BannersComponent} from './banners/banners.component';
import {ViewBannersComponent} from './view-banners/view-banners.component';
import {AdsComponent} from './ads/ads.component';
import {ViewAdsComponent} from './view-ads/view-ads.component';
import {PromotionsComponent} from './promotions/promotions.component';
import {ViewPromotionsComponent} from './view-promotions/view-promotions.component';
import {FooterComponent} from './footer/footer.component';
import {ViewFooterComponent} from './view-footer/view-footer.component';
import {SupportComponent} from './support/support.component';
import {ViewSupportComponent} from './view-support/view-support.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {ViewContactUsComponent} from './view-contact-us/view-contact-us.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {ViewPrivacyPolicyComponent} from './view-privacy-policy/view-privacy-policy.component';
import {FaqComponent} from './faq/faq.component';
import {ViewFaqComponent} from './view-faq/view-faq.component';
import {EditFaqComponent} from './edit-faq/edit-faq.component';
import {TermsAndUseComponent} from './terms-and-use/terms-and-use.component';
import {ViewTermsAndUseComponent} from './view-terms-and-use/view-terms-and-use.component';



const routes: Routes = [{
  path: 'addbanners',
  component: BannersComponent
},
{
  path: 'viewbanners',
  component: ViewBannersComponent
},
{
  path: 'addhotproducts',
  component: AdsComponent
},
{
  path: 'viewhotproducts',
  component: ViewAdsComponent   // Hot products
},
{
  path: 'addpromotions',
  component: PromotionsComponent
},
{
  path: 'viewpromotions',
  component: ViewPromotionsComponent
},
{
  path: 'footer',
  component: FooterComponent
},
{
  path: 'viewfooter',
  component: ViewFooterComponent
},
{
  path: 'support',
  component: SupportComponent
},
{
  path: 'viewsupport',
  component: ViewSupportComponent
},
{
  path: 'contactus',
  component: ContactUsComponent
},
{
  path: 'viewcontactus',
  component: ViewContactUsComponent
},
{
  path: 'privacypolicy',
  component: PrivacyPolicyComponent
},
{
  path: 'viewprivacypolicy',
  component: ViewPrivacyPolicyComponent
},
{
  path: 'faq',
  component: FaqComponent
},
{
  path: 'viewfaq',
  component: ViewFaqComponent
},
{
  path: 'editfaq/:id',
  component: EditFaqComponent
},
{
  path: 'termsanduse',
  component: TermsAndUseComponent
},
{
  path: 'viewtermsanduse',
  component: ViewTermsAndUseComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
