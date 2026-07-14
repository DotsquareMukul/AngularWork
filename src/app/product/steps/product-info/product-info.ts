import { Component, effect, inject, OnInit } from '@angular/core';
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
import { ProductInfo } from '../../../models/product-models';
import { ProductRegistryStore } from '../../../store/productFormStore';
import { FieldConfig } from '../../../models/field-config';
import { DynamicFormFieldComponent } from '../../../shared/dynamic-form-field/dynamic-form-field';
import { CardComponent } from '../../../shared/card/card';

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
    DynamicFormFieldComponent,
    CardComponent,
  ],
  templateUrl: './product-info.html',
  styleUrls: ['./product-info.css'],
})
export class ProductInfoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(ProductRegistryStore);
  constructor() {
    effect(() => {
      const trigger = this.store.productInfoTouchTrigger();
      console.log('effect fired, trigger value:', trigger);
      if (trigger > 0) {
        console.log(
          'markAllAsTouched called, productName touched:',
          this.form.get('productName')?.touched,
        );
        this.form.markAllAsTouched();
        console.log(
          'markAllAsTouched called, productName touched:',
          this.form.get('productName')?.touched,
        );
      }
    });
  }

  fields: FieldConfig[] = [
    { name: 'productName', label: 'Product Name', type: 'text' },
    { name: 'productCode', label: 'Product Code', type: 'text' },
    {
      name: 'productCategory',
      label: 'Category',
      type: 'select',
      options: PRODUCT_CATEGORY_OPTIONS,
    },
    { name: 'productType', label: 'Product Type', type: 'select', options: PRODUCT_TYPE_OPTIONS },
    { name: 'productDescription', label: 'Description', type: 'textarea' },
    { name: 'launchDate', label: 'Launch Date', type: 'date' },
    { name: 'productStatus', label: 'Status', type: 'select', options: PRODUCT_STATUS_OPTIONS },
    {
      name: 'productDuration',
      label: 'Duration',
      type: 'number',
    },
    {
      name: 'productDurationUnit',
      label: 'Duration Unit',
      type: 'select',
      options: DURATION_UNIT_OPTIONS,
    },
  ];
  ngOnInit() {
    this.form.valueChanges.subscribe((value) => {
      this.store.setProductInfoValid(this.form.valid);
      if (this.form.valid) {
        this.store.setProductInfo(value as ProductInfo);
      }
    });

    console.log('Initial form validity:', this.form.valid); // TEMP
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
