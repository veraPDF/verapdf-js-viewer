import React, { FC, useCallback, useState, useRef, memo, useEffect, useContext, useMemo } from 'react';
import { usePrevious } from 'react-use';
import { Page } from 'react-pdf';
import { PageCallback } from 'react-pdf/src/shared/types';
import { useIntersection } from 'use-intersection';
import styled from 'styled-components';
import _ from 'lodash';

import Bbox, { IBbox, IColorScheme, TreeElementBbox } from '../bbox/Bbox';
import { IPageProps } from './IPageProps';
import { ViewerContext } from '../viewerContext/ViewerContext';
import { TreeBboxSelectionMode } from '../../enums/treeBboxSelectionMode';
import { AnyObject } from '../../types/generics';
import {
  cleanArray,
  getBboxForGlyph,
  parseMcidToBbox,
  createAllBboxes,
  checkIsBboxOutOfThePage,
  getFormattedAnnotations
} from '../../services/bboxService';
import { WARNING_CODES } from '../../services/constants';

import './pdfPage.scss';

interface IPdfPageProps extends IPageProps {
  bboxList?: IBbox[];
  treeElementsBboxes?: TreeElementBbox[];
  treeBboxSelectionMode?: TreeBboxSelectionMode;
  isTreeBboxesVisible: boolean;
  defaultHeight?: number;
  defaultWidth?: number;
  structure?: AnyObject;
  colorScheme?: IColorScheme;
  groupId?: string;
  onPageInViewport?(page: number, data: { isIntersecting?: boolean, intersectionRatio?: number }): void;
  isPageSelected?: boolean;
  onWarning?(warningCode: string): void;
}

interface IStyledPdfPageProps {
  height?: number;
  width?: number;
  scale: number;
  colorScheme?: IColorScheme;
}

const bboxBorderHover = 'orangered';

const StyledPdfPage = styled.div`
  min-height: ${(props: IStyledPdfPageProps) => props.height ? props.height*props.scale + 'px' : 'auto'};
  min-width: ${(props: IStyledPdfPageProps) => props.width ? props.width*props.scale + 'px' : 'auto'};
  &.pdf-page_selected {
    outline-color: ${(props: IStyledPdfPageProps) => props.colorScheme && props.colorScheme.borderSelected || bboxBorderHover};
  }
`;

const PdfPage: FC<IPdfPageProps> = (props) => {
  const { scrollInto } = useContext(ViewerContext);
  const { treeElementsBboxes, bboxList, scale = 1 } = props;
  const [page, setPage] = useState<PageCallback | null>(null);
  const prevPageBboxes = usePrevious({ page, treeElementsBboxes });
  const intersectionRef = useRef(null);
  const [bboxesAll, setBboxesAll] = useState<IBbox[]>([]);
  const [bboxesErrors, setBboxesErrors] = useState<Array<IBbox | null>>([]);
  const [loaded, setLoaded] = useState(false);
  const [pageScale, setPageScale] = useState(scale);
  const [pageViewport, setPageViewport] = useState<number[]>([]);
  const [isRendered, setIsRendered] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);
  useIntersection(intersectionRef, {
    threshold: [.2, .4, .5, .6, .8, 1],
  }, (entry) => {
    if (isIntersecting !== entry.isIntersecting) {
      setIsIntersecting(entry.isIntersecting);
    }
    if (intersectionRatio !== entry.intersectionRatio) {
      setIntersectionRatio(entry.intersectionRatio);
    }
  });

  const onPageClick = useCallback(() => {
    props.onBboxClick?.(null);
  }, []);
  const onBboxClick = useCallback((index: any, id: any) => (e: Event) => {
    e.stopPropagation();
    props.onBboxClick?.({ index, id });
  }, [props.onBboxClick]);
  const onPageRenderSuccess = useCallback(() => {
    setIsRendered(true);
    props.onPageRenderSuccess?.();
    document.querySelectorAll('.pdf-page_rendered img')?.forEach((img: any) => {
      if (img.alt.includes('Annotation')) {
        const index = img.src.lastIndexOf('/') + 1;
        const name = img.src.substr(index);
        img.src = require(`pdfjs-dist/web/images/${name}`) || img.src;
      }
    });
  }, []);
  const onPageLoadSuccess = useCallback((page: PageCallback) => {
    setPage(page);
    setIsRendered(true);
    setPageViewport(page.view);
    props.onPageLoadSuccess?.(page);
  }, [props.onPageLoadSuccess]);

  useEffect(() => {
    const triggeredByBboxList = prevPageBboxes
      && prevPageBboxes.page === page
      && prevPageBboxes.treeElementsBboxes === treeElementsBboxes;
    if (page) {
      if (triggeredByBboxList && !bboxList?.length) setBboxesErrors([]);
      else {
        Promise.all([page.getOperatorList(), page.getAnnotations()]).then(([operatorList, annotations]) => {
          const annotBBoxesAndOpPos = operatorList.argsArray[operatorList.argsArray.length - 3];
          const operationData = operatorList.argsArray[operatorList.argsArray.length - 2];
          const [positionData, noMCIDData, refPositionData] = operatorList.argsArray[operatorList.argsArray.length - 1];
          const annotsFormatted = getFormattedAnnotations(annotations);
          const errorBboxes = (bboxList ?? []).map((bbox) => {
            let opData = operationData,
                posData = positionData,
                nMcidData = noMCIDData;
            let left = 0, bottom = 0;
            const { annotIndex } = bbox;
            if (annotIndex != null) {
              left = annotations[annotIndex]?.rect[0] ?? 0;
              bottom = annotations[annotIndex]?.rect[1] ?? 0;
              opData = annotBBoxesAndOpPos[annotIndex]?.[0] ?? [];
              [posData, nMcidData] = annotBBoxesAndOpPos[annotIndex]?.[1] ?? [[], []];
            }

            if (bbox.mcidList) {
              bbox.location = parseMcidToBbox(
                bbox.mcidList,
                posData,
                refPositionData,
                annotsFormatted,
                page.view,
                page.rotate,
                left,
                bottom,
              );
              if (_.isEmpty(bbox.location)) {
                return null;
              }
            } else if (bbox.contentItemPath) {
              const contentItemsPath = bbox.contentItemPath.slice(2);
              let contentItemsBBoxes = nMcidData[bbox.contentItemPath[1]];
              try {
                contentItemsPath.forEach((ci, i) => {
                  if (contentItemsPath.length > i + 1 || !contentItemsBBoxes.final) {
                    contentItemsBBoxes = contentItemsBBoxes.contentItems[0];
                  }
                  contentItemsBBoxes = contentItemsBBoxes.contentItems[ci];
                });

                bbox.location = [
                  contentItemsBBoxes.contentItem.x + left,
                  contentItemsBBoxes.contentItem.y + bottom,
                  contentItemsBBoxes.contentItem.w,
                  contentItemsBBoxes.contentItem.h
                ];
              } catch (err) {
                console.log('NoMCIDDataParseError:', err.message || err);
                bbox.location = [0, 0, 0, 0];
              }
            }
            if (_.isNumber(bbox.operatorIndex) && _.isNumber(bbox.glyphIndex)) {
              bbox.location = getBboxForGlyph(bbox.operatorIndex, bbox.glyphIndex, opData, page.view, page.rotate, left, bottom);
            }

            return bbox;
          });
          if (!triggeredByBboxList) {
            const allBboxes = createAllBboxes(treeElementsBboxes, positionData, refPositionData, annotsFormatted, page.view, page.rotate);
            setBboxesAll(allBboxes);
          }
          setBboxesErrors(errorBboxes);
        });
      }
    }
  }, [page, bboxList, treeElementsBboxes]);
  useEffect(() => {
    if (!loaded && isIntersecting) {
      setLoaded(true);
    }
    props.onPageInViewport?.(props.page, { isIntersecting, intersectionRatio });
  }, [isIntersecting, intersectionRatio, loaded]);
  useEffect(() => {
    if (scrollInto.page === props.page) {
      (intersectionRef.current as unknown as HTMLElement)?.scrollIntoView();
    }
  }, [scrollInto]);
  useEffect(() => {
    const width = pageViewport[2] - pageViewport[0];
    const height = pageViewport[3] - pageViewport[1];
    if (props.width && width) {
      return setPageScale((props.width / width) * scale);
    } else if (props.height && height) {
      return setPageScale((props.height / height) * scale);
    }

    setPageScale(scale);
  }, [pageViewport, scale, props.width, props.height]);

  const isBboxSelected = useCallback((bbox: IBbox) => {
    const isBboxMode = !_.isNil(props.activeBboxIndex);
    const isErrorBboxSelected = bbox.index === props.activeBboxIndex;
    let isStructureBboxSelected;
    switch (props.treeBboxSelectionMode) {
      case TreeBboxSelectionMode.SELECTED_WITH_KIDS: {
        isStructureBboxSelected = bbox?.id === props?.activeBboxId || bbox?.id?.startsWith(`${props?.activeBboxId}:`);
        break;
      }
      case TreeBboxSelectionMode.SELECTED:
      default: isStructureBboxSelected = bbox?.id === props?.activeBboxId;
    }
    return isBboxMode ? isErrorBboxSelected : isStructureBboxSelected;
  }, [props.activeBboxIndex, props.activeBboxId]);
  const isBboxRelated = useCallback((bbox: IBbox) => {
    const [, , activeId] = props?.groupId?.split('-') || [];
    const [, , bboxId] = bbox?.groupId?.split('-') || [];
    return props.groupId ? activeId === bboxId && !isBboxSelected(bbox) : false;
  }, [props.groupId, isBboxSelected]);
  const isBboxStructured = useCallback((bbox: IBbox) => _.isNil(bbox.index), []);
  const isBboxDisabled = useCallback((bbox: IBbox) => {
    if (_.isNil(bbox)) return true;
    if (bbox.hasOwnProperty('isVisible')) return !bbox.isVisible;
    return !props.isTreeBboxesVisible;
  }, [props.isTreeBboxesVisible]);

  const bboxes = useMemo(() => {
    /*
      Sorting bboxes in descending order of area
      Note: if the area of error bbox equal to the area of structure bbox,
      then we assume that the structure bbox has a larger area
    */
    return [...bboxesAll, ...cleanArray(bboxesErrors)].sort(
      ({ location: locationAll }, { location: locationError }) => {
        const getArea = (arr: Array<number | string>): number => _.round(+arr[2], 4) * _.round(+arr[3], 4);
        const areaAll = locationAll ? getArea(locationAll) : 0;
        const areaError = locationError ? getArea(locationError) : 0;
        return areaAll < areaError ? 1 : (areaAll > areaError ? -1 : 0);
    }) as IBbox[];
  }, [bboxesErrors, bboxesAll]);
  const activeBboxes = useMemo(() => bboxes.filter((bbox) => {
    const isBboxMode = !_.isNil(props.activeBboxIndex);
    return isBboxMode ? bbox.index === props.activeBboxIndex : bbox?.id === props?.activeBboxId
  }), [props.activeBboxIndex, props.activeBboxId]);

  useEffect(
    useCallback(() => {
      if (activeBboxes && activeBboxes.length && activeBboxes.every((activeBbox) => checkIsBboxOutOfThePage(activeBbox, scale, props.page))) {
        props.onWarning?.(WARNING_CODES.BBOX_OUT_OF_THE_PAGE_VIEWPORT);
      }
    }, [activeBboxes, scale, props.page]),
  [activeBboxes]);

  return (
    <StyledPdfPage
      className={`pdf-page pdf-page_rendered${props.isPageSelected ? ' pdf-page_selected' : ''}`}
      data-page={props.page}
      onClick={onPageClick}
      height={!isRendered ? props.height || props.defaultHeight : undefined}
      width={!isRendered ? props.width || props.defaultWidth : undefined}
      scale={pageScale}
      ref={intersectionRef}
      colorScheme={props.colorScheme || {}}
    >
      {loaded ? <>
        <Page
          pageNumber={props.page}
          error={props.pageError}
          height={props.height}
          width={props.width}
          loading={props.pageLoading}
          inputRef={props.inputRef}
          renderAnnotationLayer={props.renderAnnotationLayer}
          renderForms={props.renderInteractiveForms}
          renderTextLayer={props.renderTextLayer}
          scale={props.scale}
          onLoadError={props.onPageLoadError}
          onLoadSuccess={onPageLoadSuccess}
          onRenderError={props.onPageRenderError}
          onRenderSuccess={onPageRenderSuccess}
          onGetAnnotationsSuccess={props.onGetAnnotationsSuccess}
          onGetAnnotationsError={props.onGetAnnotationsError}
          onGetTextSuccess={props.onGetTextSuccess}
          onGetTextError={props.onGetTextError}
          customTextRenderer={props.customTextRenderer}
        />
        {isRendered ? <div className="bbox-wrapper">
          {bboxes.map((bbox: IBbox, index) => (
            <Bbox
              key={index}
              bbox={bbox}
              onClick={onBboxClick(bbox.index, bbox.id)}
              disabled={isBboxDisabled(bbox)}
              structured={isBboxStructured(bbox)}
              selected={isBboxSelected(bbox)}
              related={isBboxRelated(bbox)}
              scale={pageScale}
              selectionMode={props.treeBboxSelectionMode}
              colorScheme={props.colorScheme}
            />
          ))}
        </div> : null}
      </> : null}
    </StyledPdfPage>
  );
}

export default memo(PdfPage);
