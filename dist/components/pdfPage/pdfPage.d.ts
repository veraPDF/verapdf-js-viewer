import React from 'react';
import { IBbox, IColorScheme, TreeElementBbox } from '../bbox/Bbox';
import { IPageProps } from './IPageProps';
import { AnyObject } from '../../types/generics';
import { TTreeBboxSelectionMode } from '../../types/bboxData';
import './pdfPage.scss';
interface IPdfPageProps extends IPageProps {
    bboxList?: IBbox[];
    treeElementsBboxes?: TreeElementBbox[];
    treeBboxSelectionMode?: TTreeBboxSelectionMode;
    isTreeBboxesVisible: boolean;
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
