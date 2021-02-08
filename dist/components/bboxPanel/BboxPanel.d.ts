import { FC } from 'react';
import { TBbox } from '../../types/bbox';
import './bboxPanel.scss';
import { OrNull } from '../../types/generics';
import { TSelectedBboxData } from '../../types/selectedBboxData';
interface IBboxPanelProps {
    activePage?: number;
    activeBboxIndex?: number;
    onBboxClick?(data: OrNull<TSelectedBboxData>): void;
    bboxMap?: {
        [key: number]: TBbox[];
    };
}
declare const BboxPanel: FC<IBboxPanelProps>;
export default BboxPanel;
