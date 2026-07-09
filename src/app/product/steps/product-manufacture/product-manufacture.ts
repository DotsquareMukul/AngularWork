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
  MANUFACTURING_METHOD_OPTIONS,
  PLANT_OPTIONS,
  QUALITY_CHECK_STATUS_OPTIONS,
} from '../../../utils/dropDownOption';
import { MatCardModule } from '@angular/material/card';
import { ManufacturingInfo, PackagingInfo } from '../../../models/product-models';
import { ProductRegistryStore } from '../../../store/productFormStore';

@Component({
  selector: 'app-manufacturing',
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
  templateUrl: './product-manufacture.html',
  styleUrls: ['./product-manufacture.scss'],
})
export class ProductManufacturingComponent {
  private fb = inject(FormBuilder);
  private store = inject(ProductRegistryStore);
  ngOnInit() {
    this.form.valueChanges.subscribe((value) => {
      this.store.setManufacturingValid(this.form.valid);
      if (this.form.valid) {
        this.store.setManufacturing(value as ManufacturingInfo);
      }
    });

    // run once on init in case the form starts valid/invalid
    this.store.setManufacturingValid(this.form.valid);
  }

  plants = PLANT_OPTIONS;

  methods = MANUFACTURING_METHOD_OPTIONS;

  qualityStatuses = QUALITY_CHECK_STATUS_OPTIONS;

  durationUnits = DURATION_UNIT_OPTIONS;

  form = this.fb.group({
    manufacturingPlant: ['', Validators.required],
    batchNumber: ['', Validators.required],
    manufacturingDate: [null, Validators.required],
    expiryDate: [null, Validators.required],
    productionDuration: [null, [Validators.required, Validators.min(1)]],
    productionDurationUnit: [null, Validators.required],
    manufacturingMethod: ['', Validators.required],
    qualityCheckStatus: ['', Validators.required],
    manufacturingNotes: ['', Validators.maxLength(500)],
  });
}
