export type FieldType = 'text' | 'number' | 'select' | 'date' | 'textarea';

export interface SelectOption {
  label: string;
  value: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  options?: SelectOption[]; // required when type === 'select'
  maxLength?: number;
  placeholder?: string;
  textError?: string;
  invalid?: boolean | undefined;
}
