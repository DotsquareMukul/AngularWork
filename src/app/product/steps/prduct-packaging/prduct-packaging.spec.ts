import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrductPackaging } from './prduct-packaging';

describe('PrductPackaging', () => {
  let component: PrductPackaging;
  let fixture: ComponentFixture<PrductPackaging>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrductPackaging],
    }).compileComponents();

    fixture = TestBed.createComponent(PrductPackaging);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
