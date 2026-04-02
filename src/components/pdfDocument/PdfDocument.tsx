import React, { FC, memo, useCallback, useMemo, useState, useContext, useEffect, useRef } from 'react';
import { DocumentCallback, PageCallback } from 'react-pdf/src/shared/types';
import { useDebounce } from 'react-use';
import { Document, pdfjs } from 'react-pdf';
import EventEmitter from 'eventemitter3';
import _ from 'lodash';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { IDocumentProps } from './IDocumentProps';
import { IPageProps } from '../pdfPage/IPageProps';
import PdfPage from '../pdfPage/PdfPage';
import { ViewerContext } from '../viewerContext/ViewerContext';
import { TreeBboxSelectionMode } from '../../enums/treeBboxSelectionMode';
import { AnyObject, OrNull } from '../../types/generics';
import { TSelectedBboxData } from '../../types/selectedBboxData';
import { IBboxLocation } from '../../index';
import {
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

class MapWithEvents<K, V> extends Map<K, V> {
  emitter = new EventEmitter();

  addEventListener(type: 'add', callback: (key: K, value: V) => void, once?: boolean) {
    if (once) {
      this.emitter.once(type, callback);
    } else {
      this.emitter.on(type, callback);
    }
  }

  removeEventListener(type: 'add', callback: (key: K, value: V) => void) {
    this.emitter.off(type, callback);
  }

  set(key: K, value: V) {
    super.set(key, value);
    this.emitter.emit('add', key, value);
    return this;
  }
}

const zoomInScaleRatioThreshold = 0.4;
const zoomOutScaleRatioThreshold = 0.7;

export interface IPdfDocumentProps extends IDocumentProps, IPageProps {
  showAllPages?: boolean;
  activeBboxIndex?: { index: number, zoom: boolean };
  activeBboxId?: { id: string, zoom: boolean };
  bboxes: IBboxLocation[];
  isTreeBboxesVisible: boolean;
  treeBboxSelectionMode?: TreeBboxSelectionMode;
  colorScheme?: IColorScheme;
  defaultHeight?: number;
  defaultWidth?: number;
  setScale?(scale: string): void;
  onPageRenderSuccess: () => void;
  autoScaleOptions?: { label: string, value: string }[];
  onBboxesParsed?(pages: number[]): void;
  onPageChange?(page: number): void;
  onWarning?(warningCode: string): void;
  onSelectBbox(index: number | undefined): void;
}

const PdfDocument: FC<IPdfDocumentProps> = (props) => {
  const renderedPages = useRef(new MapWithEvents<number, HTMLDivElement>());
  const { page, setPage, maxPage, setMaxPage, scrollInto, setScrollIntoPage } = useContext(ViewerContext);
  const { bboxes = [] } = props;
  const [loaded, setLoaded] = useState(false);
  const [structureTree, setStructureTree] = useState({});
  const [parsedTree, setParsedTree] = useState({});
  const [bboxMap, setBboxMap] = useState({});
  const [treeElementsBboxes, setTreeElementsBboxes] = useState({});
  const [pagesByViewport, setPagesByViewport] = useState<number[]>([]);
  const [ratioArray, setRatioArray] = useState<number[]>([]);
  const [defaultHeight, setDefaultHeight] = useState(props.defaultHeight);
  const [defaultWidth, setDefaultWidth] = useState(props.defaultWidth);
  const [selectedPage, setSelectedPage] = useState<number | undefined>(undefined);

  const { activeBboxId, activeBboxIndex } = useMemo(() => {
    const { id: activeBboxId } = props.activeBboxId ?? {};
    const { index: activeBboxIndex } = props.activeBboxIndex ?? {};
    return { activeBboxId, activeBboxIndex };
  }, [props.activeBboxIndex?.index, props.activeBboxId?.id]);
  const groupId = useMemo(
    () => activeBboxIndex != null ? bboxes[activeBboxIndex]?.groupId : undefined,
    [activeBboxIndex],
  )

  const autoScaleRatio = useMemo(() => {
    if (!props.autoScaleOptions) return [];
    const scales = props.autoScaleOptions.map(({ value }) => +value).sort((a, b) => b - a);
    const ratioScales: { ratio: number, scale: number }[] = [];
    for (const s of scales) {
      if (s > 1) {
        ratioScales.push({ ratio: zoomInScaleRatioThreshold / s, scale: s });
      } else if (s === 1) {
        ratioScales.push({ ratio: zoomOutScaleRatioThreshold, scale: 1 });
      } else if (zoomOutScaleRatioThreshold / s <= 1) {
        ratioScales.push({ ratio: zoomOutScaleRatioThreshold / s, scale: s });
      } else {
        break;
      }
    }
    return ratioScales;
  }, [props.autoScaleOptions])
  const activeBbox = useMemo(() => {
    return activeBboxIndex !== undefined ? bboxes[activeBboxIndex] : null
  }, [activeBboxIndex, bboxes]);
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

  const handleZoomOnActive = useCallback(async (page: number, controller: AbortController) => {
    const { setScale } = props;
    if (!setScale || !autoScaleRatio.length) {
      return;
    }

    if (!renderedPages.current.has(page)) {
      await new Promise<void>((resolve, reject) => {
        const callback = (v: number) => {
          if (v === page) {
            renderedPages.current.removeEventListener('add', callback);
            resolve();
          }
        };
        renderedPages.current.addEventListener('add', callback);
        controller.signal.onabort = () => {
          renderedPages.current.removeEventListener('add', callback);
          reject(new Error('Aborted'));
        };
      });
    }
    const pageEl = renderedPages.current.get(page);
    if (!pageEl) return;
    const { clientWidth: pageWidth, clientHeight: pageHeight } = pageEl;
    const selectedBboxes = document.querySelectorAll('.pdf-bbox_selected');

    let [x0, y0, x1, y1] = [
      Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY,
    ];
    selectedBboxes.forEach((b) => {
      const { x, y, width, height } = b.getBoundingClientRect();
      x0 = Math.min(x0, x);
      y0 = Math.min(y0, y);
      x1 = Math.max(x1, x + width);
      y1 = Math.max(y1, y + height);
    });

    let newScale = 1;
    const w = (x1 - x0), h = (y1 - y0);
    if (Number.isFinite(w)) {
      const wRatio = w / pageWidth;
      newScale = autoScaleRatio
        .find(({ ratio }, i, { length }) => wRatio < ratio || i + 1 === length)
        ?.scale ?? 1;
    }
    if (Number.isFinite(h)) {
      const hRatio = h / pageHeight;
      const tempScale = autoScaleRatio
        .find(({ ratio }, i, { length }) => hRatio < ratio || i + 1 === length)
        ?.scale ?? 1;
      newScale = Math.min(newScale, tempScale);
    }
    if (newScale !== (props.scale ?? 1)) {
      renderedPages.current.clear();
      setScale(newScale.toString());
    }
  }, [props.setScale, props.scale, autoScaleRatio]);

  useEffect(() => {
    const isBboxMode = !_.isNil(activeBboxIndex);
    const id = isBboxMode ? activeBboxIndex : activeBboxId;
    if ((id ?? false) === false) {
      return;
    }
    const autoZoom = isBboxMode ? props.activeBboxIndex!.zoom : props.activeBboxId!.zoom;
    const entries = Object.entries(isBboxMode ? bboxMap : treeElementsBboxes);
    const finder = isBboxMode 
        ? (value: AnyObject[]) => _.find(value, { index: activeBboxIndex })
        : (value: [AnyObject[], string]) => _.find(value, arr => arr[1] === activeBboxId);
    let bboxPage = 0;
    for (const [key, value] of entries) {
      if (finder(value as AnyObject[] & [AnyObject[], string])) {
        bboxPage = parseInt(key);
        break;
      }
    }
    if (bboxPage > 0) {
      if (autoZoom) {
      const controller = new AbortController();
        const forceScrollToActiveBbox = (p: number) => {
          if (bboxPage === p) {
            renderedPages.current.removeEventListener('add', forceScrollToActiveBbox);
            scrollToActiveBbox(true);
          }
        }
        handleZoomOnActive(bboxPage, controller)
          .then(() => {
            if (renderedPages.current.has(bboxPage)) scrollToActiveBbox();
            else {
              setScrollIntoPage(bboxPage);
              renderedPages.current.addEventListener('add', forceScrollToActiveBbox);
            }
          })
          .catch(() => {});
        return () => {
          controller.abort();
          renderedPages.current.removeEventListener('add', forceScrollToActiveBbox);
        }
      } else {
        if (renderedPages.current.has(bboxPage)) scrollToActiveBbox();
        else {
          setScrollIntoPage(bboxPage);
          const scrollOnRender = (p: number) => {
            if (bboxPage === p) {
              renderedPages.current.removeEventListener('add', scrollOnRender);
              scrollToActiveBbox();
            }
          }
          renderedPages.current.addEventListener('add', scrollOnRender);
          return () => {
            renderedPages.current.removeEventListener('add', scrollOnRender);
          }
        }
      }
    }
    return;
  }, [
    props.activeBboxIndex, props.activeBboxId,
    bboxMap, treeElementsBboxes,
  ]);

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
    const width = Math.min(pageData.view[2], props.defaultWidth || pageData.view[2]);
    const scale = width / pageData.view[2];
    setDefaultWidth(width);
    setDefaultHeight(pageData.view[3] * scale);
    setMaxPage(data.numPages);
    setLoaded(true);
    props.onLoadSuccess?.(data);
  }, [props.onLoadSuccess, bboxes, props.defaultHeight, props.defaultWidth]);

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
  }, [props.onBboxClick]);

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
      if (scrollInto.page) {
        setScrollIntoPage(0);
      }
    }
  }, [pagesByViewport, page, ratioArray, scrollInto]);
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
    renderedPages.current.clear();
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
        props.onSelectBbox((_.isNil(activeBboxIndex) || activeBboxIndex === -1 || activeBboxIndex === 0) ? 0 : activeBboxIndex - 1);
      } else if ((event.ctrlKey || event.metaKey) && event.key === 'ArrowDown') {
        props.onSelectBbox((activeBboxIndex === -1 || _.isNil(activeBboxIndex)) ? 0 :
            (activeBboxIndex + 1 === bboxes.length) ? activeBboxIndex : activeBboxIndex + 1);
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
  }, [activeBboxIndex, props.page, maxPage]);

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
          onPageRenderSuccess={(ref) => {
            renderedPages.current.set(page, ref);
            props.onPageRenderSuccess?.();
          }}
          onGetAnnotationsSuccess={props.onGetAnnotationsSuccess}
          onGetAnnotationsError={props.onGetAnnotationsError}
          onGetTextSuccess={props.onGetTextSuccess}
          onGetTextError={props.onGetTextError}
          onPageInViewport={onPageInViewport}
          bboxList={bboxMap[page]}
          treeElementsBboxes={treeElementsBboxes[page]}
          treeBboxSelectionMode={props.treeBboxSelectionMode}
          groupId={groupId}
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
