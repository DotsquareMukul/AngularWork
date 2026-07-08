import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialuge } from './confirm-dialuge';

describe('ConfirmDialuge', () => {
  let component: ConfirmDialuge;
  let fixture: ComponentFixture<ConfirmDialuge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialuge],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialuge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
