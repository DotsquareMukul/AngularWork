// services/chat.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatChunk } from '../models/chat.model';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly baseUrl = environment.aiBaseUrl;
  private socket: WebSocket | null = null;

  private get wsBaseUrl(): string {
    return this.baseUrl.replace(/^http/, 'ws');
  }

  private connect(): WebSocket {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      return this.socket;
    }
    const socket = new WebSocket(`${this.wsBaseUrl}/chat/ws`);
    this.socket = socket;
    return socket;
  }

  /** Step 1: upload the PDF once, get back a file_id to reuse. */
  async uploadPdf(file: File): Promise<{ file_id: string; mime_type: string }> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const res = await fetch(`${this.baseUrl}/chat/upload-pdf`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('PDF upload failed');
    return res.json();
  }

  /** Step 2: chat as normal, optionally passing the file_id from step 1. */
  sendMessage(
    prompt: string,
    messageId: string,
    history: { role: string; content: string }[] = [],
    fileRef?: { file_id: string; mime_type: string },
  ): Observable<ChatChunk> {
    return new Observable<ChatChunk>((subscriber) => {
      const socket = this.connect();

      const send = () => {
        socket.send(
          JSON.stringify({
            prompt,
            history,
            file_id: fileRef?.file_id,
            mime_type: fileRef?.mime_type,
          }),
        );
      };

      const handleMessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data) as { text?: string; done: boolean; error?: string };
        if (data.error) {
          subscriber.error(new Error(data.error));
          return;
        }
        subscriber.next({ messageId, text: data.text ?? '', done: data.done });
        if (data.done) subscriber.complete();
      };

      const handleError = (err: Event) => subscriber.error(err);
      const handleClose = () => subscriber.error(new Error('WebSocket connection closed'));

      socket.addEventListener('message', handleMessage);
      socket.addEventListener('error', handleError);
      socket.addEventListener('close', handleClose);

      if (socket.readyState === WebSocket.OPEN) {
        send();
      } else {
        socket.addEventListener('open', send, { once: true });
      }

      return () => {
        socket.removeEventListener('message', handleMessage);
        socket.removeEventListener('error', handleError);
        socket.removeEventListener('close', handleClose);
      };
    });
  }

  disconnect(): void {
    this.socket?.close();
    this.socket = null;
  }
}
