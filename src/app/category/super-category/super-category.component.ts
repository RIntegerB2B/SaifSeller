import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';

import {SuperCategory} from './superCategory.model';
import {CategoryService} from '../category.service';
export interface PeriodicElement {
  categoryName: string;
  description: string;

}

@Component({
  selector: 'app-super-category',
  templateUrl: './super-category.component.html',
  styleUrls: ['./super-category.component.css']
})
export class SuperCategoryComponent implements OnInit {
  superCategoryForm: FormGroup;
  superCategoryModel: SuperCategory;
  categoryFilter;
  superCategoryFilter: SuperCategory[];
  superCategoryData;
  showCategoryName: boolean;
  displayedColumns: string[] = ['categoryName', 'description', 'edit', 'delete'];
  constructor(private fb: FormBuilder, private router: Router, private categoryService: CategoryService ) { }

  ngOnInit() {
    this.createForm();
    this.getSuperCategory();
  }
  createForm() {
    this.superCategoryForm = this.fb.group({
      id: [''],
      categoryName: ['', Validators.required],
      description: [''],
      editCategory: ['']
    });
  }
  getSuperCategory() {
    this.categoryService.getSuperCategory().subscribe(data => {
      this.superCategoryModel = data;
      this.superCategoryFilter = data;
      this.superCategoryData = new MatTableDataSource<PeriodicElement>(data);
    });
  }
  addSuperCategory() {
    this.superCategoryModel = new SuperCategory(
      this.superCategoryForm.controls.categoryName.value,
      this.superCategoryForm.controls.description.value,
    );
    this.categoryService.addSuperCategory(this.superCategoryModel).subscribe(data => {
      this.superCategoryFilter = data;
      this.superCategoryData = new MatTableDataSource<PeriodicElement>(data);
    });
    /* this.superCategoryForm.reset(); */
  }
  deleteSuperCategory(value) {
    this.categoryService.deleteSuperCategory(value).subscribe(deleteData => {
      this.superCategoryFilter = deleteData;
      this.superCategoryData = new MatTableDataSource<PeriodicElement>(deleteData);
    });
  }
  categoryVerify(val) {
    this.categoryFilter = this.superCategoryFilter.filter(data => data.categoryName.indexOf(val) !== -1);
    if (this.categoryFilter.length !== 0) {
    this.showCategoryName = true;
    } else if (this.categoryFilter.length === 0) {
      this.showCategoryName = false;
    }
  }
  edit(cat) {
    this.superCategoryFilter.map(category => {
      cat.editing = false;
      console.log(category);
    });
    cat.editing = true;
  }
}
