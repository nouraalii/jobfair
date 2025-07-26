import { TestBed } from '@angular/core/testing';

import { SearchandsortService } from './searchandsort.service';

describe('SearchandsortService', () => {
  let service: SearchandsortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchandsortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
