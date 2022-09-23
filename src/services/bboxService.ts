import _ from 'lodash';

import {IBboxLocation} from '../index';
import {AnyObject} from '../types/generics';
import {IBbox} from "../components/bbox/Bbox";

export const buildBboxMap = (bboxes: IBboxLocation[], structure: AnyObject) => {
  const bboxMap = {};
  bboxes.forEach((bbox, index) => {
    try {
      if (bbox.location.includes('contentStream') && bbox.location.includes('operators')) {
        const bboxPosition = calculateLocationInStreamOperator(bbox.location);
        if (!bboxPosition) {
            return;
        }
        bboxMap[bboxPosition.pageIndex + 1] = [
          ...(bboxMap[bboxPosition.pageIndex + 1] || []),
          {
            index,
            operatorIndex: bboxPosition.operatorIndex,
            glyphIndex: bboxPosition.glyphIndex,
          }
        ];
      } else if (bbox.location.includes('StructTreeRoot') || bbox.location.includes('root/doc') || bbox.location === 'root') {
        const mcidData = getTagsFromErrorPlace(bbox.location, structure);
        mcidData.forEach(([mcidList, pageIndex]) => {
          bboxMap[pageIndex + 1] = [
            ...(bboxMap[pageIndex + 1] || []),
            {
              index,
              mcidList,
              groupId: bbox.groupId || undefined,
            },
          ];
        });
      } else {
        const bboxesFromLocation = bbox.location.includes('pages[') ? calculateLocation(bbox.location as string) : calculateLocationJSON(bbox.location as string);
        bboxesFromLocation.forEach((bboxWithLocation: IBboxLocation) => {
          bboxMap[bboxWithLocation.page] = [
            ...(bboxMap[bboxWithLocation.page] || []),
            {
              index,
              location: bboxWithLocation.location,
              groupId: bbox.groupId || undefined,
            },
          ];
        })
      }
    } catch (e) {
      console.error(`Location not supported: ${bbox.location}`);
    }
  });
  return bboxMap;
}

export const calculateLocationInStreamOperator = (location: string) => {
  const path = location.split("/");
  let pageIndex = -1;
  let operatorIndex = -1;
  let glyphIndex = -1;
  path.forEach((step) => {
    if (step.startsWith('pages')) {
      pageIndex = parseInt(step.split(/[\[\]]/)[1]);
    }
    if (step.startsWith('operators')) {
      operatorIndex = parseInt(step.split(/[\[\]]/)[1]);
    }
    if (step.startsWith('usedGlyphs')) {
      glyphIndex = parseInt(step.split(/[\[\]]/)[1]);
    }
  });
  if (pageIndex === -1 || operatorIndex === -1 || glyphIndex === -1) {
      return null;
  }
  return {
    pageIndex,
    operatorIndex,
    glyphIndex
  }
}

export const getSelectedPageByLocation = (bboxLocation: string) => {
  const location = bboxLocation;
  const path = location.split('/')
  let pageNumber = -1;
  if (location?.includes('pages') && path[path.length - 1].startsWith('pages')) {
    location.split('/').forEach(nodeString => {
      if (nodeString.includes('pages')) {
        pageNumber = parseInt(nodeString.split(/[[\]]/)[1], 10) + 1;
      }
    });
  }
  return pageNumber;
}

export const getBboxPages = (bboxes: IBboxLocation[], structure: AnyObject) => {
  return bboxes.map((bbox) => {
    try {
      if (bbox.location.includes('StructTreeRoot') || bbox.location.includes('root/doc') || bbox.location === 'root') {
        const mcidData = getTagsFromErrorPlace(bbox.location, structure);
        const pageIndex = mcidData[0][1];
        return pageIndex + 1;
      } else {
        const bboxesFromLocation = bbox.location.includes('pages[') ? calculateLocation(bbox.location as string) : calculateLocationJSON(bbox.location as string);
        return bboxesFromLocation.length ? bboxesFromLocation[0].page : 0;
      }
    } catch (e) {
      console.error(`Location not supported: ${bbox.location}`);
    }
  });
}

export const checkIsBboxOutOfThePage = (bbox: IBbox, scale: number, page: number) => {
  const parent = (document.querySelector('.react-pdf__Page[data-page-number="' + page + '"]') as any);
  const parentHeight = parent.offsetHeight * scale;
  const parentWidth = parent.offsetWidth * scale;

  const left = parseFloat(bbox.location[0] as string) * scale;
  const top = parseFloat(bbox.location[1] as string) * scale;
  const width = parseFloat(bbox.location[2] as string) * scale;
  const height = parseFloat(bbox.location[3] as string) * scale;

  return (
      top <= 0 && (top + height) <= 1 ||
      left <= 0 && (left + width) <= 1 ||
      parentHeight - top <= 1 && (top + height) >= parentHeight ||
      parentWidth - left <= 1 && (left + width) >= parentWidth
  );
}

const calculateLocation = (location: string) => {
  const bboxes = [];
  const [pages, boundingBox] = location.split('/');
  const [start, end] = pages.replace('pages[', '').replace(']', '').split('-');
  const [x, y, x1, y1] = boundingBox.replace('boundingBox[', '').replace(']', '').split(',');
  const width = parseFloat(x1) - parseFloat(x);

  if (end) {
    for (let i = parseInt(start) + 1; i <= parseInt(end) + 1; i++) {
      switch (i) {
        case parseInt(start) + 1:
          bboxes.push({
            page: i,
            location: [parseFloat(x), parseFloat(y1), width, 'bottom'],
          });
          break;
        case parseInt(end) + 1:
          bboxes.push({
            page: i,
            location: [parseFloat(x), parseFloat(y), width, 'top'],
          });
          break;
        default:
          bboxes.push({
            page: i,
            location: [parseFloat(x), 0, width, 'top'],
          });
          break;
      }
    }
  } else {
    const height = parseFloat(y1) - parseFloat(y);
    bboxes.push({
      page: parseInt(start) + 1,
      location: [parseFloat(x), parseFloat(y), width, height],
    })
  }

  return bboxes;
}

const calculateLocationJSON = (location: string) => {
  const bboxes: AnyObject[] = [];
  const bboxMap = JSON.parse(location);

  bboxMap.bbox.forEach(({ p, rect }: {p: string, rect: string[]}) => {
    const [x, y, x1, y1] = rect;
    const width = parseFloat(x1) - parseFloat(x);
    const height = parseFloat(y1) - parseFloat(y);
    bboxes.push({
      page: parseFloat(p) + 1,
      location: [parseFloat(x), parseFloat(y), width, height],
    });
  });
  return bboxes;
}

const getTagsFromErrorPlace = (context: string, structure: AnyObject) => {
  const defaultValue = [[[], -1]];
  let selectedTag = convertContextToPath(context);

  if (_.isEmpty(selectedTag)) {
    return defaultValue;
  }

  if (selectedTag.hasOwnProperty('mcid') && selectedTag.hasOwnProperty('pageIndex')) {
    return [[[selectedTag.mcid], selectedTag.pageIndex]];
  } else if (selectedTag.hasOwnProperty('annot') && selectedTag.hasOwnProperty('pageIndex')) {
    return [[{ annot: selectedTag.annot }, selectedTag.pageIndex]];
  } else if (selectedTag instanceof Array) {
    let objectOfErrors = { ...structure };
    selectedTag.forEach((node, index) => {
      let nextStepObject;
      if (!objectOfErrors.children) {
        nextStepObject = objectOfErrors[node[0]];
      } else if (!(objectOfErrors.children instanceof Array)) {
        if (objectOfErrors.children.name === node[1]) {
          nextStepObject = objectOfErrors.children;
        } else {
          nextStepObject = objectOfErrors;
        }
      } else {
        if (objectOfErrors?.name === node[1] && index === 0) {
          nextStepObject = objectOfErrors;
        } else {
          const clearedChildrenArray = [...objectOfErrors.children].filter((tag: AnyObject) =>  !tag?.mcid);
          nextStepObject = { ...(clearedChildrenArray.length ? clearedChildrenArray : objectOfErrors.children)[node[0]] };
        }
      }

      objectOfErrors = { ...nextStepObject };
    });
    return findAllMcid(objectOfErrors);
  }
  return defaultValue;
}

/*
 *  Convert returning from veraPDF api path to error in array of nodes
 *
 *  @param errorContext {string} ugly path to error
 *
 *  @return arrayOfNodes {array} of nodes from Document to error Tag
 */
const convertContextToPath = (errorContext = '') => {
  let arrayOfNodes: AnyObject[] = [];
  if (!errorContext) {
    return arrayOfNodes;
  }

  let contextString: string | string[] = errorContext;

  try {
    if (contextString.includes('contentItem')) {
      let path: AnyObject = {};
      contextString.split('/').forEach(nodeString => {
        if (nodeString.includes('page')) {
          path.pageIndex = parseInt(nodeString.split(/[[\]]/)[1], 10);
        } else if (nodeString.includes('contentItem') && nodeString.includes('mcid')) {
          path.mcid = parseInt(nodeString.split('mcid:')[1].slice(0, -1), 10);
        }
      });
      return path;
    } else if (contextString.includes('annots')) {
      let path: AnyObject = {};
      contextString.split('/').forEach(nodeString => {
        if (nodeString.includes('page')) {
          path.pageIndex = parseInt(nodeString.split(/[[\]]/)[1], 10);
        } else if (nodeString.includes('annots')) {
          path.annot = parseInt(nodeString.split(/[[\]]/)[1], 10);
        }
      });
      return path;
    }

    contextString = contextString.split('PDStructTreeRoot)/')[1].split('/'); // cut path before start of Document

    contextString.forEach(nodeString => {
      const nextIndex = parseInt(nodeString.split('](')[0].split('K[')[1], 10);
      let nextTag: string | string[] = nodeString
        .split('(')[1]
        .split(')')[0]
        .split(' ');
      nextTag = nextTag[nextTag.length - 1];

      arrayOfNodes = [...arrayOfNodes, [nextIndex, nextTag]];
    });

    return arrayOfNodes;
  } catch (e) {
    return [];
  }
}

/*
 *  Going through object of tags from error placement and return array of its MCIDs
 *
 *  @param {Object} of tags
 *
 *  @return [[{Array}, {Number}]] - [[[array of mcids], page of error]]
 */
function findAllMcid(tagObject: AnyObject) {
  const mcidMap: any = {};

  function func(obj: AnyObject) {
    if (!obj) return;
    if (obj.mcid || obj.mcid === 0) {
      if (!mcidMap[obj.pageIndex]) mcidMap[obj.pageIndex] = [];
      mcidMap[obj.pageIndex].push(obj.mcid);
    }
    if (!obj.children) {
      return;
    }

    if (!(obj.children instanceof Array)) {
      func(obj.children);
    } else {
      [...obj.children].forEach(child => func(child));
    }
  }

  func(tagObject);

  return _.map(mcidMap, (value, key) => [value, _.toNumber(key)]);
}

export const getBboxForGlyph = (operatorIndex: number, glyphIndex: number, operationsList: number[][][], viewport: number[], rotateAngle: number) => {
  const bbox = operationsList[operatorIndex] ? operationsList[operatorIndex][glyphIndex] : null;
  if (!bbox) {
    return [];
  }
  const coordsArray = rotateCoordinates(bbox, rotateAngle, viewport);
  const rotatedViewport = rotateViewport(rotateAngle, viewport);
  return [coordsArray[0] - rotatedViewport[0], coordsArray[1] - rotatedViewport[1], coordsArray[2], coordsArray[3]];
}

export const parseMcidToBbox = (listOfMcid: number[] | AnyObject, pageMap: AnyObject, annotations: AnyObject, viewport: number[], rotateAngle: number) => {
  let coords: AnyObject = {};

  if (listOfMcid instanceof Array) {
    listOfMcid.forEach(mcid => {
      const currentBbox = pageMap[mcid];
      if (
        !_.isNil(currentBbox) &&
        !_.isNaN(currentBbox.x) &&
        !_.isNaN(currentBbox.y) &&
        !_.isNaN(currentBbox.width) &&
        !_.isNaN(currentBbox.height)
      ) {
        coords = concatBoundingBoxes(currentBbox, coords.x ? coords : undefined);
      }
    });
  } else if (listOfMcid.hasOwnProperty('annot')) {
    const rect = annotations[listOfMcid.annot]?.rect;
    if (rect) {
      coords = {
        x: rect[0],
        y: rect[1],
        width: Math.abs(rect[0] - rect[2]),
        height: Math.abs(rect[1] - rect[3]),
      };
    }
  }
  if (!coords) return [];
  const coordsArray = rotateCoordinates([coords.x, coords.y, coords.width, coords.height], rotateAngle, viewport);
  const rotatedViewport = rotateViewport(rotateAngle, viewport);
  return [coordsArray[0] - rotatedViewport[0], coordsArray[1] - rotatedViewport[1], coordsArray[2], coordsArray[3]];
}

export const rotateViewport = (rotateAngle: number, viewport: number[]): number[] => {
  if ([0, 180].includes(rotateAngle)) {
    return viewport;
  }
  return [viewport[1], viewport[0], viewport[3], viewport[2]];
}

export const rotateCoordinates = (coords: number[], rotateAngle: number, viewport: number[]): number[] => {
  if (rotateAngle === 0) return coords;
  const [x1, y1] = rotatePoint(rotateAngle, [coords[0], coords[1]], viewport);
  const [x2, y2] = rotatePoint(rotateAngle, [coords[0] + coords[2], coords[1] + coords[3]], viewport);
  return [Math.min(x1, x2), Math.min(y1, y2), Math.abs(x1 - x2), Math.abs(y1 - y2)];
}

export const rotatePoint = (rotateAngle: number, point: number[], viewport: number[]): number[] => {
  const rad = (rotateAngle * Math.PI) / 180;
  let x = point[0] * Math.cos(rad) + point[1] * Math.sin(rad);
  let y = -point[0] * Math.sin(rad) + point[1] * Math.cos(rad);
  switch (rotateAngle) {
    case 90:
      y += viewport[2] + viewport[0];
      break;
    case 180:
      x += viewport[2] + viewport[0];
      y += viewport[3] + viewport[1];
      break;
    case 270:
      x += viewport[3] + viewport[1];
      break;
    default:
      break;
  }
  return [x, y];
}

export const activeBboxInViewport = (): boolean => {
  let isInView = false;
  const bboxes = document.querySelectorAll('.pdf-bbox_selected');
  for (let index = 0; index < bboxes.length; index++) {
    isInView = elementInViewport(bboxes[index]);
    if (isInView) {
      break;
    }
  }

  return isInView;
}

export const scrollToActiveBbox = (): void => {
  if (activeBboxInViewport()) {
    return;
  }
  const el: any = document.querySelector('.pdf-bbox_selected');
  if (!el) return;
  el.scrollIntoView();
  (document.querySelector('.pdf-viewer') as any).scrollTop -= 150;
  if (!activeBboxInViewport()) {
    el.scrollIntoView();
  }
}

function elementInViewport (el: any): boolean {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  let width = el.offsetWidth;
  let height = el.offsetHeight;
  while(el.offsetParent && !el.offsetParent.className.includes('pdf-viewer')) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }
  const parent = (document.querySelector('.pdf-viewer') as any);
  const parentScrollTop = parent.scrollTop as unknown as number;
  const parentScrollLeft = parent.scrollLeft as unknown as number;
  return (
    top >= parentScrollTop &&
    left >= parentScrollLeft &&
    (top + height) <= (parentScrollTop + parent.offsetHeight) &&
    (left + width) <= (parentScrollLeft + parent.offsetWidth)
  );
}

function concatBoundingBoxes(newBoundingBox: AnyObject, oldBoundingBox?: AnyObject): AnyObject {
  if (_.isNil(oldBoundingBox) && _.isNil(newBoundingBox)) {
    return {};
  }

  if (_.isNil(newBoundingBox)) {
    return oldBoundingBox || {};
  }
  if (_.isNil(oldBoundingBox)) {
    return _.cloneDeep(newBoundingBox);
  }
  return {
    x: Math.min(newBoundingBox.x, oldBoundingBox.x),
    y: Math.min(newBoundingBox.y, oldBoundingBox.y),
    width:
      Math.max(newBoundingBox.x + newBoundingBox.width, oldBoundingBox.x + oldBoundingBox.width) -
      Math.min(newBoundingBox.x, oldBoundingBox.x),
    height:
      Math.max(newBoundingBox.y + newBoundingBox.height, oldBoundingBox.y + oldBoundingBox.height) -
      Math.min(newBoundingBox.y, oldBoundingBox.y),
  };
}
