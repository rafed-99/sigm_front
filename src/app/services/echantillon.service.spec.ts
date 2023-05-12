import { TestBed } from '@angular/core/testing';

import { EchantillonService } from './echantillon.service';

describe('EchantillonService', () => {
  let service: EchantillonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EchantillonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
