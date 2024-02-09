import React from 'react';
import { IBbox, IColorScheme, TreeElementBbox } from '../bbox/Bbox';
import { IPageProps } from './IPageProps';
import { TreeBboxSelectionMode } from '../../enums/treeBboxSelectionMode';
import { AnyObject } from '../../types/generics';
import './pdfPage.scss';
interface IPdfPageProps extends IPageProps {
    bboxList?: IBbox[];
    treeElementsBboxes?: TreeElementBbox[];
    treeBboxSelectionMode?: TreeBboxSelectionMode;
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
