import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentAdd } from './document-add';

describe('DocumentAdd', () => {
  let component: DocumentAdd;
  let fixture: ComponentFixture<DocumentAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
