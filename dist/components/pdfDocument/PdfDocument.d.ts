import React from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { IDocumentProps } from './IDocumentProps';
import { IPageProps } from '../pdfPage/IPageProps';
import { TreeBboxSelectionMode } from '../../enums/treeBboxSelectionMode';
import { IBboxLocation } from '../../index';
import { IColorScheme } from '../bbox/Bbox';
import './pdfDocument.scss';
export interface IPdfDocumentProps extends IDocumentProps, IPageProps {
    showAllPages?: boolean;
    activeBboxIndex?: {
        index: number;
        zoom: boolean;
    };
    activeBboxId?: {
        id: string;
        zoom: boolean;
    };
    bboxes: IBboxLocation[];
    isTreeBboxesVisible: boolean;
    treeBboxSelectionMode?: TreeBboxSelectionMode;
    colorScheme?: IColorScheme;
    defaultHeight?: number;
    defaultWidth?: number;
    setScale?(scale: string): void;
    onPageRenderSuccess: () => void;
    autoScaleOptions?: {
        label: string;
        value: string;
    }[];
    onBboxesParsed?(pages: number[]): void;
    onPageChange?(page: number): void;
    onWarning?(warningCode: string): void;
    onSelectBbox(index: number | undefined): void;
}
declare const _default: React.NamedExoticComponent<IPdfDocumentProps>;
export default _default;
