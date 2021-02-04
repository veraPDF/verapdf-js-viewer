import { FC } from 'react';
import './buttonControl.scss';
interface IButtonProps {
    onClick?(): void;
    disabled?: boolean;
}
declare const ButtonControl: FC<IButtonProps>;
export default ButtonControl;
