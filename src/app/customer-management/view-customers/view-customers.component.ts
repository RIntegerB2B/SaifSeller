import { Component, OnInit , ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {RegModel} from './customer.model';
import {CustomerManagementService} from '../customer-management.service';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.css']
})
export class ViewCustomersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'mobileNumber', 'emailId', 'location', 'gender'];
  customerDetails: RegModel[];
  customerData: any;

  constructor(private router: Router, private customerService: CustomerManagementService) { }

  ngOnInit() {
    this.viewCustomers();
  }
  viewCustomers() {
    this.customerService.getAllCustomers().subscribe(data => {
      this.customerDetails = data;
      this.customerData = data;
      this.customerData = new MatTableDataSource<RegModel>(data);
      this.customerData.sort = this.sort;
      this.customerData.paginator = this.paginator;
    }, err => {
      console.log(err);
    });
  }
}
