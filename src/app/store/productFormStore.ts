import { Injectable, computed, signal } from '@angular/core';
import {
  ManufacturingInfo,
  PackagingInfo,
  ProductInfo,
  RawMaterialInfo,
} from '../models/product-models';

export interface ProductRegistry {
  product: ProductInfo | null;
  rawMaterial: RawMaterialInfo | null;
  manufacturing: ManufacturingInfo | null;
  packaging: PackagingInfo | null;
}

@Injectable({
  providedIn: 'root',
})
export class ProductRegistryStore {
  private readonly state = signal<ProductRegistry>({
    product: null,
    rawMaterial: null,
    manufacturing: null,
    packaging: null,
  });

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly success = signal(false);

  readonly ProductInfo = computed(() => this.state().product);

  readonly rawMaterial = computed(() => this.state().rawMaterial);

  readonly manufacturing = computed(() => this.state().manufacturing);

  readonly packaging = computed(() => this.state().packaging);

  readonly payload = computed(() => ({
    product: this.ProductInfo(),
    rawMaterial: this.rawMaterial(),
    manufacturing: this.manufacturing(),
    packaging: this.packaging(),
  }));

  readonly canSubmit = computed(() => {
    const state = this.state();

    return !!(state.product && state.rawMaterial && state.manufacturing && state.packaging);
  });
  productInfoValid = signal(false);
  rawMaterialValid = signal(false);
  manufacturingValid = signal(false);
  packagingValid = signal(false);

  readonly productInfoTouchTrigger = signal(0);
  readonly rawMaterialTouchTrigger = signal(0);
  readonly manufacturingTouchTrigger = signal(0);
  readonly packagingTouchTrigger = signal(0);

  private get touchTriggers() {
    return [
      this.productInfoTouchTrigger,
      this.rawMaterialTouchTrigger,
      this.manufacturingTouchTrigger,
      this.packagingTouchTrigger,
      // no 5th entry needed since Review has no form to touch
    ];
  }

  touchStep(index: number) {
    const trigger = this.touchTriggers[index];
    trigger?.update((v) => v + 1); // e.g. productInfoTouchTrigger: 0 → 1
  }

  setProductInfoValid(valid: boolean) {
    this.productInfoValid.set(valid);
  }
  setRawMaterialValid(valid: boolean) {
    this.rawMaterialValid.set(valid);
  }
  setManufacturingValid(valid: boolean) {
    this.manufacturingValid.set(valid);
  }
  setPackagingValid(valid: boolean) {
    this.packagingValid.set(valid);
  }

  // computed array indexed by step order
  stepValidity = computed(() => [
    this.productInfoValid(),
    this.rawMaterialValid(),
    this.manufacturingValid(),
    this.packagingValid(),
  ]);

  // must be a getter (or moved into the constructor), NOT a plain class field —
  // see explanation below for why field order matters here

  setProductInfo(product: ProductInfo) {
    this.state.update((state) => ({
      ...state,
      product,
    }));
  }

  setRawMaterial(rawMaterial: RawMaterialInfo) {
    this.state.update((state) => ({
      ...state,
      rawMaterial,
    }));
  }

  setManufacturing(manufacturing: ManufacturingInfo) {
    this.state.update((state) => ({
      ...state,
      manufacturing,
    }));
  }

  setPackaging(packaging: PackagingInfo) {
    this.state.update((state) => ({
      ...state,
      packaging,
    }));
  }

  reset() {
    this.state.set({
      product: null,
      rawMaterial: null,
      manufacturing: null,
      packaging: null,
    });

    this.loading.set(false);
    this.error.set(null);
    this.success.set(false);
  }

  async submit() {
    if (!this.canSubmit()) {
      this.error.set('Please complete all sections.');
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.success.set(false);

    try {
      const payload = this.payload();

      console.log('Submitting...', payload);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      this.success.set(true);
    } catch {
      this.error.set('Something went wrong while submitting.');
    } finally {
      this.loading.set(false);
    }
  }
}
