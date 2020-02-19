import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidBannerComponent } from './mid-banner.component';

describe('MidBannerComponent', () => {
  let component: MidBannerComponent;
  let fixture: ComponentFixture<MidBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
