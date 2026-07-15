import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Observerable } from './observerable';

describe('Observerable', () => {
  let component: Observerable;
  let fixture: ComponentFixture<Observerable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Observerable],
    }).compileComponents();

    fixture = TestBed.createComponent(Observerable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
