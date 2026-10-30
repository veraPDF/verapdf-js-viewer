import { TreeBboxSelectionMode } from '../../enums/treeBboxSelectionMode';
import { CustomBBox } from '../../services/bboxService';
import { AnyObject } from '../../types/generics';
import { IBbox, IColorScheme, TreeElementBbox } from '../bbox/Bbox';
import { IPageProps } from './IPageProps';
import './pdfPage.scss';
interface IPdfPageProps extends Omit<IPageProps, 'onPageRenderSuccess'> {
    bboxList?: IBbox[];
    treeElementsBboxes?: TreeElementBbox[];
    treeBboxSelectionMode?: TreeBboxSelectionMode;
    customBbox?: CustomBBox;
    customBboxes?: CustomBBox[];
    isTreeBboxesVisible: boolean;
    defaultHeight?: number;
    defaultWidth?: number;
    structure?: AnyObject;
    colorScheme?: IColorScheme;
    groupId?: string;
    onPageRenderSuccess: (ref: HTMLDivElement) => void;
    onPageInViewport?(page: number, data: {
        isIntersecting?: boolean;
        intersectionRatio?: number;
    }): void;
    isPageSelected?: boolean;
    onWarning?(warningCode: string): void;
}
declare const _default: import("react").NamedExoticComponent<IPdfPageProps>;
export default _default;
