import { TestBed } from '@angular/core/testing';

import { ElementService } from './element.service';

describe('ElementService', () => {
  let service: ElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
