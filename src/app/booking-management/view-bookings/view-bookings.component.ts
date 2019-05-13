import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource , MatSort} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import {Booking} from './booking.model';
import {BookingManagementService} from '../booking-management.service';

export interface PeriodicElement {
  bookingId: string;
  bookingDate: string;
  status: string;
}

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit {
  serviceUrl;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['order', 'view', 'date', 'status', 'total'];
  bookingModel: any;
  bookingDetails: Booking[];
  allOrderCount;
  newOrderCount;
  activeOrderCount;
  completedOrderCount;
  cancelledOrderCount;
  constructor(private fb: FormBuilder, private router: Router, private bookingService: BookingManagementService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getBookings();
  }
  getBookings() {
    this.bookingService.getAllBookings().subscribe(data => {
      this.bookingDetails = data;
      this.allOrderCount = data.length;
      this.bookingModel = data;
      this.bookingModel = new MatTableDataSource<Booking>(data);
      this.bookingModel.sort = this.sort;
      this.bookingModel.paginator = this.paginator;
      this.newOrderCount = this.bookingDetails.filter(book => book.bookingStatus === 'New').length;
      this.activeOrderCount = this.bookingDetails.filter(book => book.bookingStatus === 'Processing').length;
      this.completedOrderCount = this.bookingDetails.filter(book => book.bookingStatus === 'Completed').length;
      this.cancelledOrderCount = this.bookingDetails.filter(book => book.bookingStatus === 'Cancelled').length;
    }, err => {
      console.log(err);
    });
}
viewNewOrders() {
  this.bookingModel =  this.bookingDetails.filter(book => book.bookingStatus === 'New');
}

viewActiveOrders() {
  this.bookingModel =  this.bookingDetails.filter(book => book.bookingStatus === 'Processing');
}
viewCompletedOrders() {
  this.bookingModel =  this.bookingDetails.filter(book => book.bookingStatus === 'Completed');
}
viewCancelledOrders() {
  this.bookingModel =  this.bookingDetails.filter(book => book.bookingStatus === 'Cancelled');
}
applyFilter(filterValue: string) {
  this.bookingModel.filter = filterValue.trim().toLowerCase();
}
showBookingDetails(booking) {
  this.router.navigate(['bookings/singlebookings', booking._id ]);
  }
}
