// ==============================
// Product Form - Domain Models
// ==============================

export type DurationUnit = 'DAYS' | 'WEEKS' | 'MONTHS' | 'YEARS';
export type WeightUnit = 'G' | 'KG' | 'LB' | 'OZ';

export interface ProductInfo {
  productName: string;
  productCode: string;
  productCategory: string;
  productType: string;
  productDescription: string;
  launchDate: string | null; // ISO date string
  productDuration: number | null;
  productDurationUnit: DurationUnit | null;
  productStatus: string;
}

export interface RawMaterialInfo {
  rawMaterialName: string;
  materialCode: string;
  supplierName: string;
  materialCategory: string;
  materialQuantity: number | null;
  unitOfMeasurement: string;
  procurementDate: string | null;
  shelfLifeDuration: number | null;
  shelfLifeDurationUnit: DurationUnit | null;
}

export interface ManufacturingInfo {
  manufacturingPlant: string;
  batchNumber: string;
  manufacturingDate: string | null;
  expiryDate: string | null;
  productionDuration: number | null;
  productionDurationUnit: DurationUnit | null;
  manufacturingMethod: string;
  qualityCheckStatus: string;
  manufacturingNotes: string;
}

export interface PackagingInfo {
  packagingType: string;
  packagingMaterial: string;
  packagingDate: string | null;
  packageWeight: number | null;
  weightUnit: WeightUnit | null;
  packageDimensions: string;
  storageConditions: string;
  packagingRemarks: string;
}

export interface ProductFormValue {
  productInfo: ProductInfo;
  rawMaterialInfo: RawMaterialInfo;
  manufacturingInfo: ManufacturingInfo;
  packagingInfo: PackagingInfo;
}

export type FormStepKey = 'productInfo' | 'rawMaterialInfo' | 'manufacturingInfo' | 'packagingInfo';

export interface StepDefinition {
  key: FormStepKey;
  label: string;
  icon: string;
}

export const FORM_STEPS: StepDefinition[] = [
  { key: 'productInfo', label: 'Product Information', icon: 'inventory_2' },
  { key: 'rawMaterialInfo', label: 'Raw Material Information', icon: 'science' },
  { key: 'manufacturingInfo', label: 'Manufacturing Information', icon: 'precision_manufacturing' },
  { key: 'packagingInfo', label: 'Packaging Information', icon: 'inventory' },
];

export interface DropdownOption {
  value: string;
  label: string;
}

/** Discriminates whether a save action is a draft or a final submission. */
export type SaveMode = 'draft' | 'submit';
