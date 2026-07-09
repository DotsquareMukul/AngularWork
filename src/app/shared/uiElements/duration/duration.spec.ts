import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DurationFieldComponent } from './duration';
describe('DurationFieldComponent', () => {
  let component: DurationFieldComponent;
  let fixture: ComponentFixture<DurationFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DurationFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DurationFieldComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
