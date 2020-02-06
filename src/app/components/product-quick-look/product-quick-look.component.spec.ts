import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductQuickLookComponent } from './product-quick-look.component';

describe('ProductQuickLookComponent', () => {
  let component: ProductQuickLookComponent;
  let fixture: ComponentFixture<ProductQuickLookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductQuickLookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductQuickLookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
