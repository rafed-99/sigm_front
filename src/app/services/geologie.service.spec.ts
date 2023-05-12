import { TestBed } from '@angular/core/testing';

import { GeologieService } from './geologie.service';

describe('GeologieService', () => {
  let service: GeologieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeologieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
