import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBar} from '@angular/material';

import { CategoryService } from '../category.service';
import { SuperCategory } from '../super-category/superCategory.model';
import { MainCategory } from '../../category/main-category/mainCategory.model';
import {SubCategory} from './sub-category.model';

export interface PeriodicElement {
  categoryName: string;
  description: string;

}

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  superCategoryModel: SuperCategory;
  mainCategoryModel: MainCategory;
  subCategoryModel: SubCategory;
  subCategoryForm: FormGroup;
  headerCatSelectedData;
  selectedMainCategory;
  mainCategoryData;
  headCatSelected;
  message;
  action;
  displayedColumns: string[] = ['categoryName', 'description', 'edit', 'delete'];
  constructor(private fb: FormBuilder, private router: Router, private categoryService: CategoryService, private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.createForm();
    this.getSuperCategory();
  }
  createForm() {
    this.subCategoryForm = this.fb.group({
      id: [''],
      categoryName: ['', Validators.required],
      description: ['']
    });
  }
  getSuperCategory() {
    this.categoryService.getSuperCategory().subscribe(data => {
      this.superCategoryModel = data;
    });
  }
  setNewUser(id) {
    this.headerCatSelectedData = id;
    this.categoryService.getMainCategory(id).subscribe(data => {
      this.mainCategoryModel = data.mainCategory;
    }, error => {
      console.log(error);
    });
  }
  selectMainCategory(id) {
  this.selectedMainCategory = id;
  }
  getCategory(id) {
    this.headCatSelected = id;
    this.categoryService.getMainCategory(id).subscribe(data => {
      this.mainCategoryModel = data.mainCategory;
    }, error => {
      console.log(error);
    });
  }
  addSubCategory() {
    this.subCategoryModel = new SubCategory();
    this.subCategoryModel.subCategoryName = this.subCategoryForm.controls.categoryName.value;
    this.subCategoryModel.subCategoryDescription = this.subCategoryForm.controls.description.value;
    this.categoryService.addSubCategory(this.subCategoryModel, this.headerCatSelectedData, this.selectedMainCategory).subscribe(data => {
      console.log(data);
    });
  }
  getMainCategory(id) {

  }
}
