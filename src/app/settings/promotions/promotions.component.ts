import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import { Promotions } from './promotions.model';
import { SettingsService } from '../settings.service';
import {priceValue} from '../../shared/validation/price-validation';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  promotionsForm: FormGroup;
  promotionModel: Promotions;
  imageNameFilter;
  showImageNameError = false;
  message;
  action;
  constructor(private fb: FormBuilder, private router: Router, private settingService: SettingsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.promotionsForm = this.fb.group({
      id: [''],
      position: ['', priceValue],
      promotionTitle: ['']
    });
  }
  addPromotion() {
    this.message = 'Promotion created';
   this.promotionModel = new Promotions();
   this.promotionModel.position = this.promotionsForm.controls.position.value;
   this.promotionModel.promotionTitle = this.promotionsForm.controls.promotionTitle.value;
    this.settingService.addPromotions(this.promotionModel).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.router.navigate(['settings/viewpromotions']);
    }, error => {
      console.log(error);
    });
  }
}
