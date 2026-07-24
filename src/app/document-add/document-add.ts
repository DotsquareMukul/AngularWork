import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DocumentStore } from '../store/document.store';

@Component({
  selector: 'app-document-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './document-add.html',
  styleUrl: './document-add.css',
})
export class DocumentAddComponent {
  protected store = inject(DocumentStore);

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // --- Add text document form state ---
  newContent = '';
  newSource = '';

  // --- Upload PDF form state ---
  selectedFile: File | null = null;

  newYoutubeUrl = '';

  onAddYoutubeTranscript(): void {
    if (!this.newYoutubeUrl.trim()) return;
    this.store.addYoutubeTranscript(this.newYoutubeUrl.trim());
    this.newYoutubeUrl = '';
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if (file && file.type !== 'application/pdf') {
      this.store.uploadError.set('Only PDF files are supported');
      this.selectedFile = null;
      return;
    }

    this.selectedFile = file;
  }

  triggerFilePicker(): void {
    this.fileInput.nativeElement.click();
  }

  onUploadPdf(): void {
    if (!this.selectedFile) return;
    this.store.uploadPdf(this.selectedFile);
    this.selectedFile = null;
    this.fileInput.nativeElement.value = ''; // allow re-selecting the same file later
  }

  ngOnDestroy() {
    this.store.cleanUploadMessage();
    this.store.cleanYoutubeMessage();
  }
}
