import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import { SettingsService } from '../settings.service';
import {Support} from './support.model';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  supportForm: FormGroup;
  supportModel: Support;
  constructor(private fb: FormBuilder, private router: Router, private settingService: SettingsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.supportForm = this.fb.group({
      whatsappNumber: [''],
      emailId: [''],
      openTimings: ['']
    });
  }

  addSupportDetail() {
    this.supportModel = new Support();
    this.supportModel.emailId = this.supportForm.controls.emailId.value;
    this.supportModel.openTimings = this.supportForm.controls.openTimings.value;
    this.supportModel.whatsappNumber = this.supportForm.controls.whatsappNumber.value;
    this.settingService.addSupport(this.supportModel).subscribe(data => {
    }, err => {
      console.log(err);
    });
      }
}
