// document-query/document-query.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DocumentStore } from '../store/document.store';

@Component({
  selector: 'app-document-query',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './document-query.html',
  styleUrl: './document-query.css',
})
export class DocumentQueryComponent {
  protected store = inject(DocumentStore);

  queryText = '';
  querySource = '';

  onQuery(): void {
    if (!this.queryText.trim() || !this.querySource.trim()) return;
    this.store.queryDocuments(this.queryText.trim(), this.querySource.trim());
    this.queryText = '';
  }
}
