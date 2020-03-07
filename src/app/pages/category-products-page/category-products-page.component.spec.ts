import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProductsPageComponent } from './category-products-page.component';

describe('CategoryProductsPageComponent', () => {
  let component: CategoryProductsPageComponent;
  let fixture: ComponentFixture<CategoryProductsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryProductsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
