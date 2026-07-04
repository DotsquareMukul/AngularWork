import { Injectable, signal } from '@angular/core';
import { Product, PRODUCTS } from '../utils/MockData';

@Injectable({ providedIn: 'root' })
export class ProductStore {
  products = signal<Product[]>([]);

  loadProducts() {
    this.products.set(PRODUCTS);
  }

  getProductById(id: number): Product | undefined {
    return this.products().find((p) => p.id === id);
  }
}
