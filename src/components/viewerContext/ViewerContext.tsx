import React, {FC, createContext, useState } from 'react';

export const ViewerContext = createContext({} as {
  page: number,
  setPage(page: number): void,
  maxPage: number,
  setMaxPage(page: number): void,
  scrollIntoPage: number,
  setScrollIntoPage(page: number): void,
});

const ViewerProvider: FC = (props) => {
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
  };

  return <ViewerContext.Provider value={context}>{props.children}</ViewerContext.Provider>;
};

export default ViewerProvider;
