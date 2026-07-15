// components/chat/chat.component.ts
import { Component, inject, signal, ElementRef, viewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChatStore } from '../store/chat';

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
  ],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css'],
})
export class ChatComponent {
  private store = inject(ChatStore);
  private scrollAnchor = viewChild<ElementRef<HTMLDivElement>>('scrollAnchor');

  messages = this.store.messages;
  isStreaming = this.store.isStreaming;
  draft = signal('');

  constructor() {
    // auto-scroll to bottom whenever messages change (including mid-stream updates)
    effect(() => {
      this.messages(); // read to register dependency
      queueMicrotask(() => {
        this.scrollAnchor()?.nativeElement.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  send() {
    const text = this.draft().trim();
    if (!text || this.isStreaming()) return;

    this.store.sendMessage(text);
    this.draft.set('');
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }
}
