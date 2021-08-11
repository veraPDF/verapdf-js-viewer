import _ from 'lodash';

import {IBboxLocation} from '../index';
import {AnyObject} from '../types/generics';

export const buildBboxMap = (bboxes: IBboxLocation[], structure: AnyObject) => {
  const bboxMap = {};
  bboxes.forEach((bbox, index) => {
    try {
      if (bbox.location.includes('StructTreeRoot') || bbox.location.includes('root/doc') || bbox.location === 'root') {
        const [mcidList, pageIndex] = getTagsFromErrorPlace(bbox.location, structure);
        bboxMap[pageIndex + 1] = [
          ...(bboxMap[pageIndex + 1] || []),
          {
            index,
            mcidList,
            groupId: bbox.groupId || undefined,
          },
        ];
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

export const getBboxPages = (bboxes: IBboxLocation[], structure: AnyObject) => {
  return bboxes.map((bbox) => {
    try {
      if (bbox.location.includes('StructTreeRoot') || bbox.location.includes('root/doc') || bbox.location === 'root') {
        const [, pageIndex] = getTagsFromErrorPlace(bbox.location, structure);
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
  const defaultValue = [[], -1];
  let selectedTag = convertContextToPath(context);

  if (_.isEmpty(selectedTag)) {
    return defaultValue;
  }

  if (selectedTag.hasOwnProperty('mcid') && selectedTag.hasOwnProperty('pageIndex')) {
    return [[selectedTag.mcid], selectedTag.pageIndex];
  } else if (selectedTag.hasOwnProperty('annot') && selectedTag.hasOwnProperty('pageIndex')) {
    return [{ annot: selectedTag.annot }, selectedTag.pageIndex];
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
          const clearedChildrenArray = objectOfErrors.children.filter((tag: AnyObject) => !tag?.mcid);
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
 *  @return [{Array}, {Number}] - [[array of mcids], page of error]
 */
function findAllMcid(tagObject: AnyObject) {
  const listOfMcid: string[] = [];
  let pageIndex = -1;

  function func(obj: AnyObject) {
    if (!obj) return;
    if (obj.mcid || obj.mcid === 0) {
      listOfMcid.push(obj.mcid);
      if (pageIndex === -1) pageIndex = obj.pageIndex;
    }
    if (!obj.children) {
      return;
    }

    if (!(obj.children instanceof Array)) {
      func(obj.children);
    } else {
      obj.children.forEach(child => func(child));
    }
  }

  func(tagObject);

  return [listOfMcid, pageIndex];
}

export const parseMcidToBbox = (listOfMcid: number[] | AnyObject, pageMap: AnyObject, annotations: AnyObject) => {
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

  return coords ? [coords.x, coords.y, coords.width, coords.height] : [];
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
