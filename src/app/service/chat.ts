// services/chat.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ChatChunk } from '../models/chat.model';

@Injectable({ providedIn: 'root' })
export class ChatService {
  /**
   * Replace this with a real SSE/websocket source.
   * Example real implementation using fetch + ReadableStream or EventSource
   * shown below in sendMessage().
   */
  sendMessage(
    prompt: string,
    messageId: string,
    history: { role: string; content: string }[] = [],
  ): Observable<ChatChunk> {
    return new Observable<ChatChunk>((subscriber) => {
      const historyParam = encodeURIComponent(JSON.stringify(history));
      const eventSource = new EventSource(
        `http://localhost:5001/api/chat/stream?prompt=${encodeURIComponent(prompt)}&history=${historyParam}`,
      );

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data) as { text: string; done: boolean };
        subscriber.next({ messageId, text: data.text, done: data.done });

        if (data.done) {
          subscriber.complete();
          eventSource.close();
        }
      };

      eventSource.onerror = (err) => {
        subscriber.error(err);
        eventSource.close();
      };

      return () => eventSource.close();
    });
  }
}
