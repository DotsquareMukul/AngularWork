import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerFieldComponent } from './date-picker';

describe('DatePickerFieldComponent', () => {
  let component: DatePickerFieldComponent;
  let fixture: ComponentFixture<DatePickerFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatePickerFieldComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
