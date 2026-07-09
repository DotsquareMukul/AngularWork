import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManufacture } from './product-manufacture';

describe('ProductManufacture', () => {
  let component: ProductManufacture;
  let fixture: ComponentFixture<ProductManufacture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductManufacture],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductManufacture);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
