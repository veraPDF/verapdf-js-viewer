import { FC } from 'react';
import { IPdfDocumentProps } from './components/pdfDocument/PdfDocument';
import { scrollToActiveBbox } from './services/bboxService';
import './styles.scss';
export interface IBboxLocation {
    page: number;
    location: string;
    groupId?: string;
    bboxTitle?: string;
}
interface IPdfViewerProps extends IPdfDocumentProps {
    bboxes: IBboxLocation[];
    className?: string;
}
declare const App: FC<IPdfViewerProps>;
export { scrollToActiveBbox, };
export default App;
