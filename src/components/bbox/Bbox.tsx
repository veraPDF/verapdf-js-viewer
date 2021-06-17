import React, {FC, memo, useMemo} from 'react';
import styled from 'styled-components';

import './bbox.scss';

const bboxBg = 'rgba(255, 255, 255, 0)';
const bboxBorder = 'grey';
const bboxBorderHover = 'orangered';
const bboxBgSelected = 'rgba(255, 69, 0, 0.5)';

export interface IBbox {
  location: (number | string)[];
  linked?: { page: number, index: number };
  index: number;
  mcidList?: number[];
}

export interface IColorScheme {
  border?: string;
  borderHovered?: string;
  borderSelected?: string;
  background?: string;
  backgroundSelected?: string;
  backgroundHovered?: string;
}

interface IBboxProps {
  bbox: IBbox;
  scale: number;
  selected?: boolean;
  colorScheme?: IColorScheme;
  onClick?(e: any): void;
}

interface IBboxDivProps {
  left: string;
  bottom: string;
  width: string;
  height: string;
  top?: string;
  colorScheme?: IColorScheme;
}

const BboxDiv = styled.div`
  left: ${(props: IBboxDivProps) => props.left};
  bottom: ${(props: IBboxDivProps) => props.bottom};
  height: ${(props: IBboxDivProps) => props.height};
  width: ${(props: IBboxDivProps) => props.width};
  top: ${(props: IBboxDivProps) => props.top};
  border-color: ${(props: IBboxDivProps) => props.colorScheme && props.colorScheme.border || bboxBorder};
  background-color: ${(props: IBboxDivProps) => props.colorScheme && props.colorScheme.background || bboxBg};
  &:hover {
    border-color: ${(props: IBboxDivProps) => props.colorScheme && props.colorScheme.borderHovered || bboxBorderHover};
    background-color: ${(props: IBboxDivProps) => props.colorScheme && props.colorScheme.backgroundHovered || bboxBg};
  }
  &.pdf-bbox_selected {
    border-color: ${(props: IBboxDivProps) => props.colorScheme && props.colorScheme.borderSelected || bboxBorderHover};
    background-color: ${(props: IBboxDivProps) => props.colorScheme && props.colorScheme.backgroundSelected || bboxBgSelected};
  }
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
  } ,[props.bbox.location, props.scale]);

  return <BboxDiv className={`pdf-bbox ${props.selected && 'pdf-bbox_selected'}`}
                  left={left}
                  bottom={bottom}
                  width={width}
                  height={height}
                  top={top}
                  colorScheme={props.colorScheme || {}}
                  onClick={props.onClick}
  />;
};

export default memo(Bbox);
