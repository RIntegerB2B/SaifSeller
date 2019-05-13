import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import {PrivacyPolicy} from './privacy-policy.model';
import { MatSnackBar } from '@angular/material';

import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  privacyForm: FormGroup;
  privacyModel: PrivacyPolicy;
  constructor(private fb: FormBuilder, private router: Router, private settingService: SettingsService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.createForm();
  }
createForm() {
  this.privacyForm = this.fb.group({
    policyHeading: [''],
    policies: this.fb.array([]),
  });
  this.addForm();
}
addForm() {
  const policies = this.fb.group({
    policyQuestion: ['', Validators.required],
    policyAnswers: ['', Validators.required],
  });
  this.policyForms.push(policies);
}
get policyForms() {
  return this.privacyForm.get('policies') as FormArray;
}
deletePolicies(i) {
  this.policyForms.removeAt(i);
}
createPolicy() {
  this.privacyModel = new PrivacyPolicy();
  this.privacyModel.policyHeading = this.privacyForm.controls.policyHeading.value;
  this.privacyModel.policies = this.privacyForm.controls.policies.value;
  this.settingService.addPrivacyPolicy(this.privacyModel).subscribe(data => {
  }, err => {
    console.log(err);
  });
    }
}
