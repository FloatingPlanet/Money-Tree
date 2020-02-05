import {Component, OnInit, ViewChild} from '@angular/core';
import {Order} from '../../models/order';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {OrderService} from '../../services/order/order.service';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  orders: Order[];
  dataSource = new MatTableDataSource<Order>([]);
  cols: string[] = ['orderNumber', 'orderStatus', 'uid', 'coupon', 'purchaseDate', 'viewDetails'];
  m = moment;

  constructor(private os: OrderService,) {
    this.os.ordersObservable.subscribe((res) => {
      this.orders = res;
      this.dataSource = new MatTableDataSource<Order>(this.orders);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
