import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormField } from './dynamic-form-field';

describe('DynamicFormField', () => {
  let component: DynamicFormField;
  let fixture: ComponentFixture<DynamicFormField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormField],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
