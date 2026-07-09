import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/**
 * Reusable text / textarea input, wired as a ControlValueAccessor so it can
 * be used directly with `formControlName` inside any Reactive Form.
 *
 * Usage:
 *   <app-text-input formControlName="productName" label="Product Name" />
 *   <app-text-input formControlName="productDescription" label="Description" [multiline]="true" [rows]="4" />
 */
@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
  templateUrl: './input.html',
  styleUrls: ['./input.css'],
})
export class TextInputComponent implements ControlValueAccessor {
  label = input<string>('');
  placeholder = input<string>('');
  hint = input<string>('');
  multiline = input<boolean>(false);
  rows = input<number>(3);
  type = input<string>('text');
  errorText = input<string>('This field is required');
  invalid = input<boolean>(false);

  value = '';
  disabled = false;

  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onValueChange(value: string): void {
    this.value = value;
    this.onChange(value);
  }
}
