import React, {FC, memo, useMemo} from 'react';
import styled from 'styled-components';

import './bbox.scss';

export interface IBbox {
  location: (number | string)[];
  linked?: { page: number, index: number };
  index: number;
  mcidList?: number[];
}

interface IBboxProps {
  bbox: IBbox;
  scale: number;
  selected?: boolean;
  onClick?(e: any): void;
}

interface IBboxDivProps {
  left: string;
  bottom: string;
  width: string;
  height: string;
  top?: string;
}

const BboxDiv = styled.div`
  left: ${(props: IBboxDivProps) => props.left};
  bottom: ${(props: IBboxDivProps) => props.bottom};
  height: ${(props: IBboxDivProps) => props.height};
  width: ${(props: IBboxDivProps) => props.width};;
  top: ${(props: IBboxDivProps) => props.top};
`;

const Bbox: FC<IBboxProps> = (props) => {
  const [left, bottom, width, height, top] = useMemo(() => {
    return [
      (parseFloat(props.bbox.location[0] as string) * props.scale) + 'px',
      (props.bbox.location[3] === 'bottom'
        ? '0'
        : (parseFloat(props.bbox.location[1] as string) * props.scale) + 'px'),
      (parseFloat(props.bbox.location[2] as string) * props.scale) + 'px',
      (props.bbox.location[3] === 'top'
        ? 'auto'
        : (parseFloat(props.bbox.location[3] as string) * props.scale) + 'px'),
      props.bbox.location[3] === 'top'
        ? '0' : props.bbox.location[3] === 'bottom'
        ? `calc(100% - ${parseFloat(props.bbox.location[1] as string) * props.scale}px)`
        : 'auto',
    ]
  } ,[props.bbox.location]);

  return <BboxDiv className={`pdf-bbox ${props.selected && 'pdf-bbox_selected'}`}
                  left={left}
                  bottom={bottom}
                  width={width}
                  height={height}
                  top={top}
                  onClick={props.onClick}
  />;
};

export default memo(Bbox);
