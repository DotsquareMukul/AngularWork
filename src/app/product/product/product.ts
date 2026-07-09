import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { StepItem, StepperComponent } from '../../shared/stepper/stepper';
import { ProductInfoComponent } from '../steps/product-info/product-info';
import { ProductManufacturingComponent } from '../steps/product-manufacture/product-manufacture';
import { RawMaterialComponent } from '../steps/product-raw-material/product-raw-material';
import { PackagingComponent } from '../steps/prduct-packaging/prduct-packaging';
import { ProductRegistryStore } from '../../store/productFormStore';
import { ReviewComponent } from '../steps/review-component/review-component';

@Component({
  selector: 'app-product-registry',
  standalone: true,
  imports: [CommonModule, MatStepperModule, StepperComponent],
  templateUrl: './product.html',
  styleUrls: ['./product.scss'],
})
export class ProductRegistryComponent {
  readonly store = inject(ProductRegistryStore);
  selectedIndex = 0;

  steps: StepItem[] = [
    {
      label: 'Product',
      component: ProductInfoComponent,
    },
    {
      label: 'Raw Material',
      component: RawMaterialComponent,
    },
    {
      label: 'Manufacturing',
      component: ProductManufacturingComponent,
    },
    {
      label: 'Packaging',
      component: PackagingComponent,
    },
    {
      label: 'Review',
      component: ReviewComponent,
    },
  ];

  handleStepNext() {
    const currentIndex = this.selectedIndex;
    const isValid = this.store.stepValidity()[currentIndex];
    console.log(`Step ${currentIndex} is valid:`, isValid);
    if (!isValid) {
      return;
    }

    const isLastStep = currentIndex === this.steps.length - 1;

    if (isLastStep) {
      this.handleSubmit();
      return;
    }

    this.selectedIndex = currentIndex + 1;
  }

  private handleSubmit() {
    const allValid = this.store.stepValidity().every((valid) => valid);

    if (!allValid) {
      return;
    }

    const payload = {
      ...this.store.product(),
      ...this.store.rawMaterial(),
      ...this.store.manufacturing(),
      ...this.store.packaging(),
    };

    // call your API service here, e.g.:
    // this.productService.createProduct(payload).subscribe(...)
    console.log('Submitting product registry:', payload);
  }

  handleStepPrevious() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    }
  }
}
