import { FC } from 'react';
import { IPdfDocumentProps } from './components/pdfDocument/PdfDocument';
import './styles.scss';
interface IPdfViewerProps extends IPdfDocumentProps {
    className?: string;
}
declare const App: FC<IPdfViewerProps>;
export default App;
