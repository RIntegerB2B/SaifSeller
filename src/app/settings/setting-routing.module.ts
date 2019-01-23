import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {BannersComponent} from './banners/banners.component';
import {ViewBannersComponent} from './view-banners/view-banners.component';

const routes: Routes = [{
  path: 'addbanners',
  component: BannersComponent
},
{
  path: 'viewbanners',
  component: ViewBannersComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
