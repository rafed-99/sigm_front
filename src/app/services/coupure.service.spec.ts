import { TestBed } from '@angular/core/testing';

import { CoupureService } from './coupure.service';

describe('CoupureService', () => {
  let service: CoupureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoupureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
