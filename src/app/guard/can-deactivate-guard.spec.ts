import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { canDeactivateGuard, CanDeactivateI } from './can-deactivate-guard';

describe('canDeactivateGuard', () => {
  const executeGuard: CanDeactivateFn<CanDeactivateI> = (...guardParameters) =>
    TestBed.runInInjectionContext(() => canDeactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
