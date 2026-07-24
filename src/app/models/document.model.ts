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
// models/document.model.ts
export interface DocumentMetadata {
  source: string;
  title?: string;
  total_pages?: number;
  keywords?: string;
  producer?: string;
  author?: string;
  trapped?: string;
  subject?: string;
  creator?: string;
  moddate?: string;
  page?: number;
  page_label?: string;
  creationdate?: string;
  video_id?: string;
  type?: string;
}

export interface DocumentMetadataResponse {
  success: boolean;
  count: number;
  metadata: DocumentMetadata[];
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
