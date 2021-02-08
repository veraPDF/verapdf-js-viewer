import React, {FC, useContext, useMemo, useState} from 'react';

import List from '../list/List';
import {TBbox} from '../../types/bbox';

import './bboxPanel.scss';
import {OrNull} from '../../types/generics';
import {TSelectedBboxData} from '../../types/selectedBboxData';
import {ViewerContext} from "../viewerContext/ViewerContext";
import {IListItemProps} from "../list/listItem/ListItems";

interface IBboxPanelProps {
  activePage?: number;
  activeBboxIndex?: number;
  onBboxClick?(data: OrNull<TSelectedBboxData>): void;
  bboxMap?: {
    [key: number]: TBbox[]
  },
}

const BboxPanel: FC<IBboxPanelProps> = (props) => {
  const { page, setScrollIntoPage } = useContext(ViewerContext);
  const { bboxMap = {} } = props;
  const [openedPage, setOpenedPage] = useState(0);
  const items = useMemo(() => {
    let bboxList: IListItemProps[] = [];
    Object.keys(bboxMap || {}).forEach((key: string) => {
      const pageNumber = parseInt(key);
      bboxList = [
        ...bboxList,
        {
          title: `Page ${pageNumber}`,
          text: `${bboxMap[pageNumber].length} items`,
          isActive: props.activePage === pageNumber && openedPage !== pageNumber,
          isOpen: openedPage === pageNumber,
          onClick(e) {
            e.stopPropagation();
            setOpenedPage(pageNumber === openedPage ? 0 : pageNumber);
          },
          children: bboxMap[key].map((bbox: TBbox, index: number) => {
            return {
              text: `${JSON.stringify(bbox)}`,
              title: '',
              isActive: props.activePage === pageNumber && props.activeBboxIndex === index,
              onClick: (e: Event) => {
                e.stopPropagation();
                if (page !== pageNumber) {
                  setScrollIntoPage(pageNumber);
                }
                props.onBboxClick?.({page: pageNumber, index});
              }
            };
          })
        }
      ];
    });

    return bboxList;
  }, [props.bboxMap, props.activePage, props.activeBboxIndex, page, openedPage]);

  return <section className="viewer-bbox-panel">
    <List items={items} />
  </section>;
}

export default BboxPanel;
