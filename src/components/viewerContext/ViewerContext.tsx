import React, { FC, createContext, useState, ReactNode, ReactElement, useCallback } from 'react';
import { IRenderBboxProps } from "../bbox/Bbox";

export const ViewerContext = createContext({} as {
  page: number,
  setPage(page: number): void,
  maxPage: number,
  setMaxPage(page: number): void,
  scrollInto: { page: number },
  setScrollIntoPage(page: number): void,
  renderBbox?: (props: IRenderBboxProps) => ReactElement,
});

const ViewerProvider: FC<{children: ReactNode, renderBbox?: (props: IRenderBboxProps) => ReactElement}> = ({renderBbox, children}) => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [scrollInto, setScrollInto] = useState<{ page: number }>({ page: 0 });
  const setScrollIntoPage = useCallback((page: number) => setScrollInto({ page }), [setScrollInto]);

  const context = {
    page,
    setPage,
    maxPage,
    setMaxPage,
    scrollInto,
    setScrollIntoPage,
    renderBbox,
  };

  return <ViewerContext.Provider value={context}>{children}</ViewerContext.Provider>;
};

export default ViewerProvider;
