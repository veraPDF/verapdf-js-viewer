import { FC } from 'react';
import { InputSize } from './enums/inputSize';
import './inputControl.scss';
interface IInputProps {
    value?: string | number;
    defaultValue?: string | number;
    size?: InputSize;
    onChange?(value: string | number): void;
    onBlur?(value: string | number): void;
    onEnter?(value: string | number): void;
}
declare const InputControl: FC<IInputProps>;
export default InputControl;
