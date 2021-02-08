import React, { FC } from 'react';

import ListItem, { IListItemProps } from './listItem/ListItems';

import './list.scss';

interface IListProps {
  items?: IListItemProps[];
}

const List: FC<IListProps> = (props) => {
  const { items = [] } = props;
  return <ul className="viewer-list">
    {items.map((item: IListItemProps, index) => (
        <React.Fragment key={index}>
          <ListItem {...item} />
          {item.children && item.isOpen ? item.children.map((child, childIndex) =>
            <ListItem {...child} key={index + '_' + childIndex} />
          ): null}
        </React.Fragment>
      )
    )}
  </ul>;
}

export default List;
