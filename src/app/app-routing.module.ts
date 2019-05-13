import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavSidebarComponent } from './shared/nav-sidebar/nav-sidebar.component';
<<<<<<< HEAD
=======

>>>>>>> f59a8fa992c45e6d70c0330af432e65d21e4dbeb
const routes: Routes = [
  {
    path: '',
    component: NavSidebarComponent,
    children: [{
      path: 'account',
      loadChildren: './account/account.module#AccountModule'
    },
    {
      path: 'category',
      loadChildren: './category/category.module#CategoryModule'
    },
    {
      path: 'product',
      loadChildren: './product/product.module#ProductModule'
    },
    {
      path: 'moq',
      loadChildren: './moq/moq.module#MoqModule'
    },
    {
      path: 'settings',
      loadChildren: './settings/settings.module#SettingsModule'
<<<<<<< HEAD
    },
    {
      path: 'customers',
      loadChildren: './customer-management/customer-management.module#CustomerManagementModule'
    },
    {
      path: 'bookings',
      loadChildren: './booking-management/booking-management.module#BookingManagementModule'
=======
>>>>>>> f59a8fa992c45e6d70c0330af432e65d21e4dbeb
    }
    /* {
      path: 'shared',
      loadChildren: './shared/shared.module#SharedModule'
    } */]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

