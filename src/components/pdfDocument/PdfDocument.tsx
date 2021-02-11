import React, {FC, memo, useCallback, useMemo, useState, useContext, useEffect} from 'react';
import { Document, pdfjs } from 'react-pdf';
import { PDFDocumentProxy } from 'pdfjs-dist';
import { useDebounce } from 'react-use';

import { IDocumentProps } from './IDocumentProps';
import { IPageProps } from '../pdfPage/IPageProps';
import PdfPage from '../pdfPage/PdfPage';
import { PDFPageProxy } from 'react-pdf/dist/Page';
import { ViewerContext } from '../viewerContext/ViewerContext';

import './pdfDocument.scss';
import {IBbox} from "../bbox/Bbox";

export interface IPdfDocumentProps extends IDocumentProps, IPageProps {
  showAllPages?: boolean;
  activeBboxIndex?: number;
  bboxMap?: {
    [page: number]: IBbox[];
  };
  onPageChange?(page: number): void;
}

const PdfDocument: FC<IPdfDocumentProps> = (props) => {
  pdfjs.GlobalWorkerOptions.workerSrc = useMemo(() => `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`, []);
  const { page, setPage, maxPage, setMaxPage, scrollIntoPage, setScrollIntoPage } = useContext(ViewerContext);
  const { bboxMap = {} } = props;
  const [loaded, setLoaded] = useState(false);
  const [pagesByViewport, setPagesByViewport] = useState<number[]>([]);
  const [ratioArray, setRatioArray] = useState<number[]>([]);
  const [defaultHeight, setDefaultHeight] = useState(0);
  const [defaultWidth, setDefaultWidth] = useState(0);
  const shownPages: number[] = useMemo(() => {
    if (props.showAllPages) {
      return Array.from(
        new Array(maxPage),
        (_el, index) => index + 1,
      );
    }

    return [props.page || 1];
  }, [maxPage, props.showAllPages, props.page]);

  const onDocumentLoadSuccess = useCallback(async (data: PDFDocumentProxy) => {
    const pageData = await data.getPage(1);
    setDefaultHeight(pageData.view[3]);
    setDefaultWidth(pageData.view[2]);
    setMaxPage(data.numPages);
    setLoaded(true);

    props.onLoadSuccess?.(data);
  }, [props.onLoadSuccess]);
  const onPageLoadSuccess = useCallback((data: PDFPageProxy) => {
    props.onPageLoadSuccess?.(data);
  }, [props.onPageLoadSuccess]);

  const onPageInViewport = useCallback((page: number, intersection: { isIntersecting: boolean, intersectionRatio: number }) => {
    if (props.showAllPages) {
      setPageByViewport(page, intersection);
    } else {
      setPage(page);
    }
  }, [maxPage, props.showAllPages]);
  const onBboxClick = useCallback((data) => {
      props.onBboxClick?.(data);
    }, []);

  const setPageByViewport = useMemo(() => (newPage: number, intersection: { isIntersecting: boolean, intersectionRatio: number }) => {
    const { isIntersecting, intersectionRatio } = intersection;
    if (isIntersecting) {
      if (!pagesByViewport.includes(newPage)) {
        pagesByViewport.push(newPage);
        ratioArray.push(intersectionRatio);
        setPagesByViewport(pagesByViewport);
        setRatioArray(ratioArray);
      } else {
        ratioArray[pagesByViewport.indexOf(newPage)] = intersectionRatio;
        setRatioArray(ratioArray);
      }
    } else {
      if (pagesByViewport.includes(newPage)) {
        const prevPageIndex = pagesByViewport.indexOf(newPage);
        pagesByViewport.splice(prevPageIndex, 1);
        setPagesByViewport(pagesByViewport);
        ratioArray.splice(prevPageIndex, 1);
        setRatioArray(ratioArray);
      }
    }

    let newPageIndex = -1;
    pagesByViewport.forEach((_pageFromViewport, index) => {
      if (newPageIndex === -1) {
        newPageIndex = index;
      }

      if (ratioArray[newPageIndex] < ratioArray[index]) {
        newPageIndex = index;
      }
    });

    if (newPageIndex !== -1 && pagesByViewport[newPageIndex]) {
      setPage(pagesByViewport[newPageIndex]);
      if (scrollIntoPage) {
        setScrollIntoPage(0);
      }
    }
  }, [pagesByViewport, page, ratioArray, scrollIntoPage]);
  useDebounce(() => {
    if (props.page !== page) props.onPageChange?.(page)
  }, 30, [page]);

  useEffect(() => {
    if (page !== props.page) {
      setPage(props.page || 1);
      if (props.showAllPages) {
        setScrollIntoPage(props.page);
      }
    }
  }, [props.page, props.showAllPages]);

  useEffect(() => {
    setLoaded(false);
    setPagesByViewport([]);
    setRatioArray([]);
    setDefaultHeight(0);
    setDefaultWidth(0);
    setMaxPage(0);
    setPage(1);
  }, [props.file]);

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
      {useMemo(() => loaded ? shownPages.map((page) =>
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
          activeBboxIndex={props.activeBboxIndex}
          onBboxClick={onBboxClick}
        />
      ) : null, [loaded, shownPages, defaultHeight, defaultWidth, bboxMap, props])}
    </Document>
  );
}

export default memo(PdfDocument);
