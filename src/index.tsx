import React, { FC, ReactElement } from 'react';

import PdfDocument, { IPdfDocumentProps } from './components/pdfDocument/PdfDocument';
import ViewerProvider from './components/viewerContext/ViewerContext';
import { scrollToActiveBbox } from './services/bboxService';
import { IRenderBboxProps } from "./components/bbox/Bbox";

import './styles.scss'

export interface IBboxLocation {
  page: number;
  location: string;
  isVisible?: boolean;
  groupId?: string;
  bboxTitle?: string;
}

interface IPdfViewerProps extends IPdfDocumentProps {
  bboxes: IBboxLocation[];
  className?: string;
  renderBbox?: (props: IRenderBboxProps) => ReactElement;
}

const App: FC<IPdfViewerProps> = (props) => {
  const { className = '', bboxes = [], renderBbox, ...pdfProps } = props;

  return (
    <ViewerProvider renderBbox={renderBbox}>
      <div className={`pdf-viewer ${className}`} role="button" tabIndex={0}>
        <PdfDocument {...pdfProps} bboxes={bboxes}/>
      </div>
    </ViewerProvider>
  );
}

export {
  scrollToActiveBbox,
}

export default App
