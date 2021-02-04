import React, {FC, createContext, useState } from 'react';
import {useDebounce} from "react-use";

export const ViewerContext = createContext({} as {
  page: number,
  setPage(page: number): void,
  maxPage: number,
  setMaxPage(page: number): void,
  scrollIntoPage: number,
  setScrollIntoPage(page: number): void,
  showBboxes: boolean,
  setShowBboxes(show: boolean): void,
});

const ViewerProvider: FC = (props) => {
  const [tempPage, setTempPage] = useState(0);
  const [page, setPage] = useState(0);
  const [scrollIntoPage, setScrollIntoPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState(0);
  const [showBboxes, setShowBboxes] = useState(true);

  useDebounce(
    () => {
      setPage(tempPage);
    },
    30,
    [tempPage]
  );

  const context = {
    page,
    setPage: setTempPage,
    maxPage,
    setMaxPage,
    scrollIntoPage,
    setScrollIntoPage,
    showBboxes,
    setShowBboxes,
  };

  return <ViewerContext.Provider value={context}>{props.children}</ViewerContext.Provider>;
};

export default ViewerProvider;
