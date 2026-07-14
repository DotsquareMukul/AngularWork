import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DropdownOption } from '../../../models/product-models';
/**
 * Reusable compound "Duration" field: a number amount + a unit select
 * (Days / Weeks / Months / Years). Unlike the other shared inputs this is
 * not a single-value ControlValueAccessor — the amount and unit are
 * genuinely two sibling FormControls in the parent FormGroup (e.g.
 * `productDuration` + `productDurationUnit`), so the component simply
 * accepts both controls directly. This keeps the flat form-model shape
 * (no nested groups) while still giving one drop-in reusable component.
 *
 * Usage:
 *   <app-duration-field
 *     [amountControl]="form.controls.productDuration"
 *     [unitControl]="form.controls.productDurationUnit"
 *     [unitOptions]="durationUnits()"
 *     amountLabel="Product Duration"
 *     [amountInvalid]="isInvalid('productDuration')"
 *     [unitInvalid]="isInvalid('productDurationUnit')"
 *   />
 */
@Component({
  selector: 'app-duration-field',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './duration.html',
  styleUrls: ['./duration.css'],
})
export class DurationFieldComponent {
  amountControl = input.required<FormControl<number | null>>();
  unitControl = input.required<FormControl<string | null>>();
  unitOptions = input<DropdownOption[]>([]);
  amountLabel = input<string>('Duration');
  errorText = input<string>('Please provide a valid duration and unit');
  amountInvalid = input<boolean>(false);
  unitInvalid = input<boolean>(false);
  isInvalid = input<boolean>(false);
}
