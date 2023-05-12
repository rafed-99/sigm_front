import { TestBed } from '@angular/core/testing';

import { BordereauService } from './bordereau.service';

describe('BordereauService', () => {
  let service: BordereauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BordereauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
