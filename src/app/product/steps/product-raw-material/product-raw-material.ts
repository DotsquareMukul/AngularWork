import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  DURATION_UNIT_OPTIONS,
  PRODUCT_CATEGORY_OPTIONS,
  SUPPLIER_OPTIONS,
  WEIGHT_UNIT_OPTIONS,
} from '../../../utils/dropDownOption';
import { ProductRegistryStore } from '../../../store/productFormStore';
import { RawMaterialInfo } from '../../../models/product-models';
import { DynamicFormFieldComponent } from '../../../shared/dynamic-form-field/dynamic-form-field';
import { FieldConfig } from '../../../models/field-config';
import { CardComponent } from '../../../shared/card/card';

@Component({
  selector: 'app-raw-material',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    DynamicFormFieldComponent,
    CardComponent,
  ],
  templateUrl: './product-raw-material.html',
  styleUrls: ['./product-raw-material.css'],
})
export class RawMaterialComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(ProductRegistryStore);
  constructor() {
    effect(() => {
      const trigger = this.store.rawMaterialTouchTrigger();
      console.log('effect fired, trigger value:', trigger);
      if (trigger > 0) {
        this.form.markAllAsTouched();
      }
    });
  }

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

  fields: FieldConfig[] = [
    { name: 'rawMaterialName', label: 'Raw Material Name', type: 'text' },
    { name: 'materialCode', label: 'Material Code', type: 'text' },
    { name: 'supplierName', label: 'Supplier Name', type: 'select', options: SUPPLIER_OPTIONS },
    {
      name: 'materialCategory',
      label: 'Material Category',
      type: 'select',
      options: PRODUCT_CATEGORY_OPTIONS,
    },
    { name: 'materialQuantity', label: 'Material Quantity', type: 'number' },
    {
      name: 'unitOfMeasurement',
      label: 'Unit of Measurement',
      type: 'select',
      options: WEIGHT_UNIT_OPTIONS,
    },
    { name: 'procurementDate', label: 'Procurement Date', type: 'date' },
    { name: 'shelfLifeDuration', label: 'Shelf Life Duration', type: 'number' },
    {
      name: 'shelfLifeDurationUnit',
      label: 'Shelf Life Unit',
      type: 'select',
      options: DURATION_UNIT_OPTIONS,
    },
  ];

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
}
