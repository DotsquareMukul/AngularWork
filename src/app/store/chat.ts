// store/chat.store.ts
import { Injectable, signal, inject, DestroyRef } from '@angular/core';
import { scan, tap } from 'rxjs';
import { ChatService } from '../service/chat';
import { ChatChunk, ChatMessage } from '../models/chat.model';

@Injectable({ providedIn: 'root' })
export class ChatStore {
  private chatService = inject(ChatService);

  readonly messages = signal<ChatMessage[]>([]);
  readonly isStreaming = signal(false);

  sendMessage(prompt: string) {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: prompt,
      streaming: false,
    };

    const assistantId = crypto.randomUUID();
    const assistantMessage: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      streaming: true,
    };

    this.messages.update((msgs) => [...msgs, userMessage, assistantMessage]);
    this.isStreaming.set(true);

    this.chatService
      .sendMessage(prompt, assistantId)
      .pipe(
        // accumulate chunk text into a running string
        scan((acc: string, chunk: ChatChunk) => acc + chunk.text, ''),
        tap((accumulatedText) => {
          this.updateMessageContent(assistantId, accumulatedText);
        }),
      )
      .subscribe({
        complete: () => {
          this.finalizeMessage(assistantId);
        },
        error: () => {
          this.updateMessageContent(assistantId, '[Error receiving response]');
          this.finalizeMessage(assistantId);
        },
      });
  }

  private updateMessageContent(id: string, content: string) {
    this.messages.update((msgs) => msgs.map((m) => (m.id === id ? { ...m, content } : m)));
  }

  private finalizeMessage(id: string) {
    this.messages.update((msgs) => msgs.map((m) => (m.id === id ? { ...m, streaming: false } : m)));
    this.isStreaming.set(false);
  }
}
