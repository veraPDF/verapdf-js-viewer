import React from 'react';
import './bbox.scss';
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
}
declare const _default: React.NamedExoticComponent<IBboxProps>;
export default _default;
