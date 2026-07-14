import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ProductRegistryStore } from '../../../store/productFormStore';
import { MatButtonModule } from '@angular/material/button';

interface ReviewRow {
  label: string;
  value: string | number | null | undefined;
}

interface ReviewSection {
  title: string;
  rows: ReviewRow[];
}

@Component({
  selector: 'app-review-component',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatButtonModule],
  templateUrl: './review-component.html',
  styleUrl: './review-component.css',
})
export class ReviewComponent {
  private store = inject(ProductRegistryStore);

  productInfo = this.store.ProductInfo;
  rawMaterial = this.store.rawMaterial;
  manufacturing = this.store.manufacturing;
  packaging = this.store.packaging;

  sections = computed<ReviewSection[]>(() => {
    const product = this.productInfo();
    const material = this.rawMaterial();
    const mfg = this.manufacturing();
    const pack = this.packaging();

    return [
      {
        title: 'Product Information',
        rows: [
          { label: 'Product Name', value: product?.productName },
          { label: 'Product Code', value: product?.productCode },
          { label: 'Category', value: product?.productCategory },
          { label: 'Type', value: product?.productType },
          { label: 'Description', value: product?.productDescription },
          { label: 'Launch Date', value: product?.launchDate },
          {
            label: 'Duration',
            value: this.formatDuration(product?.productDuration, product?.productDurationUnit),
          },
          { label: 'Status', value: product?.productStatus },
        ],
      },
      {
        title: 'Raw Material',
        rows: [
          { label: 'Raw Material Name', value: material?.rawMaterialName },
          { label: 'Material Code', value: material?.materialCode },
          { label: 'Supplier Name', value: material?.supplierName },
          { label: 'Material Category', value: material?.materialCategory },
          {
            label: 'Material Quantity',
            value: this.formatDuration(material?.materialQuantity, material?.unitOfMeasurement),
          },
          { label: 'Procurement Date', value: material?.procurementDate },
          {
            label: 'Shelf Life',
            value: this.formatDuration(
              material?.shelfLifeDuration,
              material?.shelfLifeDurationUnit,
            ),
          },
        ],
      },
      {
        title: 'Manufacturing',
        rows: [
          { label: 'Manufacturing Plant', value: mfg?.manufacturingPlant },
          { label: 'Batch Number', value: mfg?.batchNumber },
          { label: 'Manufacturing Date', value: mfg?.manufacturingDate },
          { label: 'Expiry Date', value: mfg?.expiryDate },
          {
            label: 'Production Duration',
            value: this.formatDuration(mfg?.productionDuration, mfg?.productionDurationUnit),
          },
          { label: 'Manufacturing Method', value: mfg?.manufacturingMethod },
          { label: 'Quality Check Status', value: mfg?.qualityCheckStatus },
          { label: 'Notes', value: mfg?.manufacturingNotes },
        ],
      },
      {
        title: 'Packaging',
        rows: [
          { label: 'Packaging Type', value: pack?.packagingType },
          { label: 'Packaging Material', value: pack?.packagingMaterial },
          { label: 'Packaging Date', value: pack?.packagingDate },
          {
            label: 'Package Weight',
            value: this.formatDuration(pack?.packageWeight, pack?.weightUnit),
          },
          { label: 'Package Dimensions', value: pack?.packageDimensions },
          { label: 'Storage Conditions', value: pack?.storageConditions },
          { label: 'Remarks', value: pack?.packagingRemarks },
        ],
      },
    ];
  });

  private formatDuration(
    value: number | null | undefined,
    unit: string | null | undefined,
  ): string | null {
    if (value == null) return null;
    return unit ? `${value} ${unit}` : `${value}`;
  }
  handleSubmit() {
    const allValid = this.store.stepValidity().every((valid) => valid);
    console.log('All steps valid:', allValid);

    if (!allValid) {
      return;
    }

    const payload = {
      product: this.store.ProductInfo(),
      rawMaterial: this.store.rawMaterial(),
      manufacturing: this.store.manufacturing(),
      packaging: this.store.packaging(),
    };

    // call your API service here, e.g.:
    // this.productService.createProduct(payload).subscribe(...)
    console.log('Submitting product registry:', payload);
  }
}
