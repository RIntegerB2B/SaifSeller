import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../product.service';
import { Product } from '../add-product/product.model';
import {priceValue} from '../../shared/validation/price-validation';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup;
  productModel: Product;
  editProductModel: Product;
  productData;
  productId;
  primeHide: boolean;
  showImages: boolean;
  showRelatedProducts;
  selectedImg;
  relatedProducts = [];
  editedProducts: any = [];
  mainCategoryModel = new Array();
  message;
  action;
  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService, private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
  }
  ngOnInit() {
    this.createForm();
    this.getProductById();
  }
  createForm() {
    this.editProductForm = this.fb.group({
      id: [''],
      productTitle: [''],
      productName: [''],
      productDescription: [''],
      shortDescription: [''],
      price: ['', priceValue],
      color: [''],
      styleCode: [''],
      skuCode: [''],
      category: ['']
    });
  }

  getProductById() {
    this.productService.getProductById(this.productId).subscribe(data => {
      this.productModel = data;
      this.editProductForm.setValue({
        id: this.productModel._id,
        productTitle: this.productModel.productTitle,
        productName: this.productModel.productName,
        productDescription: this.productModel.productDescription,
        shortDescription: this.productModel.shortDescription,
        price: this.productModel.price,
        color: this.productModel.color,
        styleCode: this.productModel.styleCode,
        skuCode: this.productModel.skuCode,
        category: this.productModel.mainCategory,
      }
      );
    }, err => {
      console.log(err);
    });
  }
  deleteProductImages(val) {
    this.productModel.productImageName.forEach(element => {
       if (element === val) {
        const index = this.productModel.productImageName.indexOf(val);
        if (index !== -1) {
          this.productModel.productImageName.splice(index, 1);
        }
      }
    });
  }
  showMainCategory() {
    this.productService.showAllMainCategory().subscribe(data => {
      this.mainCategoryModel = data;
    }, err => {
      console.log(err);
    });
  }
  editProducts() {
    this.message = 'Product edited successfully';
    this.productModel.productImageName.forEach(element => {
      const imageName = element.substring(element.lastIndexOf('/') + 1);
      this.editedProducts.push(imageName);
    });
   /*   */
    this.editProductModel = new Product();
    this.editProductModel._id =  this.productId;
    this.editProductModel.productTitle = this.editProductForm.controls.productTitle.value;
    this.editProductModel.productName = this.editProductForm.controls.productName.value;
    this.editProductModel.productDescription = this.editProductForm.controls.productDescription.value;
    this.editProductModel.shortDescription = this.editProductForm.controls.shortDescription.value;
    this.editProductModel.price = this.editProductForm.controls.price.value;
    this.editProductModel.color = this.editProductForm.controls.color.value;
    this.editProductModel.styleCode = this.editProductForm.controls.styleCode.value;
    this.editProductModel.skuCode = this.editProductForm.controls.skuCode.value;
    this.editProductModel.productImageName = this.editedProducts;
this.productService.updateProduct(this.editProductModel).subscribe(data => {
  this.snackBar.open(this.message, this.action, {
    duration: 3000,
  });
  this.router.navigate(['product/viewproducts']);
}, err => {
  console.log(err);
});
  }
}
