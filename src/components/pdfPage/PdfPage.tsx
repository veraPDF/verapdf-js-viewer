import React, {FC, useCallback, useState, useRef, memo, useEffect, useContext,} from 'react';
import { Page } from 'react-pdf';
import { useIntersection } from 'use-intersection';
import styled from 'styled-components';

import Bbox, {IBbox, IColorScheme} from '../bbox/Bbox';
import { IPageProps } from './IPageProps';
import { ViewerContext } from '../viewerContext/ViewerContext';
import { AnyObject } from '../../types/generics';
import { parseMcidToBbox } from '../../services/bboxService';

import './pdfPage.scss';

interface IPdfPageProps extends IPageProps {
  bboxList?: IBbox[];
  defaultHeight?: number;
  defaultWidth?: number;
  structure?: AnyObject;
  colorScheme?: IColorScheme;
  groupId?: string;
  onPageInViewport?(page: number, data: { isIntersecting?: boolean, intersectionRatio?: number }): void;
}

const StyledPdfPage = styled.div`
  min-height: ${(props: { height?: number, width?: number, scale: number }) => props.height ? props.height*props.scale + 'px' : 'auto'};
  min-width: ${(props: { height?: number, width?: number, scale: number }) => props.width ? props.width*props.scale + 'px' : 'auto'};
`;

const PdfPage: FC<IPdfPageProps> = (props) => {
  const { scrollIntoPage } = useContext(ViewerContext);
  const { bboxList = [], scale = 1 } = props;
  const intersectionRef = useRef(null);
  const [bboxes, setBboxes] = useState<IBbox[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [pageScale, setPageScale] = useState(scale);
  const [pageViewport, setPageViewport] = useState([]);
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
  const onBboxClick = useCallback((index) => (e: Event) => {
    e.stopPropagation();
    props.onBboxClick?.({ index });
  }, [props.onBboxClick]);
  const onPageRenderSuccess = useCallback(() => {
    setIsRendered(true);
    props.onPageRenderSuccess?.();
  }, []);
  const onPageLoadSuccess = useCallback((page) => {
    setIsRendered(true);
    setPageViewport(page.view);
    Promise.all([page.getOperatorList(), page.getAnnotations()]).then(([operatorList, annotations]) => {
      const positionData = operatorList.argsArray[operatorList.argsArray.length - 1];
      const bboxes = bboxList.map((bbox) => {
        if (bbox.mcidList) {
          bbox.location = parseMcidToBbox(bbox.mcidList, positionData, annotations, page.view);
        }

        return bbox;
      });
      setBboxes(bboxes);
    });
    props.onPageLoadSuccess?.(page);
  }, [bboxList, props.width, props.height, scale]);

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
  const isBboxSelected = (bbox: IBbox) => props.activeBboxIndex === bbox.index;
  const isRelated = (bbox: IBbox) => props.groupId ? bbox.groupId === props.groupId && !isBboxSelected(bbox) : false;

  return (
    <StyledPdfPage
      className="pdf-page pdf-page_rendered"
      data-page={props.page}
      onClick={onPageClick}
      height={!isRendered ? props.height || props.defaultHeight : undefined}
      width={!isRendered ? props.width || props.defaultWidth : undefined}
      scale={pageScale}
      ref={intersectionRef}
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
          onLoadProgress={props.onPageLoadProgress}
          onLoadSuccess={onPageLoadSuccess}
          onRenderError={props.onPageRenderError}
          onRenderSuccess={onPageRenderSuccess}
          onGetAnnotationsSuccess={props.onGetAnnotationsSuccess}
          onGetAnnotationsError={props.onGetAnnotationsError}
          onGetTextSuccess={props.onGetTextSuccess}
          onGetTextError={props.onGetTextError}
        />
        {isRendered ? bboxes.map((bbox: IBbox, index) => (
          <Bbox key={index} bbox={bbox} onClick={onBboxClick(bbox.index)} selected={isBboxSelected(bbox)} related={isRelated(bbox)} scale={pageScale} colorScheme={props.colorScheme} />
        )) : null}
      </> : null}
    </StyledPdfPage>
  );
}

export default memo(PdfPage);
