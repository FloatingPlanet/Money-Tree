import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-product-table',
  templateUrl: './admin-product-table.component.html',
  styleUrls: ['./admin-product-table.component.scss']
})
export class AdminProductTableComponent implements OnInit {

  products: Product[];
  dataSource = new MatTableDataSource<Product>([]);
  m = moment;
  constructor(private ps: ProductService, ) {

  }
  ngOnInit() {
    this.ps.productsObservalbe.subscribe((res) => {
      this.products = res;
      this.dataSource = new MatTableDataSource<Product>(this.products);
    });
  }
  c: string[] = ['select', 'SKU', 'productName', 'productPrice', 'productQuantity', 'productCategory', 'productAddedAt', 'edit'];
  selection = new SelectionModel<Product>(true, []);

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
}
