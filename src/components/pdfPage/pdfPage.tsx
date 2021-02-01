import React, {FC, useCallback, useEffect, useState, useRef, memo} from 'react';
import { Page } from 'react-pdf';
import { useIntersection } from 'use-intersection';
import styled from 'styled-components';

import Bbox from '../bbox/Bbox';
import { IPageProps } from './IPageProps';
import { TBbox } from '../../types/bbox';

import './pdfPage.scss';

interface IPdfPageProps extends IPageProps {
  bboxList?: TBbox[];
  defaultHeight?: number;
  defaultWidth?: number;
  onPageInViewport?(page: number): void;
}

const StyledPdfPage = styled.div`
  min-height: ${(props: { height?: number | boolean, width?: number | boolean }) => props.height ? props.height + 'px' : 'auto'};
  min-width: ${(props: { height?: number | boolean, width?: number | boolean }) => props.width ? props.width + 'px' : 'auto'};
`;

const PdfPage: FC<IPdfPageProps> = (props) => {
  const { bboxList = [] } = props;
  const intersectionRef = useRef(null);
  const [isRendered, setIsRendered] = useState(false);
  const intersection = useIntersection(intersectionRef, {
    once: true,
  });

  const onPageClick = useCallback(() => {
    props.onBboxClick?.(null);
  }, []);
  const onBboxClick = useCallback((index) => (e: Event) => {
    e.stopPropagation();
    props.onBboxClick?.({ page: props.page, index })
  }, [props.onBboxClick]);
  const onPageRenderSuccess = useCallback(() => {
    setIsRendered(true);
    props.onPageRenderSuccess?.();
  }, []);

  useEffect(() => {
    if (intersection) {
      props.onPageInViewport?.(props.page);
    }
  }, [intersection])
  const isBboxSelected = (index: number) => props.activeBbox === index;

  return (
    <StyledPdfPage
      className="pdf-page pdf-page_rendered"
      data-page={props.page}
      onClick={onPageClick}
      height={!isRendered ? props.defaultHeight : undefined}
      width={!isRendered ? props.defaultWidth : undefined}
      ref={intersectionRef}
    >
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
        onLoadSuccess={props.onPageLoadSuccess}
        onRenderError={props.onPageRenderError}
        onRenderSuccess={onPageRenderSuccess}
        onGetAnnotationsSuccess={props.onGetAnnotationsSuccess}
        onGetAnnotationsError={props.onGetAnnotationsError}
        onGetTextSuccess={props.onGetTextSuccess}
        onGetTextError={props.onGetTextError}
      />
      {isRendered ? bboxList.map((bbox: TBbox, index) => (
        <Bbox key={index} bbox={bbox} onClick={onBboxClick(index)} selected={isBboxSelected(index)} />
      )) : null}
    </StyledPdfPage>
  );
}

export default memo(PdfPage);
