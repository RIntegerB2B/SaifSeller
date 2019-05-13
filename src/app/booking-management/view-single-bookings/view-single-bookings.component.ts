import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Booking } from '../view-bookings/booking.model';
import { BookingManagementService } from '../booking-management.service';

@Component({
  selector: 'app-view-single-bookings',
  templateUrl: './view-single-bookings.component.html',
  styleUrls: ['./view-single-bookings.component.css']
})
export class ViewSingleBookingsComponent implements OnInit {
  id;
  bookingModel: Booking;
  bookingForm: FormGroup;
  productModel: any;
  message;
  action;
  serviceUrl;
  status = ['New', 'Processing', 'OnHold', 'Completed', 'Cancelled', 'Failed'];
  constructor(private router: Router, private bookingService: BookingManagementService, private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.createForm();
    this.viewBookingDetails();
    this.getProducts();
  }
  createForm() {
    this.bookingForm = this.fb.group({
      orderedDate: [''],
      statusType: ['']
    });
  }
  viewBookingDetails() {
    this.bookingService.getSingleBookingDetails(this.id).subscribe(data => {
      this.bookingModel = data;
    }, err => {
      console.log(err);
    });
  }
  getProducts() {
    this.bookingService.getProducts().subscribe(data => {
      this.productModel = data;
    }, err => {
      console.log(err);
    });
  }
  updateStatus()  {
    this.message = 'Order Updated';
    this.bookingModel = new Booking();
    this.bookingModel.bookingStatus = this.bookingForm.controls.statusType.value;
    this.bookingService.updateStatus(this.id, this.bookingModel).subscribe(data => {
      this.bookingModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
     /*  this.router.navigate(['orders/vieworders']); */
    }, err => {
      console.log(err);
    });
  }
}
