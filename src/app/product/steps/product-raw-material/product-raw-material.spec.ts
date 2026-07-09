import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRawMaterial } from './product-raw-material';

describe('ProductRawMaterial', () => {
  let component: ProductRawMaterial;
  let fixture: ComponentFixture<ProductRawMaterial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductRawMaterial],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductRawMaterial);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
