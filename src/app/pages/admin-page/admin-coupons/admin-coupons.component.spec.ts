import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCouponsComponent } from './admin-coupons.component';

describe('AdminCouponsComponent', () => {
  let component: AdminCouponsComponent;
  let fixture: ComponentFixture<AdminCouponsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCouponsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
