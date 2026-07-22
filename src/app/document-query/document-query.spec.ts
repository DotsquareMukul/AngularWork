import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentQuery } from './document-query';

describe('DocumentQuery', () => {
  let component: DocumentQuery;
  let fixture: ComponentFixture<DocumentQuery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentQuery],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentQuery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
