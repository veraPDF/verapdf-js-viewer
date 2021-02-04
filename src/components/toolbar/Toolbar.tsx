import React, {FC, memo, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';

import {ViewerContext} from '../viewerContext/ViewerContext';
import InputControl from '../../controls/input/InputControl';
import {InputSize} from '../../controls/input/enums/inputSize';
import ButtonControl from '../../controls/button/ButtonControl';

import './toolbar.scss';
import SelectControl from "../../controls/select/SelectControl";
import {TSelectOption} from "../../types/selectOption";
import CheckboxControl from "../../controls/checkbox/CheckboxControl";

export interface IToolbarProps {
  scale?: number;
  showAllPages?: boolean;
  stickyTop?: number;
  onPageChange?(page: number): void;
  onScaleChange?(scale: number): void;
}

const StyledSection = styled.section`
  top: ${(props: { top?: number }) => props.top || 0}px;
`;

const Toolbar: FC<IToolbarProps> = (props) => {
  const { scale = 1 } = props;
  const { page, setPage, setScrollIntoPage, maxPage, showBboxes, setShowBboxes } = useContext(ViewerContext);
  const scaleOptions: TSelectOption[] = useMemo(() => {
    return [
      { value: .5, label: '50%' },
      { value: .75, label: '75%' },
      { value: 1, label: '100%' },
      { value: 1.25, label: '125%' },
      { value: 1.5, label: '150%' },
    ];
  }, []);
  const [pageValue, setPageValue] = useState<number>(page);
  const onNextPage = useCallback(() => {
    if (props.showAllPages) {
      setScrollIntoPage(page + 1);
    } else {
      setPage(page + 1);
    }
    props.onPageChange?.(page + 1);
  }, [page, props.showAllPages, props.onPageChange]);
  const onPrevPage = useCallback(() => {
    if (page <= 1) {
      return;
    }
    if (props.showAllPages) {
      setScrollIntoPage(page - 1);
    } else {
      setPage(page - 1);
    }
    props.onPageChange?.(page - 1);
  }, [page, props.showAllPages, props.onPageChange]);
  const onPageChange = useCallback((value: string) => {
    if (page !== parseInt(value)) {
      if (props.showAllPages) {
        setScrollIntoPage(parseInt(value));
      } else {
        setPage(parseInt(value));
      }
      props.onPageChange?.(parseInt(value));
    }
  }, [page]);
  const onScaleChange = useCallback((value: string) => {
    props.onScaleChange?.(parseFloat(value));
  }, []);
  const onShowBboxesChange = useCallback((checked: boolean) => {
    setShowBboxes(checked);
  }, []);
  useEffect(() => {
    setPageValue(page);
  }, [page])
  return (
    <StyledSection top={props.stickyTop} className="pdf-toolbar">
      <div className="pdf-toolbar__area pdf-toolbar__area_left">
        <ButtonControl disabled={pageValue < 2} onClick={onPrevPage}>Prev page</ButtonControl>
        <ButtonControl disabled={pageValue === maxPage} onClick={onNextPage}>Next page</ButtonControl>
        <InputControl defaultValue={pageValue} size={InputSize.Sm} onBlur={onPageChange} onEnter={onPageChange} />
        <span className="pdf-toolbar__label"> / {maxPage}</span>
      </div>
      <div className="pdf-toolbar__area pdf-toolbar__area_center">
        <SelectControl options={scaleOptions} onChange={onScaleChange} value={scale}/>
      </div>
      <div className="pdf-toolbar__area pdf-toolbar__area_right">
        <CheckboxControl label="Show bboxes" onChange={onShowBboxesChange} checked={showBboxes} />
      </div>
    </StyledSection>
  );
}

export default memo(Toolbar);
