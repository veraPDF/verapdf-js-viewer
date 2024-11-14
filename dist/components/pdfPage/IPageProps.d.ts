import React from 'react';
import { NodeOrRenderer, PageCallback } from 'react-pdf/src/shared/types';
import { TextItem, TextContent } from 'pdfjs-dist/types/src/display/api.js';
import { OrNull } from '../../types/generics';
import { TSelectedBboxData } from '../../types/selectedBboxData';
export interface IPageProps {
    page: number;
    inputRef?: React.Ref<HTMLDivElement | null>;
    pageError?: string | React.ReactElement | NodeOrRenderer;
    height?: number;
    width?: number;
    pageLoading?: string | React.ReactElement | NodeOrRenderer;
    renderAnnotationLayer?: boolean;
    renderInteractiveForms?: boolean;
    renderTextLayer?: boolean;
    scale?: number;
    activeBboxIndex?: number;
    activeBboxId?: string;
    onPageLoadError?(error: Error): void;
    onPageLoadSuccess?(page: PageCallback): void;
    onPageRenderError?(error: Error): void;
    onPageRenderSuccess?(): void;
    onGetAnnotationsSuccess?(annotations: any): void;
    onGetAnnotationsError?(error: Error): void;
    onGetTextSuccess?(textContent: TextContent): void;
    onGetTextError?(error: Error): void;
    onBboxClick?(data: OrNull<TSelectedBboxData>): void;
    customTextRenderer?(layer: {
        pageIndex: number;
        pageNumber: number;
        itemIndex: number;
    } & TextItem): string;
}
