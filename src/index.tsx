import React, {FC, useMemo} from 'react';

import PdfDocument, { IPdfDocumentProps } from './components/pdfDocument/PdfDocument';
import ViewerProvider from './components/viewerContext/ViewerContext';
import {buildBboxMap} from './services/bboxService';

import './styles.scss'

export interface IBboxLocation {
  page: number;
  location: (number | string)[] | string;
}

interface IPdfViewerProps extends IPdfDocumentProps {
  bboxes?: IBboxLocation[];
  className?: string
}

const App: FC<IPdfViewerProps> = (props) => {
  const { className = '', bboxes = [], ...pdfProps } = props;
  const bboxMap = useMemo(() => buildBboxMap(bboxes), [bboxes]);
  return (
    <ViewerProvider>
      <div className={`pdf-viewer ${className}`}>
        <PdfDocument {...pdfProps} bboxMap={bboxMap}/>
      </div>
    </ViewerProvider>
  );
}

export default App
