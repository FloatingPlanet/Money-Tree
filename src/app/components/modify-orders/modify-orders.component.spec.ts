import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyOrdersComponent } from './modify-orders.component';

describe('ModifyOrdersComponent', () => {
  let component: ModifyOrdersComponent;
  let fixture: ComponentFixture<ModifyOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
