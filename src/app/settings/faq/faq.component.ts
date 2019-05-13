import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import {FAQ} from './faq.model';
import { MatSnackBar } from '@angular/material';

import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  faqForm: FormGroup;
  faqModel: FAQ;
  constructor(private fb: FormBuilder, private router: Router, private settingService: SettingsService, private snackBar: MatSnackBar) {}
  ngOnInit() {
    this.createForm();
  }
createForm() {
  this.faqForm = this.fb.group({
    faqHeading: [''],
    faqs: this.fb.array([]),
  });
  this.addForm();
}
addForm() {
  const faqs = this.fb.group({
    faqQuestion: ['', Validators.required],
    faqAnswers: ['', Validators.required],
  });
  this.faqForms.push(faqs);
}
get faqForms() {
  return this.faqForm.get('faqs') as FormArray;
}
deleteFAQs(i) {
  this.faqForms.removeAt(i);
}
createPolicy() {
  this.faqModel = new FAQ();
  this.faqModel.faqHeading = this.faqForm.controls.faqHeading.value;
  this.faqModel.faqDetails = this.faqForm.controls.faqs.value;
  this.settingService.addFAQ(this.faqModel).subscribe(data => {
       this.router.navigate(['settings/viewfaq']);
  }, err => {
    console.log(err);
  });
    }
}
