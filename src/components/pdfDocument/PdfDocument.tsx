import React, {FC, memo, useCallback, useMemo, useState, useContext, useEffect} from 'react';
import { Document } from 'react-pdf';
import { PDFDocumentProxy } from 'pdfjs-dist';
import { useDebounce } from 'react-use';
import _ from 'lodash';

import { IDocumentProps } from './IDocumentProps';
import { IPageProps } from '../pdfPage/IPageProps';
import PdfPage from '../pdfPage/PdfPage';
import { PDFPageProxy } from 'react-pdf/dist/Page';
import { ViewerContext } from '../viewerContext/ViewerContext';
import { AnyObject } from '../../types/generics';
import { IBboxLocation } from '../../index';
import {activeBboxInViewport, buildBboxMap} from '../../services/bboxService';
import {IColorScheme} from '../bbox/Bbox';
// @ts-ignore
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

import './pdfDocument.scss';

interface IDocumentData extends PDFDocumentProxy {
  _pdfInfo: {
    structureTree: AnyObject;
  }
}

export interface IPdfDocumentProps extends IDocumentProps, IPageProps {
  showAllPages?: boolean;
  activeBboxIndex?: number;
  bboxes: IBboxLocation[];
  colorScheme?: IColorScheme;
  onPageChange?(page: number): void;
}

const PdfDocument: FC<IPdfDocumentProps> = (props) => {
  const { page, setPage, maxPage, setMaxPage, scrollIntoPage, setScrollIntoPage } = useContext(ViewerContext);
  const { bboxes = [] } = props;
  const [loaded, setLoaded] = useState(false);
  const [structureTree, setStructureTree] = useState({});
  const [bboxMap, setBboxMap] = useState({});
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

  useEffect(() => {
    setBboxMap(buildBboxMap(bboxes, structureTree));
  }, [bboxes, structureTree]);

  useEffect(() => {
    if ((props.activeBboxIndex ?? false) === false) {
      return;
    }
    let bboxPage = 0;
    for (const [key, value] of Object.entries(bboxMap)) {
      if (_.find(value as AnyObject[], { index: props.activeBboxIndex })) {
        bboxPage = parseInt(key);
        break;
      }
    }
    if (bboxPage > 0 && !activeBboxInViewport()) {
      if (bboxPage !== page) {
        setScrollIntoPage(bboxPage);
        const el: any = document.querySelector('.pdf-bbox_selected');
        if (!el) return;
        el.scrollIntoView();
        (document.querySelector('.pdf-viewer') as any).scrollTop -= 150;
        if (!activeBboxInViewport()) {
          el.scrollIntoView();
        }
      }
    }
  }, [props.activeBboxIndex, bboxMap])

  const onDocumentLoadSuccess = useCallback(async (data: IDocumentData) => {
    setStructureTree(data._pdfInfo.structureTree);
    const pageData = await data.getPage(1);
    setDefaultHeight(pageData.view[3]);
    setDefaultWidth(pageData.view[2]);
    setMaxPage(data.numPages);
    setLoaded(true);

    props.onLoadSuccess?.(data);
  }, [props.onLoadSuccess, bboxes]);
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
      options={{
        workerSrc: pdfjsWorker,
      }}
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
          groupId={bboxes[props.activeBboxIndex as number]?.groupId}
          activeBboxIndex={props.activeBboxIndex}
          onBboxClick={onBboxClick}
          colorScheme={props.colorScheme}
        />
      ) : null, [loaded, shownPages, defaultHeight, defaultWidth, bboxMap, props])}
    </Document>
  );
}

export default memo(PdfDocument);
