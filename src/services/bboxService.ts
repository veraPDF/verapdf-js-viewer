import _ from 'lodash';

import {IBboxLocation} from '../index';
import {AnyObject, OrNull} from '../types/generics';
import {IBbox, IMcidItem, TreeElementBbox} from "../components/bbox/Bbox";

const cleanArray = (arr: AnyObject[]): AnyObject[] => {
  if (_.isNil(arr)) return [];
  if (arr.some(el => _.isNil(el))) {
      arr = arr.filter(el => !_.isNil(el));
      return arr.length ? arr : [];
  }
  return arr;
};

const splitChildren = (children: AnyObject[]): [AnyObject, AnyObject[]] => {
  if (_.isNil(children)) children = [];
  const [arrNodes, arrMcid] = _.reduce(
      cleanArray(children),
      (arr, child) => {
        if (!_.isNil(child)) arr[+child.hasOwnProperty('mcid')].push(child);
          return arr;
      },
      [[] as AnyObject, []]
  );
  return [arrNodes, arrMcid];
};

const getMultiBboxPagesObj = (mcidList: Array<IMcidItem | undefined>): AnyObject => {
  const mcidListPages = [] as number[];
  const multiBbox = {};
  mcidList.forEach(obj => {
    if (!_.isNil(obj)) mcidListPages.push(obj.pageIndex)
  });
  const mcidListPagesDict = Array.from(new Set(mcidListPages));
  for (const value of mcidListPagesDict) {
    multiBbox[value + 1] = [];
  }
  mcidListPages.forEach((page, index) => multiBbox[page + 1].push(mcidList[index]));
  return multiBbox;
};

const updateMcidList = (oldMcidList: AnyObject[], children: AnyObject[]): AnyObject[] => {
  if (_.isNil(oldMcidList)) oldMcidList = [];
  if (_.isNil(children)) children = [];
  return [
      ...oldMcidList,
      ..._.flatMap(cleanArray(children), child => {
          if (child.hasOwnProperty('mcidList') && !_.isNil(child.mcidList)) {
              return child.mcidList;
          }
      }),
  ];
};

export const buildBboxMap = (bboxes: IBboxLocation[], structure: AnyObject) => {
  const bboxMap = {};
  bboxes.forEach((bbox, index) => {
    try {
      if (_.isNil(bbox.location)) return;
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
            bboxTitle: bbox.bboxTitle,
          }
        ];
      } else if (bbox.location.includes('StructTreeRoot') || bbox.location.includes('root/doc') || bbox.location === 'root') {
        const mcidData = getTagsFromErrorPlace(bbox.location, structure);
        mcidData.forEach(([mcidList, pageIndex, contentItemPath]) => {
          bboxMap[pageIndex + 1] = [
            ...(bboxMap[pageIndex + 1] || []),
            {
              index,
              mcidList,
              contentItemPath,
              groupId: bbox.groupId || undefined,
              bboxTitle: bbox.bboxTitle,
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
              bboxTitle: bbox.bboxTitle,
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

export const parseTree = (tree: AnyObject | AnyObject[]): AnyObject => {
  if (tree instanceof Array && tree.length === 1) {
      return tree[0];
  }
  if (tree instanceof Array) {
      return { name: 'Document', children: tree };
  }
  return tree;
};

export const structurizeMcidTree = (node: AnyObject): OrNull<AnyObject> => {
  if (_.isNil(node)) return null;
  if (_.isNil(node.children)) {
      if (node.hasOwnProperty('name')) return node;
      return null;
  }
  if (!(node.children instanceof Array)) {
      if (node.children.hasOwnProperty('mcid')) {
          node.mcidList = [node.children];
          node.children = [];
      } else {
          node.children = [structurizeMcidTree(node.children)];
          node.mcidList = updateMcidList(node.mcidList, node.children);
      }
  } else {
      const [arrNodes, arrMcid] = splitChildren(node.children);
      node.children = _.map(arrNodes, child => structurizeMcidTree(child));
      node.mcidList = updateMcidList(arrMcid, node.children);
  }
  node.children = cleanArray(node.children);
  return node;
};

export const setTreeIds = (node: AnyObject, id: string = '0'): OrNull<AnyObject> => {
  if (_.isNil(node)) return null;
  node.id = id;
  if (_.isNil(node?.children)) node.children = [];
  if (!node?.children.length) {
      node.final = true;
      return node;
  }
  if (!(node.children instanceof Array)) node.children = [setTreeIds(node.children, `${id}:${0}`)];
  else node.children = _.map(node.children, (child, index) => setTreeIds(child, `${id}:${index}`));
  return node;
};

export const getMcidList = (node: AnyObject, mcidList: TreeElementBbox[] = []): TreeElementBbox[] => {
  if (_.isNil(node)) return mcidList;
  if (!_.isNil(node.mcidList) && !_.isNil(node.id) && node.mcidList.length) mcidList.push([node.mcidList, node.id]);
  if (_.isNil(node.children)) return mcidList;
  if (!(node.children instanceof Array)) mcidList.push([node.children.mcidList, node.children.id]);
  else _.map(node.children, child => (mcidList = getMcidList(child, mcidList)));
  return mcidList;
};

export const createBboxMap = (mcidList: TreeElementBbox[]): AnyObject => {
  const mcidListPages = [] as Array<number | number[]>;
  const bboxMap = {};
  const getPages = (list: Array<IMcidItem | undefined>): number[]  => {
    const cleanedList = list.filter((obj): obj is IMcidItem => !_.isNil(obj) && !_.isNil(obj.pageIndex));
    return Array.from(new Set(cleanedList.map(obj => obj?.pageIndex)));
  };
  mcidList.forEach(arr => {
    const list = arr[0];
    const pages = getPages(list);
    mcidListPages.push(pages.length === 1 ? pages[0] : pages);
  });
  const mcidListPagesDict = Array.from(new Set(mcidListPages.flat()));
  for (const value of mcidListPagesDict) {
      bboxMap[value + 1] = [];
  }
  mcidListPages.forEach((page, index) => {
    if (!(page instanceof Array)) bboxMap[page + 1].push(mcidList[index]);
    else {
      const [mcid, id] = mcidList[index];
      const multiBboxPagesObj = getMultiBboxPagesObj(mcid);
      page.forEach(pageIndex => bboxMap[pageIndex + 1].push([multiBboxPagesObj[pageIndex + 1], id]))
    };
  });
  return bboxMap;
};

export const createAllBboxes = (bboxesAll: TreeElementBbox[] | undefined, pageMap: AnyObject, annotations: AnyObject, viewport: number[], rotateAngle: number): IBbox[] => {
  if (_.isNil(bboxesAll)) return [];
  return bboxesAll?.map((bbox) => {
    const [mcid, id] = bbox as [AnyObject[], string];
      const listOfMcid = cleanArray(mcid).map((obj: AnyObject) => obj?.mcid);
      const location = parseMcidToBbox(listOfMcid, pageMap, annotations, viewport, rotateAngle);
      const [,, width, height] = location;
      return {
        id,
        location: location,
        area: width * height,
      };
    }
  ).sort(
    ({area: area1}, {area: area2}) => (area1 < area2) ? 1 : (area1 > area2) ? -1 : 0);
};

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
  const parentHeight = parent.offsetHeight;
  const parentWidth = parent.offsetWidth;

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
  const defaultValue = [[[], -1, undefined]];
  let selectedTag = convertContextToPath(context);

  if (_.isEmpty(selectedTag)) {
    return defaultValue;
  }

  if (selectedTag.hasOwnProperty('mcid') && selectedTag.hasOwnProperty('pageIndex')) {
    return [[[selectedTag.mcid], selectedTag.pageIndex]];
  } else if (selectedTag.hasOwnProperty('annot') && selectedTag.hasOwnProperty('pageIndex')) {
    return [[{ annot: selectedTag.annot }, selectedTag.pageIndex]];
  } else if (selectedTag.hasOwnProperty('contentItems')) {
    return [[undefined, selectedTag.pageIndex, [
      selectedTag.contentStream,
      selectedTag.content,
      ...selectedTag.contentItems
    ]]];
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
          const clearedChildrenArray = [...objectOfErrors.children].filter((tag: AnyObject) => !tag?.hasOwnProperty('mcid'));
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
    if (contextString.includes('contentItem') && !contextString.includes('mcid')) {
      const result: any = contextString.match(
        /pages\[(?<pages>\d+)\](\(.+\))?\/contentStream\[(?<contentStream>\d+)\](\(.+\))?\/content\[(?<content>\d+)\](?<contentItems>((\(.+\))?\/contentItem\[(\d+)\])+)/
      );
      if (result) {
        try {
          let path: AnyObject = {};
          path.pageIndex = parseInt(result.groups.pages, 10);
          path.contentStream = parseInt(result.groups.contentStream, 10);
          path.content = parseInt(result.groups.content, 10);
          path.contentItems = result.groups.contentItems.split('/').filter((ci: any) => ci.includes('contentItem')).map((ci: any) => {
            const contentItemIndex = ci.match(/\[(?<contentItem>\d+)\]/);
            return parseInt(contentItemIndex?.groups?.contentItem || '-1', 10);
          });
          return path;
        } catch (err) {
          console.log('NoMCIDContentItemPathParseError:', err.message || err);
        }
      }
    }

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
        coords = concatBoundingBoxes(currentBbox, coords.hasOwnProperty('x') ? coords : undefined);
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

  if (_.isNil(newBoundingBox) || Object.values(newBoundingBox).some((el) => _.isNil(el))) {
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
