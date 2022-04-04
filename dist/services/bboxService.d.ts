import { IBboxLocation } from '../index';
import { AnyObject } from '../types/generics';
export declare const buildBboxMap: (bboxes: IBboxLocation[], structure: AnyObject) => {};
export declare const getBboxPages: (bboxes: IBboxLocation[], structure: AnyObject) => any[];
export declare const parseMcidToBbox: (listOfMcid: number[] | AnyObject, pageMap: AnyObject, annotations: AnyObject, viewport: number[], rotateAngle: number) => number[];
export declare const rotateViewport: (rotateAngle: number, viewport: number[]) => number[];
export declare const rotateCoordinates: (coords: number[], rotateAngle: number, viewport: number[]) => number[];
export declare const rotatePoint: (rotateAngle: number, point: number[], viewport: number[]) => number[];
export declare const activeBboxInViewport: () => boolean;
