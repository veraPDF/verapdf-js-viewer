import React, { FC, memo, useMemo } from 'react';
import styled from 'styled-components';

import './bbox.scss';

const bboxBorder = 'grey';
const bboxRelatedBorder = 'rgba(255,176,0,0.5)';
const bboxStructuredBorder = 'rgba(255,255,255,0)';
const bboxSelectedStructuredBorder = 'rgba(255,122,0,1)';

const bboxBorderHover = 'orangered';
const bboxStructuredBorderHover = 'rgba(255,122,0,1)';

const bboxBg = 'rgba(255,255,255,0)';
const bboxBgSelected = 'rgba(255,69,0,0.5)';
const bboxBgRelated = 'rgba(255,176,0,0.3)';
const bboxBgStructured = 'rgba(255,255,255,0)';
const bboxBgSelectedStructured = 'rgba(255,100,0,0.4)';

export interface IBbox {
  location: (number | string)[];
  id: string,
  isVisible?: boolean;
  index?: number;
  groupId?: string;
  bboxTitle?: string;
  mcidList?: number[];
  glyphIndex?: number;
  operatorIndex?: number;
  contentItemPath?: number[];
  area?: number,
}

export interface IMcidItem {
  mcid: number;
  pageIndex: number;
}

export interface IAnnotItem {
  pageIndex: number;
  annotIndex: number;
  rect: number[];
}

export interface IColorScheme {
  border?: string;
  borderHovered?: string;
  borderSelected?: string;
  borderRelated?: string;
  borderStructured?: string;
  borderSelectedStructured?: string;
  background?: string;
  backgroundHovered?: string;
  backgroundSelected?: string;
  backgroundRelated?: string;
  backgroundStructured?: string;
  backgroundSelectedStructured?: string;
}

interface IBboxProps {
  bbox: IBbox;
  disabled: boolean;
  selected?: boolean;
  related?: boolean;
  structured?: boolean;
  scale: number;
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

export type TreeElementBbox = [Array<IMcidItem | undefined>, string];

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
    background-color: ${(props: IBboxDivProps) => props.colorScheme && props.colorScheme.backgroundRelated || bboxBgRelated};
  }
  &.pdf-bbox_structured {
    &:hover {
      border-color: ${bboxStructuredBorderHover};
    }
    border-color: ${(props: IBboxDivProps) => props.colorScheme && props.colorScheme.borderStructured || bboxStructuredBorder};
    background-color: ${(props: IBboxDivProps) => props.colorScheme && props.colorScheme.backgroundStructured || bboxBgStructured};
  }
  &.pdf-bbox_structured_selected {
    border-color: ${(props: IBboxDivProps) => props.colorScheme && props.colorScheme.borderSelectedStructured || bboxSelectedStructuredBorder};
    background-color: ${(props: IBboxDivProps) => props.colorScheme && props.colorScheme.backgroundSelectedStructured || bboxBgSelectedStructured};
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
  }, [props.bbox.location, props.scale]);

  const isSelected = useMemo(() => props.selected ? ' pdf-bbox_selected' : '', [props.selected]);
  const isRelated = useMemo(() => props.related ? ' pdf-bbox_related' : '', [props.related]);
  const isDisabled = useMemo(() => props.disabled ? ' pdf-bbox_disabled' : '', [props.disabled]);
  const isStructured = useMemo(() => props.structured ? ' pdf-bbox_structured' : '', [props.structured]);
  const isStructuredSelected = useMemo(() => props.structured && props.selected ? ' pdf-bbox_structured_selected' : '', [props.structured, props.selected]);

  return <BboxDiv className={`pdf-bbox${isSelected}${isRelated}${isStructured}${isStructuredSelected}${isDisabled}`}
                  left={left}
                  bottom={bottom}
                  width={width}
                  height={height}
                  top={top}
                  colorScheme={props.colorScheme || {}}
                  title={props.bbox.bboxTitle}
                  aria-describedby={props.bbox.bboxTitle}
                  onClick={props.onClick}
  />;
};

export default memo(Bbox);
