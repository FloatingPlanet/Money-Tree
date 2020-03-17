import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProductsContentComponent } from './category-products-content.component';

describe('CategoryProductsPageComponent', () => {
  let component: CategoryProductsContentComponent;
  let fixture: ComponentFixture<CategoryProductsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryProductsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryProductsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
