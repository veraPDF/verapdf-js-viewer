import React, {FC, memo, useEffect, useMemo} from 'react';
import styled from 'styled-components';

import './bbox.scss';

const bboxBg = 'rgba(255, 255, 255, 0)';
const bboxBorder = 'grey';
const bboxBorderHover = 'orangered';
const bboxRelatedBorder = 'rgba(255,176,0,0.5)';
const bboxBgSelected = 'rgba(255, 69, 0, 0.5)';
const bboxRelatedBackground = 'rgba(255,176,0,0.3)';

export interface IBbox {
  location: (number | string)[];
  index: number;
  groupId?: string;
  mcidList?: number[];
  glyphIndex?: number;
  operatorIndex?: number;
}

export interface IColorScheme {
  border?: string;
  borderHovered?: string;
  borderSelected?: string;
  borderRelated?: string;
  background?: string;
  backgroundSelected?: string;
  backgroundHovered?: string;
  backgroundRelated?: string;
}

interface IBboxProps {
  bbox: IBbox;
  related?: boolean;
  scale: number;
  selected?: boolean;
  colorScheme?: IColorScheme;
  onClick?(e: any): void;
  setActiveBbox?(bbox: IBbox | null): void;
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
  &.pdf-bbox_related {
    border-color: ${(props: IBboxDivProps) => props.colorScheme && props.colorScheme.borderRelated || bboxRelatedBorder};
    background-color: ${(props: IBboxDivProps) => props.colorScheme && props.colorScheme.backgroundRelated || bboxRelatedBackground};
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

  useEffect(() => {
    (props.selected || props.related) && props.setActiveBbox?.(props.bbox);
  }, [props.selected, props.bbox, props.related]);

  return <BboxDiv className={`pdf-bbox ${props.selected && 'pdf-bbox_selected'} ${props.related && 'pdf-bbox_related'}`}
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
