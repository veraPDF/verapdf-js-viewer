import React, { FC } from 'react';
import styled from 'styled-components';

import { TBbox } from '../../types/bbox';

import './bbox.scss';

interface IBboxProps {
  bbox: TBbox;
  selected?: boolean;
  onClick?(e: any): void;
}

interface IBboxDivProps {
  left: number;
  top: number;
  width: number;
  height: number;
}

const BboxDiv = styled.div`
  left: ${(props: IBboxDivProps) => props.left}px;
  top: ${(props: IBboxDivProps) => props.top}px;
  height: ${(props: IBboxDivProps) => props.height}px;
  width: ${(props: IBboxDivProps) => props.width}px;
`;

const Bbox: FC<IBboxProps> = (props) => {
  const [left, top, width, height]  = props.bbox;

  return <BboxDiv className={`pdf-bbox ${props.selected && 'pdf-bbox_selected'}`}
                  left={left}
                  top={top}
                  width={width}
                  height={height}
                  onClick={props.onClick}
  />;
};

export default Bbox;
