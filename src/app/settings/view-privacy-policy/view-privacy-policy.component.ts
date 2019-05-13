import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import {PrivacyPolicy} from '../privacy-policy/privacy-policy.model';

import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-view-privacy-policy',
  templateUrl: './view-privacy-policy.component.html',
  styleUrls: ['./view-privacy-policy.component.css']
})
export class ViewPrivacyPolicyComponent implements OnInit {
  privacyModel: PrivacyPolicy;
  privacyAddModel: PrivacyPolicy;
  privacyEditForm: FormGroup;
  privacyForm: FormGroup;
  message;
  action;
  edit: boolean;
  constructor(private fb: FormBuilder, private router: Router, private settingService: SettingsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getPolicyDetails();
  }
  createForm() {
    this.privacyEditForm = this.fb.group({
      id: [''],
      policyHeading: [''],
      policies: this.fb.array([]),
    });
  }
  addForm() {
    const policies = this.fb.group({
      policyQuestion: ['', Validators.required],
      policyAnswers: ['', Validators.required],
    });
    this.policyForms.push(policies);
  }
  getPolicyDetails () {
    this.settingService.getPolicyDetails().subscribe(data => {
      this.privacyModel = data[0];
      this.addNewForm();
    });
  }
  get policyForms() {
    return this.privacyEditForm.get('policies') as FormArray;
  }
  deletePolicies(i) {
    this.policyForms.removeAt(i);
  }
  addNewForm() {
    for (let i = 0; i <= this.privacyModel.policies.length - 1; i++) {
      const policies = this.fb.group({
        id: [this.privacyModel.policies[i]._id],
        policyQuestion: [this.privacyModel.policies[i].policyQuestion],
        policyAnswers: [this.privacyModel.policies[i].policyAnswers]
      });
      this.policyForms.push(policies);
    }
  }
  editPolicy() {
    this.edit = true;
  }
  cancelPolicy() {
    this.edit = false;
  }
  updatePolicy(formvalue, modelvalue) {
    this.message = 'Details updated';
    this.privacyAddModel = new PrivacyPolicy();
    this.privacyAddModel.policyHeading = formvalue.controls.policyHeading.value;
  this.privacyAddModel.policies = formvalue.controls.policies.value;
    this.settingService.updatePrivacyPolicy(this.privacyAddModel, formvalue.controls.id.value).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.privacyModel = data;
   /*    this.cancelPolicy(); */
    }, err => {
      console.log(err);
    });
  }
}
