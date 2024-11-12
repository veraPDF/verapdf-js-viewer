import React, { FC, memo, useCallback, useMemo, useState, useContext, useEffect } from 'react';
import { Document, pdfjs } from 'react-pdf';
import { DocumentCallback, PageCallback } from 'react-pdf/src/shared/types';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useDebounce } from 'react-use';
import _ from 'lodash';

import { IDocumentProps } from './IDocumentProps';
import { IPageProps } from '../pdfPage/IPageProps';
import PdfPage from '../pdfPage/PdfPage';
import { ViewerContext } from '../viewerContext/ViewerContext';
import { TreeBboxSelectionMode } from '../../enums/treeBboxSelectionMode';
import { AnyObject, OrNull } from '../../types/generics';
import { TSelectedBboxData } from '../../types/selectedBboxData';
import { IBboxLocation } from '../../index';
import {
  activeBboxInViewport,
  buildBboxMap,
  parseTree,
  setTreeIds,
  structurizeTree,
  getMcidList,
  createBboxMap,
  getSelectedPageByLocation,
  getBboxPages,
  scrollToActiveBbox
} from '../../services/bboxService';
import { IColorScheme } from '../bbox/Bbox';
// @ts-ignore
//import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs';

//console.log(pdfjsWorker);

//pdfjs.GlobalWorkerOptions.workerSrc = '//unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs';
import pdfWorkerURL from 'pdfjs-dist/build/pdf.worker?url'
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  pdfWorkerURL,
  import.meta.url,
).toString();

//pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjsWorker';

import './pdfDocument.scss';

interface IDocumentData extends DocumentCallback {
  _pdfInfo: {
    structureTree: AnyObject;
  }
  parsedTree?: AnyObject;
}

export interface IPdfDocumentProps extends IDocumentProps, IPageProps {
  showAllPages?: boolean;
  activeBboxIndex?: number;
  activeBboxId?: string;
  bboxes: IBboxLocation[];
  isTreeBboxesVisible: boolean;
  treeBboxSelectionMode?: TreeBboxSelectionMode;
  colorScheme?: IColorScheme;
  onBboxesParsed?(pages: number[]): void;
  onPageChange?(page: number): void;
  onWarning?(warningCode: string): void;
  onSelectBbox(index: number | undefined): void;
}

const PdfDocument: FC<IPdfDocumentProps> = (props) => {
  const { page, setPage, maxPage, setMaxPage, scrollIntoPage, setScrollIntoPage } = useContext(ViewerContext);
  const { bboxes = [] } = props;
  const [loaded, setLoaded] = useState(false);
  const [structureTree, setStructureTree] = useState({});
  const [parsedTree, setParsedTree] = useState({});
  const [bboxMap, setBboxMap] = useState({});
  const [treeElementsBboxes, setTreeElementsBboxes] = useState({});
  const [pagesByViewport, setPagesByViewport] = useState<number[]>([]);
  const [ratioArray, setRatioArray] = useState<number[]>([]);
  const [defaultHeight, setDefaultHeight] = useState(0);
  const [defaultWidth, setDefaultWidth] = useState(0);
  const [selectedPage, setSelectedPage] = useState<number | undefined>(undefined);
  const activeBbox = useMemo(() => {
    return props.activeBboxIndex !== undefined ? bboxes[props.activeBboxIndex] : null
  }, [props.activeBboxIndex, bboxes]);
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
    props.onBboxesParsed?.(getBboxPages(bboxes, structureTree));
  }, [bboxes, structureTree]);

  useEffect(() => {
    const mcidList = getMcidList(parsedTree ?? {});
    setTreeElementsBboxes(createBboxMap(mcidList));
  }, [parsedTree]);

  useEffect(() => {
    const isBboxMode = !_.isNil(props.activeBboxIndex);
    const id = isBboxMode ? props.activeBboxIndex : props.activeBboxId;
    if ((id ?? false) === false) {
      return;
    }
    const entries = Object.entries(isBboxMode ? bboxMap : treeElementsBboxes);
    const finder = isBboxMode 
        ? (value: AnyObject[]) => _.find(value, { index: props.activeBboxIndex })
        : (value: [AnyObject[], string]) => _.find(value, arr => arr[1] === props.activeBboxId);
    let bboxPage = 0;
    for (const [key, value] of entries) {
      if (finder(value as AnyObject[] & [AnyObject[], string])) {
        bboxPage = parseInt(key);
        break;
      }
    }
    if (bboxPage > 0 && !activeBboxInViewport()) {
      setScrollIntoPage(bboxPage);
      // To be sure that page is loaded before scrolling to the active bbox
      setTimeout(() => scrollToActiveBbox(), 100);
    }
  }, [props.activeBboxIndex, props.activeBboxId, bboxMap, treeElementsBboxes])

  useEffect(() => {
    if (activeBbox) {
      const selectedPage = getSelectedPageByLocation(activeBbox.location);
      if (selectedPage > -1) {
        setPage(selectedPage);
      }
      setSelectedPage(selectedPage);
    } else {
      setSelectedPage(undefined);
    }
  }, [activeBbox]);

  const onDocumentLoadSuccess = useCallback(async (data: IDocumentData) => {
    setStructureTree(data._pdfInfo.structureTree);
    const parsedTree = parseTree(_.cloneDeep(data._pdfInfo.structureTree));
    const treeWithData = structurizeTree(parsedTree);
    const [treeWithIds, annotMap] = setTreeIds(treeWithData ?? {});
    if (!_.isNil(treeWithIds)) treeWithIds.annotMap = annotMap;
    setParsedTree(treeWithIds ?? {});
    data.parsedTree = treeWithIds ?? {};
    const pageData = await data.getPage(1);
    setDefaultHeight(pageData.view[3]);
    setDefaultWidth(pageData.view[2]);
    setMaxPage(data.numPages);
    setLoaded(true);
    props.onLoadSuccess?.(data);
  }, [props.onLoadSuccess, bboxes]);
  const onPageLoadSuccess = useCallback((data: PageCallback) => {
    props.onPageLoadSuccess?.(data);
  }, [props.onPageLoadSuccess]);

  const onPageInViewport = useCallback((page: number, intersection: { isIntersecting: boolean, intersectionRatio: number }) => {
    if (props.showAllPages) {
      setPageByViewport(page, intersection);
    } else {
      setPage(page);
    }
  }, [maxPage, props.showAllPages]);
  const onBboxClick = useCallback((data: OrNull<TSelectedBboxData>) => {
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

  useEffect(() => {
    function handlekeydownEvent(event: any) {
      if ((event.ctrlKey || event.metaKey) && event.key === 'ArrowUp') {
        props.onSelectBbox((_.isNil(props.activeBboxIndex) || props.activeBboxIndex === -1 || props.activeBboxIndex === 0) ? 0 : props.activeBboxIndex - 1);
      } else if ((event.ctrlKey || event.metaKey) && event.key === 'ArrowDown') {
        props.onSelectBbox((props.activeBboxIndex === -1 || _.isNil(props.activeBboxIndex)) ? 0 :
            (props.activeBboxIndex + 1 === bboxes.length) ? props.activeBboxIndex : props.activeBboxIndex + 1);
      } else if (event.key === 'ArrowLeft' && (props.page - 1 > 0)) {
        props.onPageChange?.(props.page - 1);
      } else if (event.key === 'ArrowRight' && props.page !== maxPage) {
        props.onPageChange?.(props.page + 1);
      }
    }

    document.addEventListener('keydown', handlekeydownEvent)
    return () => {
      document.removeEventListener('keydown', handlekeydownEvent)
    }
  }, [props.activeBboxIndex, props.page, maxPage]);

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
      {useMemo(() => loaded ? shownPages.map((page) => <PdfPage
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
          onPageLoadSuccess={onPageLoadSuccess}
          onPageRenderError={props.onPageRenderError}
          onPageRenderSuccess={props.onPageRenderSuccess}
          onGetAnnotationsSuccess={props.onGetAnnotationsSuccess}
          onGetAnnotationsError={props.onGetAnnotationsError}
          onGetTextSuccess={props.onGetTextSuccess}
          onGetTextError={props.onGetTextError}
          onPageInViewport={onPageInViewport}
          bboxList={bboxMap[page]}
          treeElementsBboxes={treeElementsBboxes[page]}
          treeBboxSelectionMode={props.treeBboxSelectionMode}
          groupId={bboxes[props.activeBboxIndex as number]?.groupId}
          activeBboxIndex={props.activeBboxIndex}
          activeBboxId={props.activeBboxId}
          isTreeBboxesVisible={props.isTreeBboxesVisible}
          onBboxClick={onBboxClick}
          colorScheme={props.colorScheme}
          isPageSelected={selectedPage === page}
          onWarning={props.onWarning}
        />
      ) : null, [loaded, shownPages, defaultHeight, defaultWidth, bboxMap, treeElementsBboxes, props, selectedPage])}
    </Document>
  );
}

export default memo(PdfDocument);
