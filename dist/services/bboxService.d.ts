import { IBboxLocation } from '../index';
import { AnyObject } from '../types/generics';
export declare const buildBboxMap: (bboxes: IBboxLocation[], structure: AnyObject) => {};
export declare const getBboxPages: (bboxes: IBboxLocation[], structure: AnyObject) => any[];
export declare const parseMcidToBbox: (listOfMcid: number[] | AnyObject, pageMap: AnyObject, annotations: AnyObject) => any[];
export declare const activeBboxInViewport: () => boolean;
