import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  PRODUCT_CATEGORY_OPTIONS,
  PRODUCT_TYPE_OPTIONS,
  DURATION_UNIT_OPTIONS,
  PRODUCT_STATUS_OPTIONS,
} from '../../../utils/dropDownOption';
import { PackagingInfo, ProductInfo } from '../../../models/product-models';
import { ProductRegistryStore } from '../../../store/productFormStore';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './product-info.html',
  styleUrls: ['./product-info.scss'],
})
export class ProductInfoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(ProductRegistryStore);

  categories = PRODUCT_CATEGORY_OPTIONS;

  productTypes = PRODUCT_TYPE_OPTIONS;

  durationUnits = DURATION_UNIT_OPTIONS;

  statuses = PRODUCT_STATUS_OPTIONS;
  ngOnInit() {
    this.form.valueChanges.subscribe((value) => {
      this.store.setProductInfoValid(this.form.valid);
      if (this.form.valid) {
        this.store.setProduct(value as ProductInfo);
      }
    });

    // run once on init in case the form starts valid/invalid
    this.store.setProductInfoValid(this.form.valid);
  }

  form = this.fb.group({
    productName: ['', [Validators.required, Validators.maxLength(100)]],
    productCode: ['', [Validators.required, Validators.maxLength(20)]],
    productCategory: ['', Validators.required],
    productType: ['', Validators.required],
    productDescription: ['', Validators.maxLength(500)],
    launchDate: ['', Validators.required],
    productDuration: [null, Validators.required],
    productDurationUnit: ['', Validators.required],
    productStatus: ['Draft', Validators.required],
  });
}
