// store/document.store.ts
import { Injectable, inject, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { DocumentQaEntry } from '../models/document.model';
import { DocumentService } from '../service/document';

@Injectable({ providedIn: 'root' })
export class DocumentStore {
  private documentService = inject(DocumentService);

  // --- Add text document state ---
  readonly isAdding = signal(false);
  readonly addError = signal<string | null>(null);
  readonly addSuccessMessage = signal<string | null>(null);

  // --- Upload PDF state ---
  readonly isUploading = signal(false);
  readonly uploadError = signal<string | null>(null);
  readonly uploadSuccessMessage = signal<string | null>(null);

  // --- YouTube transcript state ---
  readonly isAddingYoutube = signal(false);
  readonly youtubeError = signal<string | null>(null);
  readonly youtubeSuccessMessage = signal<string | null>(null);

  // --- Query state ---
  readonly qaHistory = signal<DocumentQaEntry[]>([]);
  readonly isQuerying = signal(false);

  addDocument(content: string, source: string) {
    this.isAdding.set(true);
    this.addError.set(null);
    this.addSuccessMessage.set(null);

    this.documentService.addDocument({ content, metadata: { source } }).subscribe({
      next: (res) => {
        this.addSuccessMessage.set(`${res.message} (${res.chunks_added} chunks added)`);
        this.isAdding.set(false);
      },
      error: (err) => {
        this.addError.set(err?.error?.detail ?? 'Failed to add document');
        this.isAdding.set(false);
      },
    });
  }

  uploadPdf(file: File) {
    this.isUploading.set(true);
    this.uploadError.set(null);
    this.uploadSuccessMessage.set(null);

    this.documentService.uploadPdf(file).subscribe({
      next: (res) => {
        this.uploadSuccessMessage.set(`${res.filename}: ${res.chunks_added} chunks added`);
        this.isUploading.set(false);
        setTimeout(() => this.uploadSuccessMessage.set(null), 3000);
      },
      error: (err) => {
        this.uploadError.set(err?.error?.detail ?? 'Failed to upload PDF');
        this.isUploading.set(false);
        setTimeout(() => this.uploadError.set(null), 3000);
      },
    });
  }

  addYoutubeTranscript(url: string) {
    this.isAddingYoutube.set(true);
    this.youtubeError.set(null);
    this.youtubeSuccessMessage.set(null);

    this.documentService.addYoutubeTranscript({ url }).subscribe({
      next: (res) => {
        this.youtubeSuccessMessage.set(
          `${res.message} (video ${res.video_id}, ${res.documnet_store} chunks stored)`,
        );
        this.isAddingYoutube.set(false);
        setTimeout(() => this.youtubeSuccessMessage.set(null), 3000);
      },
      error: (err) => {
        this.youtubeError.set(err?.error?.detail ?? 'Failed to process YouTube transcript');
        this.isAddingYoutube.set(false);
        setTimeout(() => this.youtubeError.set(null), 3000);
      },
    });
  }

  queryDocuments(query: string, source: string) {
    const entryId = uuidv4();
    const pendingEntry: DocumentQaEntry = {
      id: entryId,
      query,
      answer: '',
      source,
      loading: true,
      error: null,
    };

    this.qaHistory.update((entries) => [pendingEntry, ...entries]);
    this.isQuerying.set(true);

    this.documentService.queryDocuments({ query, source }).subscribe({
      next: (res) => {
        this.updateEntry(entryId, { answer: res.answer, loading: false });
        this.isQuerying.set(false);
      },
      error: (err) => {
        this.updateEntry(entryId, {
          error: err?.error?.detail ?? 'Query failed',
          loading: false,
        });
        this.isQuerying.set(false);
      },
    });
  }

  private updateEntry(id: string, patch: Partial<DocumentQaEntry>) {
    this.qaHistory.update((entries) => entries.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }
}
