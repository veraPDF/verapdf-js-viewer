import React from 'react';
import './bbox.scss';
export interface IBbox {
    location: (number | string)[];
    linked?: {
        page: number;
        index: number;
    };
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
declare const _default: React.NamedExoticComponent<IBboxProps>;
export default _default;
