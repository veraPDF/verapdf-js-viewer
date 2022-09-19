import { IBboxLocation } from '../index';
import { AnyObject } from '../types/generics';
import { IBbox } from "../components/bbox/Bbox";
export declare const buildBboxMap: (bboxes: IBboxLocation[], structure: AnyObject) => {};
export declare const calculateLocationInStream: (location: string) => {
    pageIndex: number;
    operatorIndex: number;
    glyphIndex: number;
};
export declare const getSelectedPageByLocation: (bboxLocation: string) => number;
export declare const getBboxPages: (bboxes: IBboxLocation[], structure: AnyObject) => any[];
export declare const checkIsBboxOutOfThePage: (bbox: IBbox, scale: number) => boolean;
export declare const getBboxForGlyph: (operatorIndex: number, glyphIndex: number, operationsList: number[][][], viewport: number[], rotateAngle: number) => number[];
export declare const parseMcidToBbox: (listOfMcid: number[] | AnyObject, pageMap: AnyObject, annotations: AnyObject, viewport: number[], rotateAngle: number) => number[];
export declare const rotateViewport: (rotateAngle: number, viewport: number[]) => number[];
export declare const rotateCoordinates: (coords: number[], rotateAngle: number, viewport: number[]) => number[];
export declare const rotatePoint: (rotateAngle: number, point: number[], viewport: number[]) => number[];
export declare const activeBboxInViewport: () => boolean;
export declare const scrollToActiveBbox: () => void;
