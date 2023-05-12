import { TestBed } from '@angular/core/testing';

import { CoucheService } from './couche.service';

describe('CoucheService', () => {
  let service: CoucheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoucheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
