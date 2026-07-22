import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockUpdater } from './stock-updater';

describe('StockUpdater', () => {
  let component: StockUpdater;
  let fixture: ComponentFixture<StockUpdater>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockUpdater],
    }).compileComponents();

    fixture = TestBed.createComponent(StockUpdater);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
