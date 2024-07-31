import React, { FC, createContext, useState, ReactNode, ReactElement } from 'react';
import { IRenderBboxProps } from "../bbox/Bbox";

export const ViewerContext = createContext({} as {
  page: number,
  setPage(page: number): void,
  maxPage: number,
  setMaxPage(page: number): void,
  scrollIntoPage: number,
  setScrollIntoPage(page: number): void,
  renderBbox?: (props: IRenderBboxProps) => ReactElement,
});

const ViewerProvider: FC<{children: ReactNode, renderBbox?: (props: IRenderBboxProps) => ReactElement}> = ({renderBbox, children}) => {
  const [page, setPage] = useState(1);
  const [scrollIntoPage, setScrollIntoPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState(0);

  const context = {
    page,
    setPage,
    maxPage,
    setMaxPage,
    scrollIntoPage,
    setScrollIntoPage,
    renderBbox,
  };

  return <ViewerContext.Provider value={context}>{children}</ViewerContext.Provider>;
};

export default ViewerProvider;
