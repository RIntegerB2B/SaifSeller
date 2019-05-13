import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import {TermsUse} from '../terms-and-use/termsuse.model';

import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-view-terms-and-use',
  templateUrl: './view-terms-and-use.component.html',
  styleUrls: ['./view-terms-and-use.component.css']
})
export class ViewTermsAndUseComponent implements OnInit {
  termsModel: TermsUse;
  termsAddModel: TermsUse;
  termsEditForm: FormGroup;
  termsForm: FormGroup;
  message;
  action;
  edit: boolean;
  constructor(private fb: FormBuilder, private router: Router, private settingService: SettingsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getTerms();
  }
  createForm() {
    this.termsForm = this.fb.group({
      id: [''],
      termsHeading: [''],
      termsDetails: ['']
    });
  }
  getTerms () {
    this.settingService.getTerms().subscribe(data => {
      this.termsModel = data;
    }, err => {
      console.log(err);
    });
  }
  editTerms(data) {
    data.detailsUpdate = true;
  }
  cancelTerms(data) {
    data.detailsUpdate = false;
  }
  deleteTerms(data) {
    this.settingService.deleteSingleTerm(data._id).subscribe(val => {
      this.termsModel = val;
    }, err => {
      console.log(err);
    });
  }
  updateTerms(heading, details, id, data) {
    console.log(id);
    this.termsAddModel = new TermsUse();
    this.termsAddModel.heading = heading;
    this.termsAddModel.details = details;
    this.settingService.updateTerm(this.termsAddModel, id).subscribe(val => {
      this.termsModel = val;
    }, err => {
      console.log(err);
    });
  }
}
