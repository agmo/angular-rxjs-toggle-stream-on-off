import { TestBed } from '@angular/core/testing';

import { MethodTwoService } from './method-two.service';

describe('MethodTwoService', () => {
  let service: MethodTwoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MethodTwoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
