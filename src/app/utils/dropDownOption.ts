// ==============================================================
// Static seed data for dynamic dropdowns.
// In production these would be fetched from API service files
// (e.g. ProductApiService.getCategories()) the same way
// CustomerStore/OrderStore hydrate lookup data today.
// ==============================================================

import { DropdownOption } from '../models/product-models';

export const DURATION_UNIT_OPTIONS: DropdownOption[] = [
  { value: 'DAYS', label: 'Days' },
  { value: 'WEEKS', label: 'Weeks' },
  { value: 'MONTHS', label: 'Months' },
  { value: 'YEARS', label: 'Years' },
];

export const WEIGHT_UNIT_OPTIONS: DropdownOption[] = [
  { value: 'G', label: 'Grams (g)' },
  { value: 'KG', label: 'Kilograms (kg)' },
  { value: 'LB', label: 'Pounds (lb)' },
  { value: 'OZ', label: 'Ounces (oz)' },
];

export const PRODUCT_CATEGORY_OPTIONS: DropdownOption[] = [
  { value: 'PHARMA', label: 'Pharmaceutical' },
  { value: 'FOOD', label: 'Food & Beverage' },
  { value: 'COSMETIC', label: 'Cosmetic' },
  { value: 'CHEMICAL', label: 'Chemical' },
  { value: 'ELECTRONICS', label: 'Electronics' },
];

export const PRODUCT_TYPE_OPTIONS: DropdownOption[] = [
  { value: 'FINISHED_GOOD', label: 'Finished Good' },
  { value: 'SEMI_FINISHED', label: 'Semi-Finished' },
  { value: 'RAW_MATERIAL', label: 'Raw Material' },
  { value: 'CONSUMABLE', label: 'Consumable' },
];

export const PRODUCT_STATUS_OPTIONS: DropdownOption[] = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'DISCONTINUED', label: 'Discontinued' },
  { value: 'ON_HOLD', label: 'On Hold' },
];

export const SUPPLIER_OPTIONS: DropdownOption[] = [
  { value: 'SUP_001', label: 'Acme Industrial Supplies' },
  { value: 'SUP_002', label: 'Northline Chemicals' },
  { value: 'SUP_003', label: 'Everest Raw Materials Co.' },
  { value: 'SUP_004', label: 'Blue Ridge Packaging Ltd.' },
];

export const MATERIAL_CATEGORY_OPTIONS: DropdownOption[] = [
  { value: 'ACTIVE_INGREDIENT', label: 'Active Ingredient' },
  { value: 'EXCIPIENT', label: 'Excipient' },
  { value: 'PACKAGING_MATERIAL', label: 'Packaging Material' },
  { value: 'ADDITIVE', label: 'Additive' },
];

export const UOM_OPTIONS: DropdownOption[] = [
  { value: 'KG', label: 'Kilograms' },
  { value: 'L', label: 'Litres' },
  { value: 'UNITS', label: 'Units' },
  { value: 'TON', label: 'Tons' },
];

export const MANUFACTURING_PLANT_OPTIONS: DropdownOption[] = [
  { value: 'PLANT_A', label: 'Plant A - Delhi' },
  { value: 'PLANT_B', label: 'Plant B - Pune' },
  { value: 'PLANT_C', label: 'Plant C - Chennai' },
];

export const MANUFACTURING_METHOD_OPTIONS: DropdownOption[] = [
  { value: 'BATCH', label: 'Batch Production' },
  { value: 'CONTINUOUS', label: 'Continuous Production' },
  { value: 'JOB_ORDER', label: 'Job Order' },
];

export const QUALITY_CHECK_STATUS_OPTIONS: DropdownOption[] = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'PASSED', label: 'Passed' },
  { value: 'FAILED', label: 'Failed' },
  { value: 'RE_TEST', label: 'Re-test Required' },
];

export const PACKAGING_TYPE_OPTIONS: DropdownOption[] = [
  { value: 'BOTTLE', label: 'Bottle' },
  { value: 'BLISTER', label: 'Blister Pack' },
  { value: 'CARTON', label: 'Carton' },
  { value: 'POUCH', label: 'Pouch' },
];

export const PACKAGING_MATERIAL_OPTIONS: DropdownOption[] = [
  { value: 'PLASTIC', label: 'Plastic' },
  { value: 'GLASS', label: 'Glass' },
  { value: 'ALUMINIUM', label: 'Aluminium' },
  { value: 'PAPERBOARD', label: 'Paperboard' },
];
export const STORAGE_CONDITION_OPTIONS: DropdownOption[] = [
  { value: 'ROOM_TEMP', label: 'Room Temperature' },
  { value: 'REFRIGERATED', label: 'Refrigerated' },
];
export const PLANT_OPTIONS: DropdownOption[] = [
  { value: 'PLANT_A', label: 'Plant A - Delhi' },
  { value: 'PLANT_B', label: 'Plant B - Pune' },
  { value: 'PLANT_C', label: 'Plant C - Chennai' },
];
