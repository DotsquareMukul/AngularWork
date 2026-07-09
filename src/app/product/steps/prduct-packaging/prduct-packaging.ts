import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  PACKAGING_MATERIAL_OPTIONS,
  PACKAGING_TYPE_OPTIONS,
  UOM_OPTIONS,
} from '../../../utils/dropDownOption';
import { MatCardModule } from '@angular/material/card';
import { PackagingInfo, ProductInfo, RawMaterialInfo } from '../../../models/product-models';
import { ProductRegistryStore } from '../../../store/productFormStore';

@Component({
  selector: 'app-packaging',
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
  templateUrl: './prduct-packaging.html',
  styleUrls: ['./prduct-packaging.scss'],
})
export class PackagingComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(ProductRegistryStore);
  packagingTypes = PACKAGING_TYPE_OPTIONS;

  packagingMaterials = PACKAGING_MATERIAL_OPTIONS;

  weightUnits = UOM_OPTIONS;
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
}
