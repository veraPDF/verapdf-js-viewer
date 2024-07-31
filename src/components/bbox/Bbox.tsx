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
  glyphIndex?: number;
  annotIndex?: number;
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
  selectionMode?: TreeBboxSelectionMode;
  onClick?(e: any): void;
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
    onClick,
  } = props;
  const { renderBbox } = useContext(ViewerContext);

  const [left, bottom, width, height, top] = useMemo(() => {
    return [
      (parseFloat(bbox.location[0] as string) * scale) + 'px',
      (bbox.location[3] === 'bottom'
          ? '0'
          : (parseFloat(bbox.location[1] as string) * scale) + 'px'),
      (parseFloat(bbox.location[2] as string) * scale) + 'px',
      (bbox.location[3] === 'top'
          ? 'auto'
          : (parseFloat(bbox.location[3] as string) * scale) + 'px'),
      bbox.location[3] === 'top'
          ? '0' : bbox.location[3] === 'bottom'
              ? `calc(100% - ${parseFloat(bbox.location[1] as string) * scale}px)`
              : 'auto',
    ]
  }, [bbox.location, scale]);

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
