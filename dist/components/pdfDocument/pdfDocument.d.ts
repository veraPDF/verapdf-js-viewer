import React from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { IDocumentProps } from './IDocumentProps';
import { IPageProps } from '../pdfPage/IPageProps';
import { TTreeBboxSelectionMode } from '../../types/bboxData';
import { IBboxLocation } from '../../index';
import { IColorScheme } from '../bbox/Bbox';
import './pdfDocument.scss';
export interface IPdfDocumentProps extends IDocumentProps, IPageProps {
    showAllPages?: boolean;
    activeBboxIndex?: number;
    activeBboxId?: string;
    bboxes: IBboxLocation[];
    isTreeBboxesVisible: boolean;
    treeBboxSelectionMode?: TTreeBboxSelectionMode;
    colorScheme?: IColorScheme;
    onBboxesParsed?(pages: number[]): void;
    onPageChange?(page: number): void;
    onWarning?(warningCode: string): void;
    onSelectBbox(index: number | undefined): void;
}
declare const _default: React.NamedExoticComponent<IPdfDocumentProps>;
export default _default;
