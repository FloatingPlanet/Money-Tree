import { TestBed } from '@angular/core/testing';

import { FlashMessageService } from './flash-message.service';

describe('FlashMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlashMessageService = TestBed.get(FlashMessageService);
    expect(service).toBeTruthy();
  });
});
