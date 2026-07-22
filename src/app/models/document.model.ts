export interface TranscriptRequest {
  url: string;
}

export interface TranscriptResponse {
  video_id: string;
  message: string;
  documnet_store: number; // matches backend's field name exactly (typo preserved)
}
export interface QueryRequest {
  query: string;
  source: string;
}

export interface QueryResponse {
  answer: string;
  sources?: string[];
}

export interface DocumentQaEntry {
  id: string;
  query: string;
  answer: string;
  source: string;
  loading: boolean;
  error: string | null;
}
// models/document.model.ts (add to existing file)
export interface DocumentRequest {
  content: string;
  metadata: {
    source: string;
    [key: string]: unknown;
  };
}

export interface AddDocumentResponse {
  message: string;
  chunks_added: number;
  ids: string[];
}

export interface UploadPdfResponse {
  message: string;
  filename: string;
  pages: number;
  chunks_added: number;
}
