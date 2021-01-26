import {TestBed} from '@angular/core/testing';

import {TripListResolver} from './trip-list.service';

describe('TripListService', () => {
  let service: TripListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripListResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
