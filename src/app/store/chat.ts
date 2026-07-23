// store/chat.store.ts
import { Injectable, signal, inject } from '@angular/core';
import { scan, tap } from 'rxjs';
import { ChatService } from '../service/chat';
import { ChatChunk, ChatMessage } from '../models/chat.model';
import { v4 as uuidv4 } from 'uuid';

interface FileRef {
  file_id: string;
  mime_type: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class ChatStore {
  private chatService = inject(ChatService);

  readonly messages = signal<ChatMessage[]>([]);
  readonly isStreaming = signal(false);

  // Track the currently attached PDF (if any) and upload state separately
  // from message streaming, so UI can show "uploading..." independently.
  readonly attachedFile = signal<FileRef | null>(null);
  readonly isUploadingFile = signal(false);

  async uploadPdf(file: File) {
    this.isUploadingFile.set(true);
    try {
      const result = await this.chatService.uploadPdf(file);
      this.attachedFile.set({ ...result, name: file.name });
    } catch (err) {
      // surface however you handle errors elsewhere — toast, banner, etc.
      console.error('PDF upload failed', err);
      this.attachedFile.set(null);
    } finally {
      this.isUploadingFile.set(false);
    }
  }

  clearAttachedFile() {
    this.attachedFile.set(null);
  }

  sendMessage(prompt: string) {
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: prompt,
      streaming: false,
    };

    const assistantId = uuidv4();
    const assistantMessage: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      streaming: true,
    };

    this.messages.update((msgs) => [...msgs, userMessage, assistantMessage]);
    this.isStreaming.set(true);

    const history = this.messages()
      .filter((m) => m.id !== assistantMessage.id)
      .map((m) => ({ role: m.role, content: m.content }));

    // Snapshot the file at send-time — grab it before clearing, so it's
    // attached to *this* message even if the user removes it from the
    // input area right after hitting send.
    const fileRef = this.attachedFile();

    this.chatService
      .sendMessage(prompt, assistantId, history, fileRef ?? undefined)
      .pipe(
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

    // Clear the attachment after sending — matches typical chat UX where
    // the file badge disappears once it's part of a sent message.
    // Remove this line if you want the PDF to stay attached across
    // multiple follow-up questions instead.
    this.attachedFile.set(null);
  }

  private updateMessageContent(id: string, content: string) {
    this.messages.update((msgs) => msgs.map((m) => (m.id === id ? { ...m, content } : m)));
  }

  private finalizeMessage(id: string) {
    this.messages.update((msgs) => msgs.map((m) => (m.id === id ? { ...m, streaming: false } : m)));
    this.isStreaming.set(false);
  }
}
