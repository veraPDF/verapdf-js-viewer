import React from 'react';
import { DocumentCallback, NodeOrRenderer } from 'react-pdf/src/shared/types';
export interface IDocumentProps {
    file: File | string;
    error?: string | React.ReactElement | NodeOrRenderer;
    externalLinkTarget?: '_self' | '_blank' | '_parent' | '_top';
    loading?: string | React.ReactElement | NodeOrRenderer;
    noData?: string | React.ReactElement | NodeOrRenderer;
    rotate?: number;
    workerSrc?: string;
    onLoadSuccess?(pdf: DocumentCallback | null): void;
    onLoadError?(error: Error): void;
    onItemClick?({ pageNumber }: {
        pageNumber: number;
    }): void;
}
