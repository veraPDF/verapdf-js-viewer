import { FC } from 'react';
import { SelectSize } from './enums/selectSize';
import { TSelectOption } from '../../types/selectOption';
import './selectControl.scss';
interface ISelectProps {
    size?: SelectSize;
    value?: string | number;
    options: TSelectOption[];
    onChange(value: string): void;
}
declare const SelectControl: FC<ISelectProps>;
export default SelectControl;
