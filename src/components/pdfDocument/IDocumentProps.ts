import React from 'react';
import { RenderFunction } from 'react-pdf/dist/Document';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

export interface IDocumentProps {
  file: File | string;
  error?: string | React.ReactElement | RenderFunction;
  externalLinkTarget?: '_self' | '_blank' | '_parent' | '_top';
  loading?: string | React.ReactElement | RenderFunction;
  noData?: string | React.ReactElement | RenderFunction;
  rotate?: number;
  workerSrc?: string;
  onLoadSuccess?(pdf: PDFDocumentProxy | null): void;
  onLoadError?(error: Error): void;
  onItemClick?({ pageNumber }: { pageNumber: string }): void;
}
