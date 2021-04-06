import { IBboxLocation } from '../index';
import { AnyObject } from '../types/generics';
export declare const buildBboxMap: (bboxes: IBboxLocation[], structure: AnyObject) => {};
export declare const parseMcidToBbox: (listOfMcid: number[] | AnyObject, pageMap: AnyObject, annotations: AnyObject) => any[];
