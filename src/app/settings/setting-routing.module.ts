import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {BannersComponent} from './banners/banners.component';
import {ViewBannersComponent} from './view-banners/view-banners.component';
import {AdsComponent} from './ads/ads.component';
import {ViewAdsComponent} from './view-ads/view-ads.component';
import {PromotionsComponent} from './promotions/promotions.component';
import {ViewPromotionsComponent} from './view-promotions/view-promotions.component';

const routes: Routes = [{
  path: 'addbanners',
  component: BannersComponent
},
{
  path: 'viewbanners',
  component: ViewBannersComponent
},
{
  path: 'addads',
  component: AdsComponent
},
{
  path: 'viewads',
  component: ViewAdsComponent
},
{
  path: 'addpromotions',
  component: PromotionsComponent
},
{
  path: 'viewpromotions',
  component: ViewPromotionsComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
