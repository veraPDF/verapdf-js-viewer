import React, {FC, memo} from 'react';
import styled from 'styled-components';

import { TBbox } from '../../types/bbox';

import './bbox.scss';

interface IBboxProps {
  bbox: TBbox;
  scale: number;
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
                  left={left * props.scale}
                  top={top * props.scale}
                  width={width * props.scale}
                  height={height * props.scale}
                  onClick={props.onClick}
  />;
};

export default memo(Bbox);
