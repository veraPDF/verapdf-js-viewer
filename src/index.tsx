import React, { FC } from 'react';

import PdfDocument, { IPdfDocumentProps } from './components/pdfDocument/PdfDocument';
import ViewerProvider from './components/viewerContext/ViewerContext';

import './styles.scss'

interface IPdfViewerProps extends IPdfDocumentProps {
  className?: string
}

const App: FC<IPdfViewerProps> = (props) => {
  const { className = '', ...pdfProps } = props;
  return (
    <ViewerProvider>
      <div className={`pdf-viewer ${className}`}>
        <PdfDocument {...pdfProps} />
      </div>
    </ViewerProvider>
  );
}

export default App
