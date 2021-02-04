import React, { FC } from 'react';

import PdfDocument, { IPdfDocumentProps } from './components/pdfDocument/PdfDocument';
import Toolbar, { IToolbarProps } from './components/toolbar/Toolbar';
import ViewerProvider from './components/viewerContext/ViewerContext';

import './styles.scss'

interface IPdfViewerProps extends IPdfDocumentProps, IToolbarProps {
  withToolbar?: boolean;
  className?: string
}

const App: FC<IPdfViewerProps> = (props) => {
  const { className = '', withToolbar = false, stickyTop = undefined, ...pdfProps } = props;
  return (
    <ViewerProvider>
      <div className={`pdf-viewer ${className}`}>
        {withToolbar ? (
          <Toolbar
            stickyTop={stickyTop}
            onPageChange={props.onPageChange}
            showAllPages={props.showAllPages}
            scale={props.scale}
            onScaleChange={props.onScaleChange}
          />
        ) : null}
        <PdfDocument {...pdfProps} />
      </div>
    </ViewerProvider>
  );
}

export default App
