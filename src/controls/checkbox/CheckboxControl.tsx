import React, {FC, useCallback} from 'react';

import './checkboxControl.scss';

interface ICheckboxProps {
  label?: string;
  checked?: boolean;
  onChange(checked: boolean): void;
}

const CheckboxControl: FC<ICheckboxProps> = (props) => {
  const { label = '' } = props;
  const onChange = useCallback((e) => {
    props.onChange(e.target.checked);
  }, []);
  return (
    <div className={`viewer-checkbox ${props.checked ? 'viewer-checkbox_checked' : ''}`}>
      <label className="viewer-checkbox__label">
        <input
          className="viewer-checkbox__control"
          type="checkbox"
          checked={props.checked}
          onChange={onChange} />
        {label}
      </label>
    </div>
  );
}

export default CheckboxControl;
