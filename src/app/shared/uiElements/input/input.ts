import { Component, forwardRef, input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';
import { DynamicErrorStateMatcher } from '../../../utils/dynamic-error-state-matcher';

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
export class TextInputComponent implements ControlValueAccessor, OnInit {
  label = input<string>('');
  placeholder = input<string>('');
  hint = input<string>('');
  multiline = input<boolean>(false);
  rows = input<number>(3);
  type = input<string>('text');
  errorText = input<string>('This field is required');
  invalid = input<boolean>(false);

  matcher!: DynamicErrorStateMatcher;

  value = '';
  disabled = false;

  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  ngOnInit(): void {
    this.matcher = new DynamicErrorStateMatcher(() => this.invalid());
  }

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
