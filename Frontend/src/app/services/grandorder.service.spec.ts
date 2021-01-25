import { TestBed } from '@angular/core/testing';

import { GrandOrderService } from './grandorder.service';

describe('GrandOrderService', () => {
  let service: GrandOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrandOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
