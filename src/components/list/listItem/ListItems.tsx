import React, {FC, useMemo} from 'react';

import './listItem.scss';

export interface IListItemProps {
  text: string;
  title?: string;
  isActive?: boolean;
  isOpen?: boolean;
  children?: IListItemProps[];
  onClick?(data: any): void;
}

const ListItem: FC<IListItemProps> = (props) => {
  const { text, title = '', isActive = false, onClick } = props;
  const className = useMemo(() => {
    const classList = ['viewer-list-item'];
    if (isActive) {
      classList.push('viewer-list-item_active');
    }

    if (props.children) {
      switch (props.isOpen) {
        case true:
          classList.push('viewer-list-item_opened');
          break
        default:
          classList.push('viewer-list-item_closed');
          break
      }
    }

    return classList.join(' ');
  }, [isActive, props.isOpen]);
  return (
    <li className={className}
        onClick={onClick}
    >
      {title ? <h4 className="viewer-list-item__title">{title}</h4> : null}
      <span className="viewer-list-item__text">{text}</span>
    </li>
  );
}

export default ListItem;
