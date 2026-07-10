import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  PACKAGING_MATERIAL_OPTIONS,
  PACKAGING_TYPE_OPTIONS,
  UOM_OPTIONS,
} from '../../../utils/dropDownOption';
import { PackagingInfo } from '../../../models/product-models';
import { ProductRegistryStore } from '../../../store/productFormStore';
import { DynamicFormFieldComponent } from '../../../shared/dynamic-form-field/dynamic-form-field';
import { FieldConfig } from '../../../models/field-config';
import { CardComponent } from '../../../shared/card/card';

@Component({
  selector: 'app-packaging',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    DynamicFormFieldComponent,
    CardComponent,
  ],
  templateUrl: './prduct-packaging.html',
  styleUrls: ['./prduct-packaging.css'],
})
export class PackagingComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(ProductRegistryStore);

  form = this.fb.group({
    packagingType: ['', Validators.required],
    packagingMaterial: ['', Validators.required],
    packagingDate: [null, Validators.required],
    packageWeight: [null, [Validators.required, Validators.min(0)]],
    weightUnit: [null, Validators.required],
    packageDimensions: ['', [Validators.required, Validators.maxLength(100)]],
    storageConditions: ['', [Validators.maxLength(500)]],
    packagingRemarks: ['', [Validators.maxLength(500)]],
  });

  fields: FieldConfig[] = [
    {
      name: 'packagingType',
      label: 'Packaging Type',
      type: 'select',
      options: PACKAGING_TYPE_OPTIONS,
    },
    {
      name: 'packagingMaterial',
      label: 'Packaging Material',
      type: 'select',
      options: PACKAGING_MATERIAL_OPTIONS,
    },
    { name: 'packagingDate', label: 'Packaging Date', type: 'date' },
    { name: 'packageWeight', label: 'Package Weight', type: 'number' },
    { name: 'weightUnit', label: 'Weight Unit', type: 'select', options: UOM_OPTIONS },
    { name: 'packageDimensions', label: 'Package Dimensions', type: 'text' },
    { name: 'storageConditions', label: 'Storage Conditions', type: 'textarea' },
    { name: 'packagingRemarks', label: 'Remarks', type: 'textarea' },
  ];

  ngOnInit() {
    this.form.valueChanges.subscribe((value) => {
      this.store.setPackagingValid(this.form.valid);
      if (this.form.valid) {
        this.store.setPackaging(value as PackagingInfo);
      }
    });

    // run once on init in case the form starts valid/invalid
    this.store.setPackagingValid(this.form.valid);
  }
}
