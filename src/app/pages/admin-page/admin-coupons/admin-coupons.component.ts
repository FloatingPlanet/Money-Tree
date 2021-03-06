import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Coupon} from '../../../models/coupon';
import * as moment from 'moment';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {CouponsService} from '../../../services/coupons/coupons.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-admin-coupons',
  templateUrl: './admin-coupons.component.html',
  styleUrls: ['./admin-coupons.component.scss']
})
export class AdminCouponsComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  public coupons: Coupon[];
  public dataSource = new MatTableDataSource<Coupon>([]);
  public m = moment;
  public cols: string[] = ['select', 'coupon', 'discount', 'from', 'to', 'freeShipping', 'minimumSpend', 'amount', 'addedAt', 'edit'];
  public selection = new SelectionModel<Coupon>(true, []);
  private couponsObservable$: Subscription;

  constructor(private cs: CouponsService) {
    this.couponsObservable$ = this.cs.couponsObservable.subscribe((res: Coupon[]) => {
      console.log(res);
      this.coupons = res;
      this.dataSource = new MatTableDataSource<Coupon>(this.coupons);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
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

  checkboxLabel(row?: Coupon): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.coupon}`;
  }

  deleteCoupons() {
    this.selection.selected.forEach(element => {
      this.cs.deleteCoupons(element.coupon).then(() => {
        }
      );
    });
  }

  ngOnDestroy(): void {
    if (this.couponsObservable$) {
      this.couponsObservable$.unsubscribe();
    }
  }
}
