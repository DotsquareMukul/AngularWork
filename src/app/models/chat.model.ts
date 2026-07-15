// models/chat.models.ts
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  streaming: boolean;
}

export interface ChatChunk {
  messageId: string;
  text: string;
  done: boolean;
}
