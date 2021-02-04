import React from 'react';
import './toolbar.scss';
export interface IToolbarProps {
    scale?: number;
    showAllPages?: boolean;
    stickyTop?: number;
    onPageChange?(page: number): void;
    onScaleChange?(scale: number): void;
}
declare const _default: React.NamedExoticComponent<IToolbarProps>;
export default _default;
