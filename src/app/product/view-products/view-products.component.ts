import { Component, OnInit,  ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource , MatSort} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import { ProductService } from '../product.service';
import { Product } from '../add-product/product.model';

export interface PeriodicElement {
  primeImage: string;
  productName: string;
  productTitle: string;
  styleCode: string;
  skuCode: string;
  view: string;
  delete: string;
}
@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['primeImage', 'productName', 'productTitle', 'styleCode', 'skuCode', 'view', 'delete'];
  productModel: Product[];
  productData;
  message;
  action;

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  dataSource: any = [];
  array: any;
  temp: any = [];
  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService, private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.productData = new MatTableDataSource<PeriodicElement>(data);
      this.productData.sort = this.sort;
      this.productData.paginator = this.paginator;
      this.array = data;
        this.totalSize = this.array.length;
        this.temp = data;
        this.iterator();
    }, err => {
      console.log(err);
    });
  }
  handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const filterCustomer = Object.keys(this.temp[0]);
    filterCustomer.splice(filterCustomer.length - 1);

    console.log(filterCustomer);
    if (!filterCustomer.length) {
      return;
    }
    const rows = this.temp.filter(function (d) {
      for (let i = 0; i <= filterCustomer.length; i++) {
        const column = filterCustomer[i];
        console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.productData = rows;
  }
  deleteProduct(product) {
    this.message = 'Product deleted';
    this.productService.deleteProduct(product).subscribe(data => {
      this.productData = new MatTableDataSource<PeriodicElement>(data);
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
    }, err => {
      console.log(err);
    });
  }
  viewProduct(product) {
    this.router.navigate(['/product/productdetail', product._id ]);
  }
}
