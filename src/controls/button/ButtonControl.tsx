import React, {FC} from 'react';

import './buttonControl.scss';

interface IButtonProps {
  onClick?(): void;
  disabled?: boolean;
}

const ButtonControl: FC<IButtonProps> = (props) => {
  return (
    <button disabled={props.disabled} className="viewer-btn" onClick={props.onClick}>{props.children}</button>
  );
}

export default ButtonControl;
