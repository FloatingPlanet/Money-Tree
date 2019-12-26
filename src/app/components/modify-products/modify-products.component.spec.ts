import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyProductsComponent } from './modify-products.component';

describe('ModifyProductsComponent', () => {
  let component: ModifyProductsComponent;
  let fixture: ComponentFixture<ModifyProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
