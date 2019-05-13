import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {FAQ} from '../faq/faq.model';
import { MatSnackBar } from '@angular/material';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-edit-faq',
  templateUrl: './edit-faq.component.html',
  styleUrls: ['./edit-faq.component.css']
})
export class EditFaqComponent implements OnInit {
id;
faqModel: any;
  faqAddModel: FAQ;
  faqEditForm: FormGroup;
  message;
  action;
  constructor(private router: Router, private settingService: SettingsService, private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.createForm();
    this.getFAQDetails();
  }
 getFAQDetails() {
   this.settingService.getSingleFAQ(this.id).subscribe(data => {
     this.faqModel = data;
     this.addNewForm();
   }, err => {
     console.log(err);
   });

 }
 createForm() {
  this.faqEditForm = this.fb.group({
    id: [''],
    faqHeading: [''],
    faqs: this.fb.array([]),
  });
}
addForm() {
  const faqs = this.fb.group({
    faqQuestion: ['', Validators.required],
    faqAnswers: ['', Validators.required],
  });
  this.faqForms.push(faqs);
}
get faqForms() {
  return this.faqEditForm.get('faqs') as FormArray;
}
deleteFAQ(i) {
  this.faqForms.removeAt(i);
}
cancelFAQ() {
  this.router.navigate(['settings/viewfaq']);
}
addNewForm() {
  for (let i = 0; i <= this.faqModel.faqDetails.length - 1; i++) {
    const policies = this.fb.group({
      id: [this.faqModel.faqDetails[i]._id],
      faqQuestion: [this.faqModel.faqDetails[i].faqQuestion],
      faqAnswers: [this.faqModel.faqDetails[i].faqAnswers]
    });
    this.faqForms.push(policies);
  }
}
updateFAQ(formvalue) {
  this.message = 'Details updated';
  this.faqModel = new FAQ();
  this.faqModel.faqHeading = formvalue.controls.faqHeading.value;
this.faqModel.faqs = formvalue.controls.faqs.value;
  this.settingService.updateFAQ(this.faqModel, formvalue.controls.id.value).subscribe(data => {
    this.snackBar.open(this.message, this.action, {
      duration: 2000,
    });
    this.faqModel = data;
 /*    this.cancelPolicy(); */
  }, err => {
    console.log(err);
  });
}
}
