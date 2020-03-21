import { TestBed } from '@angular/core/testing';

import { DatafetchService } from './datafetch.service';

describe('DatafetchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatafetchService = TestBed.get(DatafetchService);
    expect(service).toBeTruthy();
  });
});
