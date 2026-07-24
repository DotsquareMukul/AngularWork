// service/document.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AddDocumentResponse,
  DocumentMetadataResponse,
  DocumentRequest,
  QueryRequest,
  QueryResponse,
  TranscriptRequest,
  TranscriptResponse,
  UploadPdfResponse,
} from '../models/document.model';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.aiBaseUrl;

  queryDocuments(request: QueryRequest): Observable<QueryResponse> {
    return this.http.post<QueryResponse>(`${this.baseUrl}/documents/query`, request);
  }
  addDocument(request: DocumentRequest): Observable<AddDocumentResponse> {
    return this.http.post<AddDocumentResponse>(this.baseUrl, request);
  }
  uploadPdf(file: File): Observable<UploadPdfResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadPdfResponse>(`${this.baseUrl}/uploadpdf`, formData);
  }
  addYoutubeTranscript(request: TranscriptRequest): Observable<TranscriptResponse> {
    return this.http.post<TranscriptResponse>(`${this.baseUrl}/youtube/transcript`, request);
  }
  getMetadata(): Observable<DocumentMetadataResponse> {
    return this.http.get<DocumentMetadataResponse>(`${this.baseUrl}/documents/metadata`);
  }
}
