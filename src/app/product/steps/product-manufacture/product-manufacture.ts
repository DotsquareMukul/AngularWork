import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  DURATION_UNIT_OPTIONS,
  MANUFACTURING_METHOD_OPTIONS,
  PLANT_OPTIONS,
  QUALITY_CHECK_STATUS_OPTIONS,
} from '../../../utils/dropDownOption';
import { ManufacturingInfo } from '../../../models/product-models';
import { ProductRegistryStore } from '../../../store/productFormStore';
import { DynamicFormFieldComponent } from '../../../shared/dynamic-form-field/dynamic-form-field';
import { FieldConfig } from '../../../models/field-config';
import { CardComponent } from '../../../shared/card/card';

@Component({
  selector: 'app-manufacturing',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    DynamicFormFieldComponent,
    CardComponent,
  ],
  templateUrl: './product-manufacture.html',
  styleUrls: ['./product-manufacture.css'],
})
export class ProductManufacturingComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(ProductRegistryStore);

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

  fields: FieldConfig[] = [
    {
      name: 'manufacturingPlant',
      label: 'Manufacturing Plant',
      type: 'select',
      options: PLANT_OPTIONS,
    },
    { name: 'batchNumber', label: 'Batch Number', type: 'text' },
    { name: 'manufacturingDate', label: 'Manufacturing Date', type: 'date' },
    { name: 'expiryDate', label: 'Expiry Date', type: 'date' },
    { name: 'productionDuration', label: 'Production Duration', type: 'number' },
    {
      name: 'productionDurationUnit',
      label: 'Duration Unit',
      type: 'select',
      options: DURATION_UNIT_OPTIONS,
    },
    {
      name: 'manufacturingMethod',
      label: 'Manufacturing Method',
      type: 'select',
      options: MANUFACTURING_METHOD_OPTIONS,
    },
    {
      name: 'qualityCheckStatus',
      label: 'Quality Check Status',
      type: 'select',
      options: QUALITY_CHECK_STATUS_OPTIONS,
    },
    { name: 'manufacturingNotes', label: 'Notes', type: 'textarea' },
  ];

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
}
