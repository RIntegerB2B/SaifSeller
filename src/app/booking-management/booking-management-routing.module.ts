import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {ViewBookingsComponent} from './view-bookings/view-bookings.component';
import {ViewSingleBookingsComponent} from './view-single-bookings/view-single-bookings.component';
import {ViewBulkRegistrationComponent} from './view-bulk-registration/view-bulk-registration.component';

const routes: Routes = [{
  path: 'viewbookings',
  component: ViewBookingsComponent
},
{
  path: 'singlebookings/:id',
  component: ViewSingleBookingsComponent
},
{
  path: 'viewbulkregistration',
  component: ViewBulkRegistrationComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingManagementRoutingModule { }
