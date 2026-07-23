// components/chat/chat.component.ts
import { Component, inject, signal, ElementRef, viewChild, effect, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChatStore } from '../store/chat';
import { DocumentStore } from '../store/document.store';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css'],
})
export class ChatComponent {
  protected store = inject(ChatStore);
  private scrollAnchor = viewChild<ElementRef<HTMLDivElement>>('scrollAnchor');

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  messages = this.store.messages;
  isStreaming = this.store.isStreaming;
  draft = signal('');

  selectedFile: File | null = null;

  constructor() {
    // auto-scroll to bottom whenever messages change (including mid-stream updates)
    effect(() => {
      this.messages(); // read to register dependency
      queueMicrotask(() => {
        this.scrollAnchor()?.nativeElement.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  canSend(): boolean {
    return !!this.draft().trim();
  }

  isBusy(): boolean {
    return this.isStreaming();
  }

  send() {
    if (this.isBusy() || !this.canSend()) return;

    const text = this.draft().trim();

    if (text) {
      this.store.sendMessage(text);
      this.draft.set('');
    }
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.store.uploadPdf(file);
    }
  }

  triggerFilePicker(): void {
    this.fileInput.nativeElement.click();
  }
}
