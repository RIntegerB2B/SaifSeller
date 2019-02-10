import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import { ProductService } from '../product.service';
import { Product } from './product.model';
import { SuperCategory } from '../../category/super-category/superCategory.model';
import { MainCategory } from '../../category/main-category/mainCategory.model';
import { MOQ } from '../../moq/create-moq/moq.model';
import { priceValue } from '../../shared/validation/price-validation';
import { MatTabChangeEvent, MatTab } from '@angular/material';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  selectedIndex = 0;
  matTab: MatTab;
  productForm: FormGroup;
  productModel: Product;
  productDetail: Product[];
  moqModel: MOQ;
  mainCategoryModel = new Array();
  subCategoryModel = new Array();
  superCategoryModel: SuperCategory[];
  filteredSuperCategory = new Array();
  filteredMainCategory = new Array();
  message;
  action;
  productId;
  moqId;
  searchText;
  showSkuError: boolean;
  skuFilter;
  categories;
  superCategoryName;
  mainCategoryName;
  subCategoryName;
  showMainCategory: boolean;
  showSubCategory: boolean;
  showCategory: boolean;
  showSelectedMOQ: boolean;
  mainCategoryError: boolean;
  subCategoryError: boolean;
  category;
  mainCategory;
  subCategory;
  moqName;
  imageError: boolean;

  fileLength;
  selectRegion: number;
  fileToUpload;
  urls = new Array<string>();
  localArray: any = [];
  selected: string;
  regionSelectName;
  arryValue: any = [];
  confirmRegion: any = [];
  countryFilter = [];
  countryError;
  priceError: boolean;
  selecteValue: any = [];
  reader: FileReader = new FileReader();
  displayedColumns: string[] = ['moqName', 'moqDescription', 'moqQuantity'];
  moqData;
  waterProofValue = ['Yes', 'No'];

  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.showSuperCategory();
    this.getProducts();
  }
  createForm() {
    this.productForm = this.fb.group({
      id: [''],
      productName: [''],
      productDescription: [''],
      price: ['', priceValue],
      color: [''],
      overview: [''],
      styleCode: [''],
      skuCode: [''],
      skuCodeValue: [''],
      material: [''],
      brand: [''],
      dimensions: [''],
      weight: [''],
      assembly: [''],
      packageDetails: ['']
    });
  }
  selectedIndexChange(val: number) {
    this.selectedIndex = val;
  }
  selectNextTab(tab) {
    if (tab !== 2) {
      this.selectedIndex = tab + 1;
    } else {
      this.selectedIndex = 2;
    }
  }
  selectPreviousTab(tab) {
    if (tab !== 0) {
      this.selectedIndex = tab - 1;
    } else {
      this.selectedIndex = 0;
    }
  }
  handleFileInput(images: any) {
    this.imageError = false;
    this.fileToUpload = images;
    this.urls = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    }
  }
  showSuperCategory() {
    this.productService.showAllSuperCategory().subscribe(data => {
      this.superCategoryModel = data;
    }, err => {
      console.log(err);
    });
  }
  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.productDetail = data;
    }, err => {
      console.log(err);
    });
  }
  selectedSuperCategory(val) {
    this.category = val;
    this.showSubCategory = false;
    this.showCategory = false;
    this.superCategoryName = val.categoryName;
    this.filteredSuperCategory = this.superCategoryModel.filter(data => data._id === val._id);
    this.mainCategoryModel = this.filteredSuperCategory[0].mainCategory;
    if (this.mainCategoryModel.length !== 0) {
      this.showMainCategory = true;
      this.mainCategoryError = false;
      this.subCategoryError = false;
    } else {
      this.mainCategoryError = true;
      this.showMainCategory = false;
    }
 }
  selectedMainCategory(categoryVal) {
    this.mainCategory = categoryVal.mainCategoryName;
    this.showCategory = false;
    this.filteredMainCategory = this.mainCategoryModel.filter(data => data._id === categoryVal._id);
    this.subCategoryModel = this.filteredMainCategory[0].subCategory;
    if (this.subCategoryModel.length !== 0) {
      this.showSubCategory = true;
      this.subCategoryError = false;
    } else {
      this.showSubCategory = false;
      this.subCategoryError = true;
    }
  }
  selectedSubCategory(subCategoryVal) {
this.subCategory = subCategoryVal.subCategoryName;
this.categories = subCategoryVal._id;
this.showCategory = true;
this.subCategoryError = false;
this.subCategoryName = subCategoryVal.subCategoryName;
  }
  deleteCategory(data) {
    const index = this.categories.indexOf(data);
    if (index > -1) {
      this.categories.splice(index, 1);
    }
  }
  skuCodeVerify(elem) {
    this.skuFilter = this.productDetail.filter(data => data.skuCode.indexOf(elem) !== -1);
    if (this.skuFilter.length !== 0) {
      this.showSkuError = true;
    } else if (this.skuFilter.length === 0) {
      this.showSkuError = false;
    }
  }
  validateProducts() {
    if (this.productForm.controls.productName.value === '' || this.fileToUpload === undefined ) {
      this.selectedIndex = 0;
      if (this.fileToUpload === undefined) {
        this.imageError = true;
      } else {
        this.imageError = false;
      }
    } else if (this.productForm.controls.styleCode.value === '' || this.productForm.controls.skuCode.value === '') {
      this.selectedIndex = 1;
    } else {
      this.addProducts();
    }
  }
  addProducts() {
    this.message = 'Product added successfully';
    this.productModel = new Product();
    this.productModel.productName = this.productForm.controls.productName.value;
    this.productModel.productDescription = this.productForm.controls.productDescription.value;
    this.productModel.price = this.productForm.controls.price.value;
    this.productModel.color = this.productForm.controls.color.value;
    // category
    this.productModel.subCategory = this.categories;
    // detials
    this.productModel.styleCode = this.productForm.controls.styleCode.value;
    this.productModel.skuCode = this.productForm.controls.skuCode.value;
    this.productModel.material = this.productForm.controls.material.value;
    this.productModel.brand = this.productForm.controls.brand.value;
    this.productModel.dimensions = this.productForm.controls.dimensions.value;
    this.productModel.weight = this.productForm.controls.weight.value;
    this.productModel.assembly = this.productForm.controls.assembly.value;
    this.productModel.packageDetails = this.productForm.controls.packageDetails.value;
    this.productService.addProduct(this.productModel).subscribe(data => {
      this.productId = data._id;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.uploadImages(this.productModel.skuCode);

    }, error => {
      console.log(error);
    });
  }
  uploadImages(skucode) {
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    }
    this.productService.uploadImages(formData, skucode).subscribe(data => {
      this.redirect();
    }, error => {
      console.log(error);
    });
  }
  redirect() {
    this.router.navigate(['product/viewproducts']);
  }
  cancel() {
    this.productForm.reset();
  }
}
