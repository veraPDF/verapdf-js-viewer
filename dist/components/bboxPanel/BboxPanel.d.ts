import { FC } from 'react';
import { TBbox } from '../../types/bbox';
import './bboxPanel.scss';
import { OrNull } from '../../types/generics';
import { TSelectedBboxData } from '../../types/selectedBboxData';
interface IBboxPanelProps {
    activeBboxPage?: number;
    activeBboxIndex?: number;
    onBboxClick?(data: OrNull<TSelectedBboxData>): void;
    bboxMap?: {
        [key: string]: TBbox[];
    };
}
declare const BboxPanel: FC<IBboxPanelProps>;
export default BboxPanel;
