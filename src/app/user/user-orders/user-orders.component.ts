import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Coupon} from '../../models/coupon';

export interface PeriodicElement {
  purchaseDate: number;
  orderNumber: number;
  orderStatus: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {purchaseDate: 123, orderNumber: 131313, orderStatus: 'H'},
  {purchaseDate: 123, orderNumber: 131313, orderStatus: 'H'},
  {purchaseDate: 123, orderNumber: 131313, orderStatus: 'H'},
  {purchaseDate: 123, orderNumber: 131313, orderStatus: 'H'},
  {purchaseDate: 123, orderNumber: 131313, orderStatus: 'H'},
];

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
})

export class UserOrdersComponent implements OnInit {
  constructor() {
  }

  dataSource = ELEMENT_DATA;
  cols: string[] = ['purchaseDate', 'orderNumber', 'orderStatus', 'detail', 'tracking'];

  ngOnInit() {
  }

}
