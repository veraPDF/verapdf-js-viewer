import React from 'react';
import { PDFPageProxy, RenderFunction, TextItem, TextLayerItemInternal } from 'react-pdf/dist/Page';
import { TSelectedBboxData } from '../../types/selectedBboxData';
import { OrNull } from '../../types/generics';
export interface IPageProps {
    page: number;
    inputRef?: React.LegacyRef<HTMLDivElement>;
    pageError?: string | React.ReactElement | RenderFunction;
    height?: number;
    width?: number;
    pageLoading?: string | React.ReactElement | RenderFunction;
    renderAnnotationLayer?: boolean;
    renderInteractiveForms?: boolean;
    renderTextLayer?: boolean;
    scale?: number;
    activeBboxIndex?: number;
    activeBboxId?: string;
    onPageLoadError?(error: Error): void;
    onPageLoadSuccess?(page: PDFPageProxy): void;
    onPageRenderError?(error: Error): void;
    onPageRenderSuccess?(): void;
    onGetAnnotationsSuccess?(annotations: any): void;
    onGetAnnotationsError?(error: Error): void;
    onGetTextSuccess?({ items }: {
        items: TextItem[];
    }): void;
    onGetTextError?(error: Error): void;
    onBboxClick?(data: OrNull<TSelectedBboxData>): void;
    customTextRenderer?(layer: TextLayerItemInternal): string;
}
