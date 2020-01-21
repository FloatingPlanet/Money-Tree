import { TestBed } from '@angular/core/testing';

import { CouponsService } from './coupons.service';

describe('CouponsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CouponsService = TestBed.get(CouponsService);
    expect(service).toBeTruthy();
  });
});
