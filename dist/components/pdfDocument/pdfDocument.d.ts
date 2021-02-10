import React from 'react';
import { IDocumentProps } from './IDocumentProps';
import { IPageProps } from '../pdfPage/IPageProps';
import { TBbox } from '../../types/bbox';
import './pdfDocument.scss';
export interface IPdfDocumentProps extends IDocumentProps, IPageProps {
    showAllPages?: boolean;
    activeBboxPage?: number;
    activeBboxIndex?: number;
    bboxMap?: {
        [key: number]: TBbox[];
    };
    onPageChange?(page: number): void;
}
declare const _default: React.NamedExoticComponent<IPdfDocumentProps>;
export default _default;
