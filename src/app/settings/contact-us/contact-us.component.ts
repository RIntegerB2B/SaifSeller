import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import { SettingsService } from '../settings.service';
import {ContactUs} from './contact-us.model';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  contactModel: ContactUs;
  constructor(private fb: FormBuilder, private router: Router, private settingService: SettingsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.contactForm = this.fb.group({
      phoneNumber: [''],
      emailId: [''],
      address: ['']
    });
  }
  addContactDetail() {
    this.contactModel = new ContactUs();
    this.contactModel.emailId = this.contactForm.controls.emailId.value;
    this.contactModel.address = this.contactForm.controls.address.value;
    this.contactModel.phoneNumber = this.contactForm.controls.phoneNumber.value;
    this.settingService.addContact(this.contactModel).subscribe(data => {
    }, err => {
      console.log(err);
    });
      }
}
