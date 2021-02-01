import React from 'react';
import { IPageProps } from './IPageProps';
import { TBbox } from '../../types/bbox';
import './pdfPage.scss';
interface IPdfPageProps extends IPageProps {
    bboxList?: TBbox[];
    defaultHeight?: number;
    defaultWidth?: number;
    onPageInViewport?(page: number): void;
}
declare const _default: React.NamedExoticComponent<IPdfPageProps>;
export default _default;
