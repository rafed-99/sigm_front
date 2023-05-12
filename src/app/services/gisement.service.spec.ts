import { TestBed } from '@angular/core/testing';

import { GisementService } from './gisement.service';

describe('GisementService', () => {
  let service: GisementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GisementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
