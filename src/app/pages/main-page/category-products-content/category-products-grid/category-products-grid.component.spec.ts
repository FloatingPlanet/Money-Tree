import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProductsGridComponent } from './category-products-grid.component';

describe('CategoryProductsGridComponent', () => {
  let component: CategoryProductsGridComponent;
  let fixture: ComponentFixture<CategoryProductsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryProductsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryProductsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
