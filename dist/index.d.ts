import { FC } from 'react';
import { IPdfDocumentProps } from './components/pdfDocument/PdfDocument';
import { IToolbarProps } from './components/toolbar/Toolbar';
import './styles.scss';
interface IPdfViewerProps extends IPdfDocumentProps, IToolbarProps {
    withToolbar?: boolean;
    withSidePanel?: boolean;
    className?: string;
}
declare const App: FC<IPdfViewerProps>;
export default App;
