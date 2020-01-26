import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  products: Product[];
  dataSource = new MatTableDataSource<Product>([]);
  m = moment;
  cols: string[] = ['select', 'SKU', 'productName', 'productPrice', 'productQuantity', 'productCategory', 'productAddedAt', 'edit'];
  selection = new SelectionModel<Product>(true, []);

  constructor(private ps: ProductService, ) {
    this.ps.productsObservable.subscribe((res) => {
      this.products = res;
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
  }
  ngOnDestory() {

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.SKU}`;
  }

  deleteProducts() {
    console.log(this.selection.selected);
    this.selection.selected.forEach(element => {
      this.ps.deleteProducts(element.SKU).then(res => {
        console.log(res);
      });
    });
  }
}
