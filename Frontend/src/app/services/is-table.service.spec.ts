import { TestBed } from '@angular/core/testing';

import { IsTableService } from './is-table.service';

describe('IsTableService', () => {
  let service: IsTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
