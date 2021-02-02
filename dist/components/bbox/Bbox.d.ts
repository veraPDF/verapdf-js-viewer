import { FC } from 'react';
import { TBbox } from '../../types/bbox';
import './bbox.scss';
interface IBboxProps {
    bbox: TBbox;
    selected?: boolean;
    onClick?(e: any): void;
}
declare const Bbox: FC<IBboxProps>;
export default Bbox;
