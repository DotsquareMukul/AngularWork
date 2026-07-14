// shared/dynamic-form-field/dynamic-form-field.component.ts
import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FieldConfig } from '../../models/field-config';
import { DatePickerFieldComponent } from '../uiElements/date-picker/date-picker';
import { TextInputComponent } from '../uiElements/input/input';
import { SelectFieldComponent } from '../uiElements/drop-down/drop-down';

@Component({
  selector: 'app-dynamic-form-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DatePickerFieldComponent,
    TextInputComponent,
    SelectFieldComponent,
  ],
  // Pulls the parent's FormGroup instead of needing [formGroup] passed in manually
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  templateUrl: './dynamic-form-field.html',
})
export class DynamicFormFieldComponent {
  @Input({ required: true }) field!: FieldConfig;
  private controlContainer = inject(ControlContainer);

  get isInvalid(): boolean {
    const control = this.controlContainer.control?.get(this.field.name);
    return !!(control?.invalid && (control?.touched || control?.dirty));
  }
}
