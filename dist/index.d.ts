import React from 'react';
import { IPdfDocumentProps } from './components/pdfDocument/pdfDocument';
import './styles.scss';
interface IPdfViewerProps extends IPdfDocumentProps {
    className?: string;
}
declare const App: React.FC<IPdfViewerProps>;
export default App;
