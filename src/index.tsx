import React, { FC } from 'react';

import PdfDocument, { IPdfDocumentProps } from './components/pdfDocument/PdfDocument';
import ViewerProvider from './components/viewerContext/ViewerContext';

import './styles.scss'

export interface IBboxLocation {
  page: number;
  location: string;
  groupId?: string;
  bboxTitle: string;
}

interface IPdfViewerProps extends IPdfDocumentProps {
  bboxes: IBboxLocation[];
  className?: string
}

const App: FC<IPdfViewerProps> = (props) => {
  const { className = '', bboxes = [], ...pdfProps } = props;
  return (
    <ViewerProvider>
      <div className={`pdf-viewer ${className}`} role="button" tabIndex={0}>
        <PdfDocument {...pdfProps} bboxes={bboxes}/>
      </div>
    </ViewerProvider>
  );
}

export default App
