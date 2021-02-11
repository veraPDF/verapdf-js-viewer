import React from 'react';
import { IDocumentProps } from './IDocumentProps';
import { IPageProps } from '../pdfPage/IPageProps';
import './pdfDocument.scss';
import { IBbox } from "../bbox/Bbox";
export interface IPdfDocumentProps extends IDocumentProps, IPageProps {
    showAllPages?: boolean;
    activeBboxIndex?: number;
    bboxMap?: {
        [page: number]: IBbox[];
    };
    onPageChange?(page: number): void;
}
declare const _default: React.NamedExoticComponent<IPdfDocumentProps>;
export default _default;
