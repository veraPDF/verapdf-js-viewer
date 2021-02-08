import { FC } from 'react';
import { IListItemProps } from './listItem/ListItems';
import './list.scss';
interface IListProps {
    items?: IListItemProps[];
}
declare const List: FC<IListProps>;
export default List;
