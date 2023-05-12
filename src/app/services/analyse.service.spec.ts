import { TestBed } from '@angular/core/testing';

import { AnalyseService } from './analyse.service';

describe('AnalyseService', () => {
  let service: AnalyseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
