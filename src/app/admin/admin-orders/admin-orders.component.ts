import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Order} from '../../models/order';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {OrderService} from '../../services/order/order.service';
import * as moment from 'moment';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public orders: Order[];
  public dataSource = new MatTableDataSource<Order>([]);
  public cols: string[] = ['orderNumber', 'orderStatus', 'uid', 'coupon', 'purchaseDate', 'viewDetails'];
  public m = moment;
  private orderObservable$: Subscription;

  constructor(private os: OrderService) {
    this.orderObservable$ = this.os.ordersObservable.subscribe((res) => {
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

  ngOnDestroy(): void {
    this.orderObservable$.unsubscribe();
  }
}
