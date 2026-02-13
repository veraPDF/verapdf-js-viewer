import _ from 'lodash';

import { IBboxLocation } from '../index';
import { AnyObject, OrNull } from '../types/generics';
import { IBbox, IMcidItem, IAnnotItem, TreeElementBbox} from '../components/bbox/Bbox';

const groupChildren = (children: AnyObject[]): AnyObject[][] => {
  if (_.isNil(children)) children = [];
  const group = _.groupBy(cleanArray(children), (child) => {
    if (child.hasOwnProperty('name')) return 'nodeList';
    if (child.hasOwnProperty('mcid')) return 'mcidList';
    if (child.hasOwnProperty('rect')) return 'annotList';
    return null;
  });
  return [
    group.nodeList ?? [],
    group.mcidList ?? [],
    group.annotList ?? [],
  ];
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

const extractMcidFromNode = (children: AnyObject | AnyObject[] | null): AnyObject[] => {
  if (_.isNil(children)) return [];
  const mcidList = [];
  if (!(children instanceof Array)) {
    children.hasOwnProperty('mcid') && mcidList.push(children);
  } else {
    mcidList.push(..._.filter(children, (child: AnyObject) => child?.hasOwnProperty('mcid')));
  }
  return mcidList;
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

export const cleanArray = (arr: Array<AnyObject | null>): AnyObject[] => {
  if (_.isNil(arr)) return [];
  return arr.filter(el => !_.isNil(el)) as AnyObject[];
};

export const getFormattedAnnotations = (annots: AnyObject): AnyObject[] => {
  const formattedAnnots: AnyObject[] = [];

  _.forEach(annots, (annot: any) => {
    if (annot.hasOwnProperty('parentId')
      && annot.hasOwnProperty('parentRect')
      && annot.hasOwnProperty('parentType')
      && annot.parentType === 'Highlight') {
      formattedAnnots.push({
        ['id']: annot.parentId,
        ['rect']: annot.parentRect,
      });
    }
    formattedAnnots.push(annot);
  });

  return formattedAnnots;
}

const annotIndexRegExp = /\/annots\[(?<annotIndex>\d+)\](\(.*\))?\//;
export const buildBboxMap = (bboxes: IBboxLocation[], structure: AnyObject) => {
  const bboxMap = {};
  bboxes.forEach((bbox, index) => {
    try {
      if (_.isNil(bbox.location)) return;
      const match = bbox.location.match(annotIndexRegExp);
      const annotIndex = parseInt(match?.groups?.annotIndex!, 10);
      if (bbox.location.includes('contentStream') && bbox.location.includes('operators')) {
        const bboxPosition = calculateLocationInStreamOperator(bbox.location);
        if (!bboxPosition) {
          return;
        }
        bboxMap[bboxPosition.pageIndex + 1] = [
          ...(bboxMap[bboxPosition.pageIndex + 1] || []),
          {
            index,
            annotIndex: Number.isNaN(annotIndex) ? undefined : annotIndex,
            isVisible: bbox.hasOwnProperty('isVisible') ? bbox.isVisible : true,
            operatorIndex: bboxPosition.operatorIndex,
            contentIndex: bboxPosition.contentIndex,
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
              annotIndex: Number.isNaN(annotIndex) ? undefined : annotIndex,
              isVisible: bbox.hasOwnProperty('isVisible') ? bbox.isVisible : true,
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
              annotIndex: Number.isNaN(annotIndex) ? undefined : annotIndex,
              isVisible: bbox.hasOwnProperty('isVisible') ? bbox.isVisible : true,
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

export const structurizeTree = (node: AnyObject): OrNull<AnyObject> => {
  if (_.isNil(node)) return null;
  if (_.isNil(node.children)) {
    if (node.hasOwnProperty('name')) return node;
    return null;
  }
  if (!(node.children instanceof Array)) {
    if (node.children.hasOwnProperty('mcid')) {
      node.mcidListChildren = extractMcidFromNode(node.children);
      node.mcidList = [node.children];
      node.children = [];
    } else if (node.children.hasOwnProperty('rect')) {
      node.annotList = [node.children];
      node.children = [];
    } else {
      node.children = [structurizeTree(node.children)];
      node.mcidList = updateMcidList(node.mcidList, node.children);
    }
  } else {
    const mcidListChildren = [] as AnyObject[];
    const [nodeList, mcidList, annotList] = groupChildren(node.children);
    _.forEach(node.children, (child: OrNull<AnyObject>) =>
      mcidListChildren.push(...extractMcidFromNode(child))
    );
    node.mcidListChildren = mcidListChildren;
    node.children = _.map(nodeList, child => structurizeTree(child));
    node.mcidList = updateMcidList(mcidList, node.children);
    if (annotList.length) {
      node.annotList = annotList;
    }
  }
  node.children = cleanArray(node.children);
  return node;
};

export const setTreeIds = (node: AnyObject, annotMap: AnyObject = {}, id: string = '0'): [OrNull<AnyObject>, AnyObject] => {
  if (_.isNil(node)) return [null, annotMap];
  node.id = id;
  if (node?.hasOwnProperty('annotList')) {
    node.annotList.forEach((annot: IAnnotItem) => {
      const index = `${annot.pageIndex}:${annot.annotIndex}`;
      annotMap[index] = id;
    });
  }
  if (_.isNil(node?.children)) node.children = [];
  if (!node?.children.length) {
    node.final = true;
    return [node, annotMap];
  }
  if (!(node.children instanceof Array)) node.children = [setTreeIds(node.children, annotMap, `${id}:0`)[0]];
  else node.children = _.map(node.children, (child, index) => setTreeIds(child, annotMap, `${id}:${index}`)[0]);
  return [node, annotMap];
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

export const createAllBboxes = (
  bboxesAll: TreeElementBbox[] | undefined,
  pageMap: AnyObject,
  refMap: AnyObject,
  annotations: AnyObject,
  viewport: number[],
  rotateAngle: number,
): IBbox[] => {
  if (_.isNil(bboxesAll)) return [];
  const unfilteredBboxes = bboxesAll?.map((bbox) => {
    const [mcid, id] = bbox as [AnyObject[], string];
    const listOfMcid = cleanArray(mcid).map((obj: AnyObject) => obj?.stm ? { mcid: obj?.mcid, ref: obj?.stm?.num } : obj?.mcid);
    const location = parseMcidToBbox(listOfMcid, pageMap, refMap, annotations, viewport, rotateAngle);
    if (_.isEmpty(location)) {
      return null;
    }
    const [,, width, height] = location;
    return {
      id,
      location: location,
      area: width * height,
    };
  });
  return cleanArray(unfilteredBboxes).sort(
    ({area: area1}, {area: area2}) => (area1 < area2) ? 1 : (area1 > area2) ? -1 : 0) as IBbox[];
};

export const calculateLocationInStreamOperator = (location: string) => {
  const path = location.split("/");
  let pageIndex, operatorIndex, glyphIndex, contentIndex;
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
    if (step.startsWith('content')) {
      contentIndex = parseInt(step.split(/[\[\]]/)[1]);
    }
  });
  if (pageIndex == null || operatorIndex == null || (glyphIndex == null && contentIndex == null)) {
    return null;
  }
  return {
    pageIndex,
    operatorIndex,
    glyphIndex,
    contentIndex,
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
    const mcid = selectedTag.stm ? { mcid: selectedTag.mcid, ref: selectedTag.stm.num } : selectedTag.mcid;
    return [[[mcid], selectedTag.pageIndex]];
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
          const clearedChildrenArray = [...objectOfErrors.children].filter((tag: AnyObject) => {
            return !tag?.hasOwnProperty('mcid') && !tag?.hasOwnProperty('rect');
          });
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
      const result: any = contextString.match(
        /pages\[(?<pages>\d+)\](\(.+\))?\/(annots\[(?<annots>\d+)\](\(.+\))?\/appearance\[\d\](\(.+\))?\/)?contentStream\[(?<contentStream>\d+)\](\(.+\))?\/content\[(?<content>\d+)\](\{mcid:\d+\})?(?<contentItems>((\(.+\))?\/contentItem\[(\d+)\](\{mcid:\d+\})?)+)/
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
          path.annotIndex = parseInt(result.groups.annots, 10) || undefined;
          return path;
        } catch (err) {
          console.log('NoMCIDContentItemPathParseError:', err.message || err);
        }
      }
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

export const getBboxForViewport = (
  bbox: number[],
  viewport: number[],
  rotateAngle: number,
  leftOffset: number,
  bottomOffset: number,
) => {
  const coords = [...bbox];
  coords[0] += leftOffset;
  coords[1] += bottomOffset;
  const coordsArray = rotateCoordinates(coords, rotateAngle, viewport);
  const rotatedViewport = rotateViewport(rotateAngle, viewport);
  return [coordsArray[0] - rotatedViewport[0], coordsArray[1] - rotatedViewport[1], coordsArray[2], coordsArray[3]];
}

export const parseMcidToBbox = (
  listOfMcid: number[] | AnyObject[] | AnyObject,
  pageMap: AnyObject,
  refMap: AnyObject,
  annotations: AnyObject,
  viewport: number[],
  rotateAngle: number,
  left = 0,
  bottom = 0,
) => {
  let coords: AnyObject = {};
  let leftOffset = left;
  let bottomOffset = bottom;

  if (listOfMcid instanceof Array) {
    listOfMcid.forEach(mcid => {
      let currentBbox;
      if (mcid instanceof Object) {
        currentBbox = _.isNil(mcid.ref) ? pageMap[mcid.mcid] : refMap?.[`${mcid.ref}R`]?.[mcid.mcid];
      } else {
        currentBbox = pageMap[mcid];
      }
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
      leftOffset = 0;
      bottomOffset = 0;
    }
  }
  if (!coords || _.isEmpty(coords)) return [];
  const coordsArray = rotateCoordinates([
    coords.x + leftOffset,
    coords.y + bottomOffset,
    coords.width,
    coords.height,
  ], rotateAngle, viewport);
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
  const width = el.offsetWidth;
  const height = el.offsetHeight;
  const elementArea = width * height;
  while(el.offsetParent && !el.offsetParent.className.includes('pdf-viewer')) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }
  const parent = (document.querySelector('.pdf-viewer') as any);
  const parentArea = parent.offsetWidth * parent.offsetHeight;
  const parentScrollTop = parent.scrollTop as unknown as number;
  const parentScrollLeft = parent.scrollLeft as unknown as number;
  if (elementArea >= parentArea) {
    return true;
  }
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
