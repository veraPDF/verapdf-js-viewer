import { FC } from 'react';
import './checkboxControl.scss';
interface ICheckboxProps {
    label?: string;
    checked?: boolean;
    onChange(checked: boolean): void;
}
declare const CheckboxControl: FC<ICheckboxProps>;
export default CheckboxControl;
