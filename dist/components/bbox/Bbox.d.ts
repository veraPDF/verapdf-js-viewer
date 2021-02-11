import React from 'react';
import './bbox.scss';
export interface IBbox {
    location: (number | string)[];
    linked?: {
        page: number;
        index: number;
    };
    index: number;
}
interface IBboxProps {
    bbox: IBbox;
    scale: number;
    selected?: boolean;
    onClick?(e: any): void;
}
declare const _default: React.NamedExoticComponent<IBboxProps>;
export default _default;
