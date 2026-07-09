import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DropdownOption } from '../models/product-models';
import {
  PRODUCT_CATEGORY_OPTIONS,
  DURATION_UNIT_OPTIONS,
  MANUFACTURING_METHOD_OPTIONS,
  MANUFACTURING_PLANT_OPTIONS,
  MATERIAL_CATEGORY_OPTIONS,
  PACKAGING_MATERIAL_OPTIONS,
  PACKAGING_TYPE_OPTIONS,
  PRODUCT_STATUS_OPTIONS,
  PRODUCT_TYPE_OPTIONS,
  QUALITY_CHECK_STATUS_OPTIONS,
  SUPPLIER_OPTIONS,
  UOM_OPTIONS,
  WEIGHT_UNIT_OPTIONS,
} from '../utils/dropDownOption';

/**
 * Simulates a backend-driven lookup/dropdown API.
 * Swap the `of(...).pipe(delay(...))` calls for real HTTP calls
 * (via an ApiService like the rest of the app's API_URLS pattern)
 * without touching any consuming component.
 */
@Injectable({ providedIn: 'root' })
export class DropdownDataService {
  private readonly simulatedLatencyMs = 250;

  getProductCategories(): Observable<DropdownOption[]> {
    return of(PRODUCT_CATEGORY_OPTIONS).pipe(delay(this.simulatedLatencyMs));
  }

  getProductTypes(): Observable<DropdownOption[]> {
    return of(PRODUCT_TYPE_OPTIONS).pipe(delay(this.simulatedLatencyMs));
  }

  getProductStatuses(): Observable<DropdownOption[]> {
    return of(PRODUCT_STATUS_OPTIONS).pipe(delay(this.simulatedLatencyMs));
  }

  getSuppliers(): Observable<DropdownOption[]> {
    return of(SUPPLIER_OPTIONS).pipe(delay(this.simulatedLatencyMs));
  }

  getMaterialCategories(): Observable<DropdownOption[]> {
    return of(MATERIAL_CATEGORY_OPTIONS).pipe(delay(this.simulatedLatencyMs));
  }

  getUnitsOfMeasurement(): Observable<DropdownOption[]> {
    return of(UOM_OPTIONS).pipe(delay(this.simulatedLatencyMs));
  }

  getManufacturingPlants(): Observable<DropdownOption[]> {
    return of(MANUFACTURING_PLANT_OPTIONS).pipe(delay(this.simulatedLatencyMs));
  }

  getManufacturingMethods(): Observable<DropdownOption[]> {
    return of(MANUFACTURING_METHOD_OPTIONS).pipe(delay(this.simulatedLatencyMs));
  }

  getQualityCheckStatuses(): Observable<DropdownOption[]> {
    return of(QUALITY_CHECK_STATUS_OPTIONS).pipe(delay(this.simulatedLatencyMs));
  }

  getPackagingTypes(): Observable<DropdownOption[]> {
    return of(PACKAGING_TYPE_OPTIONS).pipe(delay(this.simulatedLatencyMs));
  }

  getPackagingMaterials(): Observable<DropdownOption[]> {
    return of(PACKAGING_MATERIAL_OPTIONS).pipe(delay(this.simulatedLatencyMs));
  }

  getDurationUnits(): Observable<DropdownOption[]> {
    return of(DURATION_UNIT_OPTIONS).pipe(delay(this.simulatedLatencyMs));
  }

  getWeightUnits(): Observable<DropdownOption[]> {
    return of(WEIGHT_UNIT_OPTIONS).pipe(delay(this.simulatedLatencyMs));
  }
}
