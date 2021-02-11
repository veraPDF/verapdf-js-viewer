import React from 'react';
import { IBbox } from '../bbox/Bbox';
import { IPageProps } from './IPageProps';
import './pdfPage.scss';
interface IPdfPageProps extends IPageProps {
    bboxList?: IBbox[];
    defaultHeight?: number;
    defaultWidth?: number;
    onPageInViewport?(page: number, data: {
        isIntersecting?: boolean;
        intersectionRatio?: number;
    }): void;
}
declare const _default: React.NamedExoticComponent<IPdfPageProps>;
export default _default;
