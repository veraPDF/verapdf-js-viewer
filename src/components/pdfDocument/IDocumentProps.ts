import { NodeOrRenderer, OnItemClickArgs } from "react-pdf/src/shared/types";
import { DocumentCallback } from "react-pdf/dist/cjs/shared/types";

export interface IDocumentProps {
  file: File | string;
  error?: NodeOrRenderer;
  externalLinkTarget?: '_self' | '_blank' | '_parent' | '_top';
  loading?: NodeOrRenderer;
  noData?: NodeOrRenderer;
  rotate?: number;
  workerSrc?: string;
  onLoadSuccess?(pdf: DocumentCallback): void;
  onLoadError?(error: Error): void;
  onItemClick?({ pageNumber }: OnItemClickArgs): void;
}
