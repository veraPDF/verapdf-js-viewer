import React, {FC, useCallback, useState, useRef, memo, useEffect, useContext, useMemo} from 'react';
import { Page, PDFPageProxy } from 'react-pdf';
import { useIntersection } from 'use-intersection';
import styled from 'styled-components';
import _ from 'lodash';

import Bbox, {IBbox, IColorScheme} from '../bbox/Bbox';
import { IPageProps } from './IPageProps';
import { ViewerContext } from '../viewerContext/ViewerContext';
import { AnyObject } from '../../types/generics';
import { getBboxForGlyph, parseMcidToBbox, createAllBboxes, checkIsBboxOutOfThePage } from '../../services/bboxService';
import { WARNING_CODES } from "../../services/constants";

import './pdfPage.scss';

interface IPdfPageProps extends IPageProps {
  bboxList?: IBbox[];
  bboxesAll?: AnyObject[][];
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
  const { scrollIntoPage } = useContext(ViewerContext);
  const { bboxList = [], scale = 1 } = props;
  const intersectionRef = useRef(null);
  const [bboxesAll, setBboxesAll] = useState<IBbox[]>([]);
  const [bboxesErrors, setBboxesErrors] = useState<IBbox[]>([]);
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
  const onPageLoadSuccess = useCallback((page: PDFPageProxy) => {
    setIsRendered(true);
    setPageViewport(page.view);
    Promise.all([page.getOperatorList(), page.getAnnotations()]).then(([operatorList, annotations]) => {
      const operationData = operatorList.argsArray[operatorList.argsArray.length - 2];
      const [positionData, noMCIDData] = operatorList.argsArray[operatorList.argsArray.length - 1];
      const allBboxes = createAllBboxes(props.bboxesAll ?? [[]], positionData, annotations, page.view, page.rotate);
      const errorBboxes = bboxList.map((bbox) => {
        if (bbox.mcidList) {
          bbox.location = parseMcidToBbox(bbox.mcidList, positionData, annotations, page.view, page.rotate);
        } else if (bbox.contentItemPath) {
          const contentItemsPath = bbox.contentItemPath.slice(2);
          let contentItemsBBoxes = noMCIDData[bbox.contentItemPath[1]];
          try {
            contentItemsPath.forEach((ci, i) => {
              if (contentItemsPath.length > i + 1 || !contentItemsBBoxes.final) {
                contentItemsBBoxes = contentItemsBBoxes.contentItems[0];
              }
              contentItemsBBoxes = contentItemsBBoxes.contentItems[ci];
            });

            bbox.location = [
              contentItemsBBoxes.contentItem.x,
              contentItemsBBoxes.contentItem.y,
              contentItemsBBoxes.contentItem.w,
              contentItemsBBoxes.contentItem.h
            ];
          } catch (err) {
            console.log('NoMCIDDataParseError:', err.message || err);
            bbox.location = [0, 0, 0, 0];
          }
        }
        if (_.isNumber(bbox.operatorIndex) && _.isNumber(bbox.glyphIndex)) {
          bbox.location = getBboxForGlyph(bbox.operatorIndex, bbox.glyphIndex, operationData, page.view, page.rotate);
        }

        return bbox;
      });
      setBboxesAll(allBboxes);
      setBboxesErrors(errorBboxes);
    });
    props.onPageLoadSuccess?.(page);
  }, [bboxList, props.bboxesAll, props.width, props.height, scale]);

  useEffect(() => {
    if (!loaded && isIntersecting) {
      setLoaded(true);
    }
    props.onPageInViewport?.(props.page, { isIntersecting, intersectionRatio });
  }, [isIntersecting, intersectionRatio, loaded])
  useEffect(() => {
    if (scrollIntoPage === props.page) {
      (intersectionRef.current as unknown as HTMLElement)?.scrollIntoView();
    }
  }, [scrollIntoPage]);
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
    return isBboxMode ? bbox.index === props.activeBboxIndex : bbox?.id === props?.activeBboxId;
  }, [props.activeBboxIndex, props.activeBboxId]);
  const isRelated = useCallback((bbox: IBbox) => {
    const [, , activeId] = props?.groupId?.split('-') || [];
    const [, , bboxId] = bbox?.groupId?.split('-') || [];
    return props.groupId ? activeId === bboxId && !isBboxSelected(bbox) : false;
  }, [props.groupId, isBboxSelected]);
  const isBboxStructured = useCallback((bbox: IBbox) => _.isNil(bbox.index), []);
  const bboxes = useMemo(() => [...bboxesAll, ...bboxesErrors], [bboxesErrors, bboxesAll]);
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
          renderInteractiveForms={props.renderInteractiveForms}
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
        />
        {isRendered ? bboxes.map((bbox: IBbox, index) => (
          <Bbox
            key={index}
            bbox={bbox}
            onClick={onBboxClick(bbox.index, bbox.id)}
            structured={isBboxStructured(bbox)}
            selected={isBboxSelected(bbox)}
            related={isRelated(bbox)}
            scale={pageScale}
            colorScheme={props.colorScheme} />
        )) : null}
      </> : null}
    </StyledPdfPage>
  );
}

export default memo(PdfPage);
