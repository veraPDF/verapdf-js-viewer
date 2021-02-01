import React from 'react'

import PdfDocument, { IPdfDocumentProps } from './components/pdfDocument/pdfDocument';

import './styles.scss'

interface IPdfViewerProps extends IPdfDocumentProps {
  className?: string
}

const App: React.FC<IPdfViewerProps> = (props) => {
  const { className = '', ...pdfProps } = props;
  return (
    <div className={`pdf-viewer ${className}`}>
      <PdfDocument {...pdfProps} />
    </div>
  );
}

export default App
