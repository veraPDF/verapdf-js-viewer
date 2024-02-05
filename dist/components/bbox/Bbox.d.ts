import React from 'react';
import './bbox.scss';
export interface IBbox {
    location: (number | string)[];
    id: string;
    isVisible?: boolean;
    index?: number;
    groupId?: string;
    bboxTitle?: string;
    mcidList?: number[];
    glyphIndex?: number;
    operatorIndex?: number;
    contentItemPath?: number[];
    area?: number;
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
export type TreeElementBbox = [Array<IMcidItem | undefined>, string];
declare const _default: React.NamedExoticComponent<IBboxProps>;
export default _default;
