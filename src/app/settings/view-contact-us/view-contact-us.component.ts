import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import { SettingsService } from '../settings.service';
import {ContactUs} from '../contact-us/contact-us.model';

@Component({
  selector: 'app-view-contact-us',
  templateUrl: './view-contact-us.component.html',
  styleUrls: ['./view-contact-us.component.css']
})
export class ViewContactUsComponent implements OnInit {
  contactModel: ContactUs;
  contactAddModel: ContactUs;
  contactEditForm: FormGroup;
  contactForm: FormGroup;
  message;
  action;
  constructor(private fb: FormBuilder, private router: Router, private settingService: SettingsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getContactDetails();
  }
  createForm () {
    this.contactEditForm = this.fb.group({
      id: [''],
      contactNumber: [''],
      emailId: [''],
      address: [''],
    });
  }

  getContactDetails () {
    this.settingService.getContactDetails().subscribe(data => {
      this.contactModel = data;
    });
  }
  editAddress(data) {
    data.detailsUpdate = true;
  }
  cancelDetails(data) {
    data.detailsUpdate = false;
  }
  updateDetails(id, phno, mailid, address) {
    this.message = 'Details updated';
    this.contactAddModel = new ContactUs();
    this.contactAddModel.phoneNumber = phno;
    this.contactAddModel.emailId = mailid;
    this.contactAddModel.address = address;
    this.settingService.updateContactDetails(this.contactAddModel, id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.contactModel = data;
    });
  }

}
