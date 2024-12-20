import { IBboxLocation } from '../index';
import { AnyObject, OrNull } from '../types/generics';
import { IBbox, TreeElementBbox } from '../components/bbox/Bbox';
export declare const cleanArray: (arr: Array<AnyObject | null>) => AnyObject[];
export declare const getFormattedAnnotations: (annots: AnyObject) => AnyObject[];
export declare const buildBboxMap: (bboxes: IBboxLocation[], structure: AnyObject) => {};
export declare const parseTree: (tree: AnyObject | AnyObject[]) => AnyObject;
export declare const structurizeTree: (node: AnyObject) => OrNull<AnyObject>;
export declare const setTreeIds: (node: AnyObject, annotMap?: AnyObject, id?: string) => [OrNull<AnyObject>, AnyObject];
export declare const getMcidList: (node: AnyObject, mcidList?: TreeElementBbox[]) => TreeElementBbox[];
export declare const createBboxMap: (mcidList: TreeElementBbox[]) => AnyObject;
export declare const createAllBboxes: (bboxesAll: TreeElementBbox[] | undefined, pageMap: AnyObject, refMap: AnyObject, annotations: AnyObject, viewport: number[], rotateAngle: number) => IBbox[];
export declare const calculateLocationInStreamOperator: (location: string) => {
    pageIndex: number;
    operatorIndex: number;
    glyphIndex: number;
} | null;
export declare const getSelectedPageByLocation: (bboxLocation: string) => number;
export declare const getBboxPages: (bboxes: IBboxLocation[], structure: AnyObject) => any[];
export declare const checkIsBboxOutOfThePage: (bbox: IBbox, scale: number, page: number) => boolean;
export declare const getBboxForGlyph: (operatorIndex: number, glyphIndex: number, operationsList: number[][][], viewport: number[], rotateAngle: number, leftOffset: number, bottomOffset: number) => number[];
export declare const parseMcidToBbox: (listOfMcid: number[] | AnyObject[] | AnyObject, pageMap: AnyObject, refMap: AnyObject, annotations: AnyObject, viewport: number[], rotateAngle: number, left?: number, bottom?: number) => number[];
export declare const rotateViewport: (rotateAngle: number, viewport: number[]) => number[];
export declare const rotateCoordinates: (coords: number[], rotateAngle: number, viewport: number[]) => number[];
export declare const rotatePoint: (rotateAngle: number, point: number[], viewport: number[]) => number[];
export declare const activeBboxInViewport: () => boolean;
export declare const scrollToActiveBbox: () => void;
