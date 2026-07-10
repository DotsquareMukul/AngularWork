import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

/**
 * Reusable date picker, wired as a ControlValueAccessor.
 * Internally stores/emits a plain ISO date string (yyyy-MM-dd) so the
 * form model stays serialization-friendly.
 *
 * Usage:
 *   <app-date-picker-field formControlName="launchDate" label="Launch Date" />
 */
@Component({
  selector: 'app-date-picker-field',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerFieldComponent),
      multi: true,
    },
  ],
  templateUrl: './date-picker.html',
  styleUrls: ['./date-picker.css'],
})
export class DatePickerFieldComponent implements ControlValueAccessor {
  label = input<string>('');
  errorText = input<string>('This field is required');
  invalid = input<boolean>(false);
  minDate = input<Date | null>(null);
  maxDate = input<Date | null>(null);

  dateValue: Date | null = null;
  disabled = false;

  private onChange: (value: string | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.dateValue = value ? new Date(value) : null;
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

  onValueChange(value: Date | null): void {
    this.dateValue = value;
    this.onChange(value ? this.toIsoDate(value) : null);
  }

  private toIsoDate(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
