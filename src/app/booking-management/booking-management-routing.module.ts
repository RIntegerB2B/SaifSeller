import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {ViewBookingsComponent} from './view-bookings/view-bookings.component';
import {ViewSingleBookingsComponent} from './view-single-bookings/view-single-bookings.component';

const routes: Routes = [{
  path: 'viewbookings',
  component: ViewBookingsComponent
},{
  path: 'singlebookings/:id',
  component: ViewSingleBookingsComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingManagementRoutingModule { }
