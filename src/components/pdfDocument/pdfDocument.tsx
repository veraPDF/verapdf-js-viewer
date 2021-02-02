import React, {FC, memo, useCallback, useMemo, useState} from 'react';
import { Document, pdfjs } from 'react-pdf';
import { PDFDocumentProxy } from 'pdfjs-dist';

import { IDocumentProps } from './IDocumentProps';
import { IPageProps } from '../pdfPage/IPageProps';
import PdfPage from '../pdfPage/pdfPage';
import EmptyPage from '../pdfPage/emptyPage';
import { TBbox } from '../../types/bbox';
import { PDFPageProxy } from 'react-pdf/dist/Page';

import './pdfDocument.scss';

export interface IPdfDocumentProps extends IDocumentProps, IPageProps {
  showAllPages?: boolean;
  activePage?: number;
  activeBboxIndex?: number;
  bboxMap?: {
    [key: number]: TBbox[]
  },
}

const PdfDocument: FC<IPdfDocumentProps> = (props) => {
  // TODO: Add input param for worker path
  pdfjs.GlobalWorkerOptions.workerSrc = useMemo(() => `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`, []);
  const { bboxMap = {} } = props;
  const [numPages, setNumPages] = useState<number>(0);
  const [renderedPages, setRenderedPages] = useState<number[]>([props.page || 1]);
  const [defaultHeight, setDefaultHeight] = useState(0);
  const [defaultWidth, setDefaultWidth] = useState(0);
  const shownPages: number[] = useMemo(() => {
    if (props.showAllPages) {
      return Array.from(
        new Array(numPages),
        (_el, index) => index + 1,
      );
    }

    return [props.page || 1];
  }, [numPages, props.showAllPages]);

  const onDocumentLoadSuccess = useCallback(async (data: PDFDocumentProxy) => {
    const pageData = await data.getPage(1);
    setDefaultHeight(pageData.view[3]);
    setDefaultWidth(pageData.view[2]);
    setNumPages(data.numPages);

    props.onLoadSuccess?.(data);
  }, [props.onLoadSuccess]);
  const onPageLoadSuccess = useCallback((data: PDFPageProxy) => {
    props.onPageLoadSuccess?.(data);
  }, [props.onPageLoadSuccess]);

  const onPageInViewport = useCallback((page: number) => {
    if (!numPages || !props.showAllPages || !defaultHeight) {
      return;
    }
    const pagesToRender = [];
    if (!renderedPages.includes(page - 1) && page > 1) {
      pagesToRender.push(page - 1);
    }
    if (!renderedPages.includes(page)) {
      pagesToRender.push(page);
    }
    if (!renderedPages.includes(page + 1) && page < numPages) {
      pagesToRender.push(page + 1);
    }
    setRenderedPages([ ...renderedPages, ...pagesToRender ])
  }, [renderedPages, numPages, props.showAllPages]);
  const isPageRendered = useMemo(() => (page: number) => renderedPages.includes(page), [renderedPages]);
  const getSelectedBbox = useMemo(() => (page: number) => props.activePage === page ? props.activeBboxIndex : undefined, [props.activeBboxIndex, props.activePage]);
  const onBboxClick = useCallback((data) => {
      props.onBboxClick?.(data);
    }, []);

  return (
    <Document
      className="pdf-document"
      file={props.file}
      onLoadSuccess={onDocumentLoadSuccess}
      onLoadError={props.onLoadError}
      externalLinkTarget={props.externalLinkTarget}
      error={props.error}
      loading={props.loading}
      noData={props.noData}
      onItemClick={props.onItemClick}
      rotate={props.rotate}
    >
      {shownPages.map((page) =>
        isPageRendered(page) ?
          <PdfPage
            defaultHeight={defaultHeight}
            defaultWidth={defaultWidth}
            key={page}
            page={page}
            pageError={props.pageError}
            inputRef={props.inputRef}
            height={props.height}
            width={props.width}
            pageLoading={props.pageLoading}
            renderAnnotationLayer={props.renderAnnotationLayer}
            renderInteractiveForms={props.renderInteractiveForms}
            renderTextLayer={props.renderTextLayer}
            scale={props.scale}
            onPageLoadError={props.onPageLoadError}
            onPageLoadProgress={props.onPageLoadProgress}
            onPageLoadSuccess={onPageLoadSuccess}
            onPageRenderError={props.onPageRenderError}
            onPageRenderSuccess={props.onPageRenderSuccess}
            onGetAnnotationsSuccess={props.onGetAnnotationsSuccess}
            onGetAnnotationsError={props.onGetAnnotationsError}
            onGetTextSuccess={props.onGetTextSuccess}
            onGetTextError={props.onGetTextError}
            onPageInViewport={onPageInViewport}
            bboxList={bboxMap[page]}
            activeBbox={getSelectedBbox(page)}
            onBboxClick={onBboxClick}
          /> :
          <EmptyPage
            key={page}
            page={page}
            width={defaultWidth}
            height={defaultHeight}
            onPageInViewport={onPageInViewport}
          />
      )}
    </Document>
  );
}

export default memo(PdfDocument);
