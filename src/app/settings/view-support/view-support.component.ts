import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import { SettingsService } from '../settings.service';
import {Support} from '../support/support.model';

@Component({
  selector: 'app-view-support',
  templateUrl: './view-support.component.html',
  styleUrls: ['./view-support.component.css']
})
export class ViewSupportComponent implements OnInit {
  supportModel: Support;
  supportAddModel: Support;
  supportEditForm: FormGroup;
  supportForm: FormGroup;
  message;
  action;
  constructor(private fb: FormBuilder, private router: Router, private settingService: SettingsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getSupportDetails();
  }
  createForm () {
    this.supportEditForm = this.fb.group({
      id: [''],
      whatsappNumber: [''],
      emailId: [''],
      openTimings: [''],
    });
  }

  getSupportDetails () {
    this.settingService.getSupportDetails().subscribe(data => {
      this.supportModel = data;
    });
  }
  editAddress(data) {
    data.detailsUpdate = true;
  }
  cancelDetails(data) {
    data.detailsUpdate = false;
  }
  updateDetails(id, whatsappno, mailid, opentimings) {
    this.message = 'Details updated';
    this.supportAddModel = new Support();
    this.supportAddModel.whatsappNumber = whatsappno;
    this.supportAddModel.emailId = mailid;
    this.supportAddModel.openTimings = opentimings;
    this.settingService.updateSupportDetails(this.supportAddModel, id).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.supportModel = data;
    });
  }
}
