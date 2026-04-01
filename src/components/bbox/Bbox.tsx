import React, { FC, memo, useContext, useMemo } from 'react';
import styled from 'styled-components';
import { TreeBboxSelectionMode } from '../../enums/treeBboxSelectionMode';
import { ViewerContext } from "../viewerContext/ViewerContext";

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
  annotIndex?: number;
  operatorIndex?: number;
  contentItemPath?: number[];
  subOperatorIndex?: number | '*';
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
  selectionMode?: TreeBboxSelectionMode;
  onClick?(e: any): void;
  pageBorders: { height?: number, width?: number };
}

export interface IRenderBboxProps {
  left: string;
  width: string;
  height: string;
  top: string;
  disabled: boolean;
  related?: boolean;
  selected?: boolean;
  structured?: boolean;
  scale: number;
  colorScheme?: IColorScheme;
  selectionMode?: TreeBboxSelectionMode;
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
  mix-blend-mode: normal;
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
  &.pdf-bbox_structured_selected_multiple {
    background-color: ${(props: IBboxDivProps) => props.colorScheme && props.colorScheme.background || bboxBg};
  }
`;

const clamp = (
  value: string | number,
  scale: number,
  {
    max,
    min = 0,
    offset = 0,
  }: {
    max?: number,
    min?: number,
    offset?: number,
  } = {}
) => {
  if (max === undefined) return Math.max((offset + +value) * scale, min);
  return Math.min(
    Math.max(
      (offset + +value) * scale,
      min,
    ),
    max,
  );
}

const Bbox: FC<IBboxProps> = (props: IBboxProps) => {
  const {
    bbox,
    disabled,
    selected,
    related,
    structured,
    scale,
    colorScheme,
    selectionMode,
    pageBorders,
    onClick,
  } = props;
  const { renderBbox } = useContext(ViewerContext);

  const [left, bottom, width, height, top] = useMemo(() => {
    const x0 = clamp(bbox.location[0], scale, { max: pageBorders.width });
    const y0 = clamp(bbox.location[1], scale, { max: pageBorders.height });
    const w = clamp(bbox.location[2], scale, { max: pageBorders.width, offset: +bbox.location[0] }) - x0;
    if (bbox.location[3] === 'bottom') return [`${x0}px`, '0', `${w}px`, 'auto', `calc(100% - ${y0}px)`];
    if (bbox.location[3] === 'top') return [`${x0}px`, `${y0}px`, `${w}px`, 'auto', '0'];
    const h = clamp(bbox.location[3], scale, { max: pageBorders.height, offset: +bbox.location[1] }) - y0;
    return [`${x0}px`, `${y0}px`, `${w}px`, `${h}px`, 'auto'];
  }, [bbox.location, scale, pageBorders.width, pageBorders.height]);

  const isSelected = useMemo(() => selected ? ' pdf-bbox_selected' : '', [selected]);
  const isRelated = useMemo(() => related ? ' pdf-bbox_related' : '', [related]);
  const isDisabled = useMemo(() => disabled ? ' pdf-bbox_disabled' : '', [disabled]);
  const isStructured = useMemo(() => structured ? ' pdf-bbox_structured' : '', [structured]);
  const isStructuredSelected = useMemo(() => structured && selected ? ' pdf-bbox_structured_selected' : '', [structured, selected]);
  const isStructuredSelectedMultiple = useMemo(() => {
    if (structured && selected && selectionMode === TreeBboxSelectionMode.SELECTED_WITH_KIDS) return ' pdf-bbox_structured_selected_multiple';
    else return '';
  }, [structured, selected, selectionMode]);

  if (renderBbox) {
    return renderBbox({
      left,
      width,
      height,
      top,
      colorScheme,
      disabled,
      related,
      selected,
      scale,
      selectionMode,
      structured,
      onClick,
    });
  }

  return <BboxDiv className={`pdf-bbox${isSelected}${isRelated}${isStructured}${isStructuredSelected}${isStructuredSelectedMultiple}${isDisabled}`}
                  left={left}
                  bottom={bottom}
                  width={width}
                  height={height}
                  top={top}
                  colorScheme={colorScheme || {}}
                  title={bbox.bboxTitle}
                  aria-describedby={bbox.bboxTitle}
                  onClick={onClick}
  />;
}

export default memo(Bbox);
