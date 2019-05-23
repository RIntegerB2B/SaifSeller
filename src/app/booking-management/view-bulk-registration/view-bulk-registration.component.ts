import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource , MatSort} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import {BulkRegModel} from './bulk.model';
import {BookingManagementService} from '../booking-management.service';

@Component({
  selector: 'app-view-bulk-registration',
  templateUrl: './view-bulk-registration.component.html',
  styleUrls: ['./view-bulk-registration.component.css']
})
export class ViewBulkRegistrationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['fullname', 'date', 'mobileNumber', 'emailid',  'city', 'details'];
  bulkRegistrationModel: any;
  constructor(private fb: FormBuilder, private router: Router, private bookingService: BookingManagementService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getBulkRegistration();
  }
getBulkRegistration() {
this.bookingService.getBulkRegistration().subscribe(data => {
  this.bulkRegistrationModel = data;
}, err => {
  console.log(err);
});
}
}
