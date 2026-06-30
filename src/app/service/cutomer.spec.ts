import { TestBed } from '@angular/core/testing';

import { Cutomer } from './cutomer';

describe('Cutomer', () => {
  let service: Cutomer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cutomer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
