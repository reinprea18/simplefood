import { TestBed } from '@angular/core/testing';

import { MsngrService } from './msngr.service';

describe('MsngrService', () => {
  let service: MsngrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsngrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
