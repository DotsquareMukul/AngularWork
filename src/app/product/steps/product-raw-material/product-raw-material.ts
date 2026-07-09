import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  DURATION_UNIT_OPTIONS,
  PRODUCT_CATEGORY_OPTIONS,
  SUPPLIER_OPTIONS,
  WEIGHT_UNIT_OPTIONS,
} from '../../../utils/dropDownOption';
import { MatCardModule } from '@angular/material/card';
import { ProductRegistryStore } from '../../../store/productFormStore';
import { RawMaterialInfo } from '../../../models/product-models';

type DurationUnit = 'Days' | 'Months' | 'Years';

@Component({
  selector: 'app-raw-material',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
  ],
  templateUrl: './product-raw-material.html',
  styleUrls: ['./product-raw-material.scss'],
})
export class RawMaterialComponent {
  private fb = inject(FormBuilder);
  private store = inject(ProductRegistryStore);
  ngOnInit() {
    this.form.valueChanges.subscribe((value) => {
      this.store.setRawMaterialValid(this.form.valid);
      if (this.form.valid) {
        this.store.setRawMaterial(value as RawMaterialInfo);
      }
    });

    // run once on init in case the form starts valid/invalid
    this.store.setRawMaterialValid(this.form.valid);
  }

  suppliers = SUPPLIER_OPTIONS;

  categories = PRODUCT_CATEGORY_OPTIONS;

  units = WEIGHT_UNIT_OPTIONS;

  durationUnits = DURATION_UNIT_OPTIONS;

  form = this.fb.group({
    rawMaterialName: ['', Validators.required],
    materialCode: ['', Validators.required],
    supplierName: ['', Validators.required],
    materialCategory: ['', Validators.required],
    materialQuantity: [null, [Validators.required, Validators.min(1)]],
    unitOfMeasurement: ['', Validators.required],
    procurementDate: [null, Validators.required],
    shelfLifeDuration: [null, [Validators.required, Validators.min(1)]],
    shelfLifeDurationUnit: [null, Validators.required],
  });
}
