import { FC } from 'react';
import { IPdfDocumentProps } from './components/pdfDocument/PdfDocument';
import './styles.scss';
export interface IBboxLocation {
    page: number;
    location: (number | string)[] | string;
    groupId?: string;
}
interface IPdfViewerProps extends IPdfDocumentProps {
    bboxes: IBboxLocation[];
    className?: string;
}
declare const App: FC<IPdfViewerProps>;
export default App;
