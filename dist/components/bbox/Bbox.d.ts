import React from 'react';
import { TBbox } from '../../types/bbox';
import './bbox.scss';
interface IBboxProps {
    bbox: TBbox;
    scale: number;
    selected?: boolean;
    onClick?(e: any): void;
}
declare const _default: React.NamedExoticComponent<IBboxProps>;
export default _default;
