import React, {FC, memo, useEffect, useRef} from 'react';
import { useIntersection } from 'use-intersection';
import styled from 'styled-components';

import './pdfPage.scss';

interface IEmptyPageProps {
  height?: number;
  width?: number;
  page: number;
  onPageInViewport?(page: number): void;
}

const StyledEmptyPage = styled.div`
  min-height: ${(props: { height?: number, width?: number }) => props.height ? props.height + 'px' : 'auto'};
  min-width: ${(props: { height?: number, width?: number }) => props.width ? props.width + 'px' : 'auto'};
`;

const EmptyPage: FC<IEmptyPageProps> = (props) => {
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    once: true,
  });

  useEffect(() => {
    if (intersection) {
      props.onPageInViewport?.(props.page);
    }
  }, [intersection])

  return (
    <StyledEmptyPage
      className="pdf-page"
      height={props.height}
      width={props.width}
      data-page={props.page}
      ref={intersectionRef}
    />
  );
}

export default memo(EmptyPage);
