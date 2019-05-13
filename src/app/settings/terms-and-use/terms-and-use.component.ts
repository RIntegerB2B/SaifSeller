import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import {TermsUse} from './termsuse.model';
import { MatSnackBar } from '@angular/material';

import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-terms-and-use',
  templateUrl: './terms-and-use.component.html',
  styleUrls: ['./terms-and-use.component.css']
})
export class TermsAndUseComponent implements OnInit {
  termsForm: FormGroup;
  termsModel: TermsUse;
  constructor(private fb: FormBuilder, private router: Router, private settingService: SettingsService, private snackBar: MatSnackBar) {}
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.termsForm = this.fb.group({
      termsHeading: [''],
      termsDetails: ['']
    });
  }
  createTerms() {
    this.termsModel = new TermsUse();
    this.termsModel.details = this.termsForm.controls.termsDetails.value;
    this.termsModel.heading = this.termsForm.controls.termsHeading.value;
    this.settingService.addTerms(this.termsModel).subscribe(data => {
         this.router.navigate(['settings/viewterms']);
    }, err => {
      console.log(err);
    });
      }
}
