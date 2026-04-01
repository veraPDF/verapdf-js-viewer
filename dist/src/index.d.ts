import { FC, ReactElement } from 'react';
import { IPdfDocumentProps } from './components/pdfDocument/PdfDocument';
import { scrollToActiveBbox } from './services/bboxService';
import { IRenderBboxProps } from "./components/bbox/Bbox";
import './styles.scss';
export interface IBboxLocation {
    page: number;
    location: string;
    isVisible?: boolean;
    groupId?: string;
    bboxTitle?: string;
}
interface IPdfViewerProps extends IPdfDocumentProps {
    bboxes: IBboxLocation[];
    className?: string;
    renderBbox?: (props: IRenderBboxProps) => ReactElement;
}
declare const App: FC<IPdfViewerProps>;
export { scrollToActiveBbox, };
export default App;
