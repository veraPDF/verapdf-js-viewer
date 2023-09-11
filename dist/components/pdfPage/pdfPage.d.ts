import React from 'react';
import { IBbox, IColorScheme } from '../bbox/Bbox';
import { IPageProps } from './IPageProps';
import { AnyObject } from '../../types/generics';
import './pdfPage.scss';
interface IPdfPageProps extends IPageProps {
    bboxList?: IBbox[];
    defaultHeight?: number;
    defaultWidth?: number;
    structure?: AnyObject;
    colorScheme?: IColorScheme;
    groupId?: string;
    onPageInViewport?(page: number, data: {
        isIntersecting?: boolean;
        intersectionRatio?: number;
    }): void;
    isPageSelected?: boolean;
    onWarning?(warningCode: string): void;
}
declare const _default: React.NamedExoticComponent<IPdfPageProps>;
export default _default;
