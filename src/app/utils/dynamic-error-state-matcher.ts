// shared/utils/dynamic-error-state-matcher.ts
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl } from '@angular/forms';

export class DynamicErrorStateMatcher implements ErrorStateMatcher {
  constructor(private isInvalidFn: () => boolean) {}

  isErrorState(control: FormControl | null): boolean {
    return this.isInvalidFn();
  }
}
