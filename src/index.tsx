import React, { FC } from 'react';

import PdfDocument, { IPdfDocumentProps } from './components/pdfDocument/PdfDocument';
import Toolbar, { IToolbarProps } from './components/toolbar/Toolbar';
import ViewerProvider from './components/viewerContext/ViewerContext';
import BboxPanel from './components/bboxPanel/BboxPanel';

import './styles.scss'

interface IPdfViewerProps extends IPdfDocumentProps, IToolbarProps {
  withToolbar?: boolean;
  withSidePanel?: boolean;
  className?: string
}

const App: FC<IPdfViewerProps> = (props) => {
  const { className = '', withToolbar = false, withSidePanel = false, ...pdfProps } = props;
  return (
    <ViewerProvider>
      <div className={`pdf-viewer ${className}`}>
        {withToolbar ? (
          <header className="pdf-viewer__header">
            <Toolbar
              onPageChange={props.onPageChange}
              showAllPages={props.showAllPages}
              scale={props.scale}
              onScaleChange={props.onScaleChange}
            />
          </header>
        ) : null}
        <section className="pdf-viewer__content">
          {withSidePanel ?
            <BboxPanel
              bboxMap={props.bboxMap}
              activeBboxIndex={props.activeBboxIndex}
              activePage={props.activePage}
              onBboxClick={props.onBboxClick}
          /> : null}
          <section className="pdf-viewer__document-section">
            <PdfDocument {...pdfProps} />
          </section>
        </section>
      </div>
    </ViewerProvider>
  );
}

export default App
