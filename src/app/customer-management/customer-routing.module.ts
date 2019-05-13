import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {ViewCustomersComponent} from './view-customers/view-customers.component';

const routes: Routes = [{
  path: 'viewcustomers',
  component: ViewCustomersComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
