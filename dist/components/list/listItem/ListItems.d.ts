import { FC } from 'react';
import './listItem.scss';
export interface IListItemProps {
    text: string;
    title?: string;
    isActive?: boolean;
    isOpen?: boolean;
    children?: IListItemProps[];
    onClick?(data: any): void;
}
declare const ListItem: FC<IListItemProps>;
export default ListItem;
