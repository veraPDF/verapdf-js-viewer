import React, {FC, useCallback, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useKey } from 'react-use';

import {InputSize} from './enums/inputSize';
import {OrNull} from '../../types/generics';

import './inputControl.scss';

interface IInputProps {
  value?: string | number;
  defaultValue?: string | number;
  size?: InputSize;
  onChange?(value: string | number): void;
  onBlur?(value: string | number): void;
  onEnter?(value: string | number): void;
}

const StyledInput = styled.input`
  width: ${(props: { width: string }) => props.width};
`;

const InputControl: FC<IInputProps> = (props) => {
  const [value, setValue] = useState(props.defaultValue || '');
  const inputRef = useRef<OrNull<HTMLInputElement>>(null);
  const { size = InputSize.Auto } = props;
  const onChange = useCallback((e) => {
    if (!props.value) {
      setValue(e.target.value);
    }
    props.onChange?.(e.target.value);
  }, [props.onChange]);
  const onBlur = useCallback((e) => {
    props.onBlur?.(e.target.value);
  }, [props.onBlur]);

  if (props.onEnter) {
    useKey('Enter', () => props.onEnter?.(inputRef?.current?.value || ''));
  }

  useEffect(() => {
    setValue(props.defaultValue || '');
  }, [props.defaultValue]);

  return (
    <StyledInput ref={inputRef} onBlur={onBlur} className="viewer-input" value={props.value || value} width={size} onChange={onChange} />
  );
}

export default InputControl;
