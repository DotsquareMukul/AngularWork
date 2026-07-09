import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DropdownOption } from '../../../models/product-models';

/**
 * Reusable select dropdown, wired as a ControlValueAccessor.
 * Accepts an `options` signal input so dynamic/async lookup data
 * (fetched via DropdownDataService) can be passed straight through.
 *
 * Usage:
 *   <app-select-field formControlName="productCategory" label="Product Category" [options]="categories()" />
 */

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatProgressSpinnerModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFieldComponent),
      multi: true,
    },
  ],
  templateUrl: './drop-down.html',

  styleUrls: ['./drop-down.css'],
})
export class SelectFieldComponent implements ControlValueAccessor {
  label = input<string>('');
  options = input<DropdownOption[]>([]);
  errorText = input<string>('This field is required');
  invalid = input<boolean>(false);
  loading = input<boolean>(false);
  allowEmpty = input<boolean>(false);

  value: string | null = null;
  disabled = false;

  private onChange: (value: string | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.value = value ?? null;
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onValueChange(value: string | null): void {
    this.value = value;
    this.onChange(value);
  }
}
