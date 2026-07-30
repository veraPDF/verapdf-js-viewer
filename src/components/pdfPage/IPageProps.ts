import React from 'react';
import { NodeOrRenderer, PageCallback } from 'react-pdf/dist/shared/types';
import { TextItem, TextContent } from 'pdfjs-dist/types/src/display/api.js';

import { AnyObject, OrNull } from '../../types/generics';
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
  activeBboxIndex?: { index: number; zoom: boolean };
  activeBboxId?: { id: string; zoom: boolean };
  onPageLoadError?(error: Error): void;
  onPageLoadSuccess?(page: PageCallback): void;
  onPageRenderError?(error: Error): void;
  onPageRenderSuccess: (ref?: HTMLDivElement) => void;
  onGetAnnotationsSuccess?(annotations: AnyObject): void;
  onGetAnnotationsError?(error: Error): void;
  onGetTextSuccess?(textContent: TextContent): void;
  onGetTextError?(error: Error): void;
  onBboxClick?(data: OrNull<TSelectedBboxData>): void;
  customTextRenderer?(layer: { pageIndex: number; pageNumber: number; itemIndex: number } & TextItem): string;
}
