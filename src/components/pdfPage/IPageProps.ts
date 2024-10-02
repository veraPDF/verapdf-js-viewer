import React from 'react';
import { TSelectedBboxData } from '../../types/selectedBboxData';
import { OrNull } from '../../types/generics';
import type { NodeOrRenderer } from "react-pdf/dist/cjs/shared/types";
import { PageCallback } from "react-pdf/src/shared/types";
import type { TextContent } from "pdfjs-dist/types/src/display/api";

export interface IPageProps {
  page: number;
  inputRef?: React.Ref<HTMLDivElement>;
  pageError?: NodeOrRenderer;
  height?: number;
  width?: number;
  pageLoading?: NodeOrRenderer;
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
  onGetTextSuccess?({ items }: TextContent): void;
  onGetTextError?(error: Error): void;
  onBboxClick?(data: OrNull<TSelectedBboxData>): void;
}
