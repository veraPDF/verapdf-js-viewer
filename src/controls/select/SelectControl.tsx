import React, {FC, useCallback} from 'react';
import styled from 'styled-components';

import {SelectSize} from './enums/selectSize';
import {TSelectOption} from '../../types/selectOption';

import './selectControl.scss';

interface ISelectProps {
  size?: SelectSize;
  value?: string | number;
  options: TSelectOption[];
  onChange(value: string): void;
}

const StyledSelect = styled.select`
  width: ${(props: { width: string }) => props.width};
`;

const SelectControl: FC<ISelectProps> = (props) => {
  const { size = SelectSize.Md } = props;
  const onChange = useCallback((e) => {
    props.onChange(e.target.value);
  }, []);

  return (
    <StyledSelect className="viewer-select" width={size} value={props.value} onChange={onChange}>
      {props.options.map((option) =>
        <option key={option.value} value={option.value}>{option.label}</option>
      )}
    </StyledSelect>
  )
}

export default SelectControl;
