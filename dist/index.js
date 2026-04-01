

function ___$insertStyle(css) {
    if (!css || typeof window === 'undefined') {
        return;
    }
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactUse = require('react-use');
var reactPdf = require('react-pdf');
var EventEmitter = require('eventemitter3');
var _ = require('lodash');
require('react-pdf/dist/Page/AnnotationLayer.css');
require('react-pdf/dist/Page/TextLayer.css');
var useIntersection = require('use-intersection');
var styled = require('styled-components');
var pdfWorkerURL = require('pdfjs-dist/build/pdf.worker?url');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var EventEmitter__default = /*#__PURE__*/_interopDefaultLegacy(EventEmitter);
var ___default = /*#__PURE__*/_interopDefaultLegacy(_);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var pdfWorkerURL__default = /*#__PURE__*/_interopDefaultLegacy(pdfWorkerURL);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var TreeBboxSelectionMode;
(function (TreeBboxSelectionMode) {
    TreeBboxSelectionMode["SELECTED"] = "SELECTED";
    TreeBboxSelectionMode["SELECTED_WITH_KIDS"] = "SELECTED_WITH_KIDS";
})(TreeBboxSelectionMode || (TreeBboxSelectionMode = {}));

const ViewerContext = React.createContext({});
const ViewerProvider = ({ renderBbox, children }) => {
    const [page, setPage] = React.useState(1);
    const [maxPage, setMaxPage] = React.useState(0);
    const [scrollInto, setScrollInto] = React.useState({ page: 0 });
    const setScrollIntoPage = React.useCallback((page) => setScrollInto({ page }), [setScrollInto]);
    const context = {
        page,
        setPage,
        maxPage,
        setMaxPage,
        scrollInto,
        setScrollIntoPage,
        renderBbox,
    };
    return React__default["default"].createElement(ViewerContext.Provider, { value: context }, children);
};

___$insertStyle(".pdf-bbox {\n  position: absolute;\n  border: 2px solid grey;\n  box-sizing: border-box;\n  cursor: pointer;\n  z-index: 3;\n}\n.pdf-bbox:hover {\n  border-color: orangered;\n}\n.pdf-bbox_selected {\n  z-index: 1000;\n  background: rgba(255, 69, 0, 0.5);\n}\n.pdf-bbox_structured_selected {\n  pointer-events: none;\n  z-index: 4;\n}\n.pdf-bbox_disabled {\n  display: none;\n}\n\nsection[data-annotation-id] {\n  z-index: 2 !important;\n}\nsection[data-annotation-id] * {\n  color: transparent !important;\n}");

const bboxBorder = 'grey';
const bboxRelatedBorder = 'rgba(255,176,0,0.5)';
const bboxStructuredBorder = 'rgba(255,255,255,0)';
const bboxSelectedStructuredBorder = 'rgba(255,122,0,1)';
const bboxBorderHover$1 = 'orangered';
const bboxStructuredBorderHover = 'rgba(255,122,0,1)';
const bboxBg = 'rgba(255,255,255,0)';
const bboxBgSelected = 'rgba(255,69,0,0.5)';
const bboxBgRelated = 'rgba(255,176,0,0.3)';
const bboxBgStructured = 'rgba(255,255,255,0)';
const bboxBgSelectedStructured = 'rgba(255,100,0,0.4)';
const BboxDiv = styled__default["default"].div.withConfig({ displayName: "BboxDiv", componentId: "-d59wxb" }) `
  mix-blend-mode: normal;
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  top: ${(props) => props.top};
  border-color: ${(props) => props.colorScheme && props.colorScheme.border || bboxBorder};
  background-color: ${(props) => props.colorScheme && props.colorScheme.background || bboxBg};
  &:hover {
    border-color: ${(props) => props.colorScheme && props.colorScheme.borderHovered || bboxBorderHover$1};
    background-color: ${(props) => props.colorScheme && props.colorScheme.backgroundHovered || bboxBg};
  }
  &.pdf-bbox_selected {
    border-color: ${(props) => props.colorScheme && props.colorScheme.borderSelected || bboxBorderHover$1};
    background-color: ${(props) => props.colorScheme && props.colorScheme.backgroundSelected || bboxBgSelected};
  }
  &.pdf-bbox_related {
    border-color: ${(props) => props.colorScheme && props.colorScheme.borderRelated || bboxRelatedBorder};
    background-color: ${(props) => props.colorScheme && props.colorScheme.backgroundRelated || bboxBgRelated};
  }
  &.pdf-bbox_structured {
    &:hover {
      border-color: ${bboxStructuredBorderHover};
    }
    border-color: ${(props) => props.colorScheme && props.colorScheme.borderStructured || bboxStructuredBorder};
    background-color: ${(props) => props.colorScheme && props.colorScheme.backgroundStructured || bboxBgStructured};
  }
  &.pdf-bbox_structured_selected {
    border-color: ${(props) => props.colorScheme && props.colorScheme.borderSelectedStructured || bboxSelectedStructuredBorder};
    background-color: ${(props) => props.colorScheme && props.colorScheme.backgroundSelectedStructured || bboxBgSelectedStructured};
  }
  &.pdf-bbox_structured_selected_multiple {
    background-color: ${(props) => props.colorScheme && props.colorScheme.background || bboxBg};
  }
`;
const clamp = (value, scale, { max, min = 0, offset = 0, } = {}) => {
    if (max === undefined)
        return Math.max((offset + +value) * scale, min);
    return Math.min(Math.max((offset + +value) * scale, min), max);
};
const Bbox = (props) => {
    const { bbox, disabled, selected, related, structured, scale, colorScheme, selectionMode, pageBorders, onClick, } = props;
    const { renderBbox } = React.useContext(ViewerContext);
    const [left, bottom, width, height, top] = React.useMemo(() => {
        const x0 = clamp(bbox.location[0], scale, { max: pageBorders.width });
        const y0 = clamp(bbox.location[1], scale, { max: pageBorders.height });
        const w = clamp(bbox.location[2], scale, { max: pageBorders.width, offset: +bbox.location[0] }) - x0;
        if (bbox.location[3] === 'bottom')
            return [`${x0}px`, '0', `${w}px`, 'auto', `calc(100% - ${y0}px)`];
        if (bbox.location[3] === 'top')
            return [`${x0}px`, `${y0}px`, `${w}px`, 'auto', '0'];
        const h = clamp(bbox.location[3], scale, { max: pageBorders.height, offset: +bbox.location[1] }) - y0;
        return [`${x0}px`, `${y0}px`, `${w}px`, `${h}px`, 'auto'];
    }, [bbox.location, scale, pageBorders.width, pageBorders.height]);
    const isSelected = React.useMemo(() => selected ? ' pdf-bbox_selected' : '', [selected]);
    const isRelated = React.useMemo(() => related ? ' pdf-bbox_related' : '', [related]);
    const isDisabled = React.useMemo(() => disabled ? ' pdf-bbox_disabled' : '', [disabled]);
    const isStructured = React.useMemo(() => structured ? ' pdf-bbox_structured' : '', [structured]);
    const isStructuredSelected = React.useMemo(() => structured && selected ? ' pdf-bbox_structured_selected' : '', [structured, selected]);
    const isStructuredSelectedMultiple = React.useMemo(() => {
        if (structured && selected && selectionMode === TreeBboxSelectionMode.SELECTED_WITH_KIDS)
            return ' pdf-bbox_structured_selected_multiple';
        else
            return '';
    }, [structured, selected, selectionMode]);
    if (renderBbox) {
        return renderBbox({
            left,
            width,
            height,
            top,
            colorScheme,
            disabled,
            related,
            selected,
            scale,
            selectionMode,
            structured,
            onClick,
        });
    }
    return React__default["default"].createElement(BboxDiv, { className: `pdf-bbox${isSelected}${isRelated}${isStructured}${isStructuredSelected}${isStructuredSelectedMultiple}${isDisabled}`, left: left, bottom: bottom, width: width, height: height, top: top, colorScheme: colorScheme || {}, title: bbox.bboxTitle, "aria-describedby": bbox.bboxTitle, onClick: onClick });
};
var Bbox$1 = React.memo(Bbox);

const groupChildren = (children) => {
    var _a, _b, _c;
    if (___default["default"].isNil(children))
        children = [];
    const group = ___default["default"].groupBy(cleanArray(children), (child) => {
        if (child.hasOwnProperty('name'))
            return 'nodeList';
        if (child.hasOwnProperty('mcid'))
            return 'mcidList';
        if (child.hasOwnProperty('rect'))
            return 'annotList';
        return null;
    });
    return [
        (_a = group.nodeList) !== null && _a !== void 0 ? _a : [],
        (_b = group.mcidList) !== null && _b !== void 0 ? _b : [],
        (_c = group.annotList) !== null && _c !== void 0 ? _c : [],
    ];
};
const getMultiBboxPagesObj = (mcidList) => {
    const mcidListPages = [];
    const multiBbox = {};
    mcidList.forEach(obj => {
        if (!___default["default"].isNil(obj))
            mcidListPages.push(obj.pageIndex);
    });
    const mcidListPagesDict = Array.from(new Set(mcidListPages));
    for (const value of mcidListPagesDict) {
        multiBbox[value + 1] = [];
    }
    mcidListPages.forEach((page, index) => multiBbox[page + 1].push(mcidList[index]));
    return multiBbox;
};
const extractMcidFromNode = (children) => {
    if (___default["default"].isNil(children))
        return [];
    const mcidList = [];
    if (!(children instanceof Array)) {
        children.hasOwnProperty('mcid') && mcidList.push(children);
    }
    else {
        mcidList.push(...___default["default"].filter(children, (child) => child === null || child === void 0 ? void 0 : child.hasOwnProperty('mcid')));
    }
    return mcidList;
};
const updateMcidList = (oldMcidList, children) => {
    if (___default["default"].isNil(oldMcidList))
        oldMcidList = [];
    if (___default["default"].isNil(children))
        children = [];
    return [
        ...oldMcidList,
        ...___default["default"].flatMap(cleanArray(children), child => {
            if (child.hasOwnProperty('mcidList') && !___default["default"].isNil(child.mcidList)) {
                return child.mcidList;
            }
        }),
    ];
};
const cleanArray = (arr) => {
    if (___default["default"].isNil(arr))
        return [];
    return arr.filter(el => !___default["default"].isNil(el));
};
const getFormattedAnnotations = (annots) => {
    const formattedAnnots = [];
    ___default["default"].forEach(annots, (annot) => {
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
};
const annotIndexRegExp = /\/annots\[(?<annotIndex>\d+)\](\(.*\))?\//;
const buildBboxMap = (bboxes, structure) => {
    const bboxMap = {};
    bboxes.forEach((bbox, index) => {
        var _a;
        try {
            if (___default["default"].isNil(bbox.location))
                return;
            const match = bbox.location.match(annotIndexRegExp);
            const annotIndex = parseInt((_a = match === null || match === void 0 ? void 0 : match.groups) === null || _a === void 0 ? void 0 : _a.annotIndex, 10);
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
                        subOperatorIndex: bboxPosition.subOperatorIndex,
                        bboxTitle: bbox.bboxTitle,
                    }
                ];
            }
            else if (bbox.location.includes('StructTreeRoot') || bbox.location.includes('root/doc') || bbox.location === 'root') {
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
            }
            else {
                const bboxesFromLocation = bbox.location.includes('pages[') ? calculateLocation(bbox.location) : calculateLocationJSON(bbox.location);
                bboxesFromLocation.forEach((bboxWithLocation) => {
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
                });
            }
        }
        catch (e) {
            console.error(`Location not supported: ${bbox.location}`);
        }
    });
    return bboxMap;
};
const parseTree = (tree) => {
    if (tree instanceof Array && tree.length === 1) {
        return tree[0];
    }
    if (tree instanceof Array) {
        return { name: 'Document', children: tree };
    }
    return tree;
};
const structurizeTree = (node) => {
    if (___default["default"].isNil(node))
        return null;
    if (___default["default"].isNil(node.children)) {
        if (node.hasOwnProperty('name'))
            return node;
        return null;
    }
    if (!(node.children instanceof Array)) {
        if (node.children.hasOwnProperty('mcid')) {
            node.mcidListChildren = extractMcidFromNode(node.children);
            node.mcidList = [node.children];
            node.children = [];
        }
        else if (node.children.hasOwnProperty('rect')) {
            node.annotList = [node.children];
            node.children = [];
        }
        else {
            node.children = [structurizeTree(node.children)];
            node.mcidList = updateMcidList(node.mcidList, node.children);
        }
    }
    else {
        const mcidListChildren = [];
        const [nodeList, mcidList, annotList] = groupChildren(node.children);
        ___default["default"].forEach(node.children, (child) => mcidListChildren.push(...extractMcidFromNode(child)));
        node.mcidListChildren = mcidListChildren;
        node.children = ___default["default"].map(nodeList, child => structurizeTree(child));
        node.mcidList = updateMcidList(mcidList, node.children);
        if (annotList.length) {
            node.annotList = annotList;
        }
    }
    node.children = cleanArray(node.children);
    return node;
};
const setTreeIds = (node, annotMap = {}, id = '0') => {
    if (___default["default"].isNil(node))
        return [null, annotMap];
    node.id = id;
    if (node === null || node === void 0 ? void 0 : node.hasOwnProperty('annotList')) {
        node.annotList.forEach((annot) => {
            const index = `${annot.pageIndex}:${annot.annotIndex}`;
            annotMap[index] = id;
        });
    }
    if (___default["default"].isNil(node === null || node === void 0 ? void 0 : node.children))
        node.children = [];
    if (!(node === null || node === void 0 ? void 0 : node.children.length)) {
        node.final = true;
        return [node, annotMap];
    }
    if (!(node.children instanceof Array))
        node.children = [setTreeIds(node.children, annotMap, `${id}:0`)[0]];
    else
        node.children = ___default["default"].map(node.children, (child, index) => setTreeIds(child, annotMap, `${id}:${index}`)[0]);
    return [node, annotMap];
};
const getMcidList = (node, mcidList = []) => {
    if (___default["default"].isNil(node))
        return mcidList;
    if (!___default["default"].isNil(node.mcidList) && !___default["default"].isNil(node.id) && node.mcidList.length)
        mcidList.push([node.mcidList, node.id]);
    if (___default["default"].isNil(node.children))
        return mcidList;
    if (!(node.children instanceof Array))
        mcidList.push([node.children.mcidList, node.children.id]);
    else
        ___default["default"].map(node.children, child => (mcidList = getMcidList(child, mcidList)));
    return mcidList;
};
const createBboxMap = (mcidList) => {
    const mcidListPages = [];
    const bboxMap = {};
    const getPages = (list) => {
        const cleanedList = list.filter((obj) => !___default["default"].isNil(obj) && !___default["default"].isNil(obj.pageIndex));
        return Array.from(new Set(cleanedList.map(obj => obj === null || obj === void 0 ? void 0 : obj.pageIndex)));
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
        if (!(page instanceof Array))
            bboxMap[page + 1].push(mcidList[index]);
        else {
            const [mcid, id] = mcidList[index];
            const multiBboxPagesObj = getMultiBboxPagesObj(mcid);
            page.forEach(pageIndex => bboxMap[pageIndex + 1].push([multiBboxPagesObj[pageIndex + 1], id]));
        }
    });
    return bboxMap;
};
const createAllBboxes = (bboxesAll, pageMap, refMap, annotations, viewport, rotateAngle) => {
    if (___default["default"].isNil(bboxesAll))
        return [];
    const unfilteredBboxes = bboxesAll === null || bboxesAll === void 0 ? void 0 : bboxesAll.map((bbox) => {
        const [mcid, id] = bbox;
        const listOfMcid = cleanArray(mcid).map((obj) => { var _a; return (obj === null || obj === void 0 ? void 0 : obj.stm) ? { mcid: obj === null || obj === void 0 ? void 0 : obj.mcid, ref: (_a = obj === null || obj === void 0 ? void 0 : obj.stm) === null || _a === void 0 ? void 0 : _a.num } : obj === null || obj === void 0 ? void 0 : obj.mcid; });
        const location = parseMcidToBbox(listOfMcid, pageMap, refMap, annotations, viewport, rotateAngle);
        if (___default["default"].isEmpty(location)) {
            return null;
        }
        const [, , width, height] = location;
        return {
            id,
            location: location,
            area: width * height,
        };
    });
    return cleanArray(unfilteredBboxes).sort(({ area: area1 }, { area: area2 }) => (area1 < area2) ? 1 : (area1 > area2) ? -1 : 0);
};
const stepRegExp = /(pages|operators|usedGlyphs|content|font)\[(\d+)\]/;
const calculateLocationInStreamOperator = (location) => {
    const path = location.split("/");
    let pageIndex, operatorIndex, subOperatorIndex;
    path.forEach((step) => {
        var _a;
        const [, stepName, index] = (_a = step.match(stepRegExp)) !== null && _a !== void 0 ? _a : [];
        switch (stepName) {
            case 'pages':
                pageIndex = parseInt(index);
                break;
            case 'operators':
                operatorIndex = parseInt(index);
                break;
            case 'content':
            case 'usedGlyphs':
                subOperatorIndex = parseInt(index);
                break;
            case 'font':
                subOperatorIndex = '*';
                break;
        }
    });
    if (pageIndex == null || operatorIndex == null || (subOperatorIndex == null)) {
        return null;
    }
    return {
        pageIndex,
        operatorIndex,
        subOperatorIndex,
    };
};
const getSelectedPageByLocation = (bboxLocation) => {
    const location = bboxLocation;
    const path = location.split('/');
    let pageNumber = -1;
    if ((location === null || location === void 0 ? void 0 : location.includes('pages')) && path[path.length - 1].startsWith('pages')) {
        location.split('/').forEach(nodeString => {
            if (nodeString.includes('pages')) {
                pageNumber = parseInt(nodeString.split(/[[\]]/)[1], 10) + 1;
            }
        });
    }
    return pageNumber;
};
const getBboxPages = (bboxes, structure) => {
    return bboxes.map((bbox) => {
        try {
            if (bbox.location.includes('StructTreeRoot') || bbox.location.includes('root/doc') || bbox.location === 'root') {
                const mcidData = getTagsFromErrorPlace(bbox.location, structure);
                const pageIndex = mcidData[0][1];
                return pageIndex + 1;
            }
            else {
                const bboxesFromLocation = bbox.location.includes('pages[') ? calculateLocation(bbox.location) : calculateLocationJSON(bbox.location);
                return bboxesFromLocation.length ? bboxesFromLocation[0].page : 0;
            }
        }
        catch (e) {
            console.error(`Location not supported: ${bbox.location}`);
        }
    });
};
const checkIsBboxOutOfThePage = (bbox, scale, page) => {
    const parent = document.querySelector('.react-pdf__Page[data-page-number="' + page + '"]');
    const parentHeight = parent.offsetHeight;
    const parentWidth = parent.offsetWidth;
    const left = parseFloat(bbox.location[0]) * scale;
    const top = parseFloat(bbox.location[1]) * scale;
    const width = parseFloat(bbox.location[2]) * scale;
    const height = parseFloat(bbox.location[3]) * scale;
    return (top <= 0 && (top + height) <= 1 ||
        left <= 0 && (left + width) <= 1 ||
        parentHeight - top <= 1 && (top + height) >= parentHeight ||
        parentWidth - left <= 1 && (left + width) >= parentWidth);
};
const calculateLocation = (location) => {
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
    }
    else {
        const height = parseFloat(y1) - parseFloat(y);
        bboxes.push({
            page: parseInt(start) + 1,
            location: [parseFloat(x), parseFloat(y), width, height],
        });
    }
    return bboxes;
};
const calculateLocationJSON = (location) => {
    const bboxes = [];
    const bboxMap = JSON.parse(location);
    bboxMap.bbox.forEach(({ p, rect }) => {
        const [x, y, x1, y1] = rect;
        const width = parseFloat(x1) - parseFloat(x);
        const height = parseFloat(y1) - parseFloat(y);
        bboxes.push({
            page: parseFloat(p) + 1,
            location: [parseFloat(x), parseFloat(y), width, height],
        });
    });
    return bboxes;
};
const getTagsFromErrorPlace = (context, structure) => {
    const defaultValue = [[[], -1, undefined]];
    let selectedTag = convertContextToPath(context);
    if (___default["default"].isEmpty(selectedTag)) {
        return defaultValue;
    }
    if (selectedTag.hasOwnProperty('mcid') && selectedTag.hasOwnProperty('pageIndex')) {
        const mcid = selectedTag.stm ? { mcid: selectedTag.mcid, ref: selectedTag.stm.num } : selectedTag.mcid;
        return [[[mcid], selectedTag.pageIndex]];
    }
    else if (selectedTag.hasOwnProperty('annot') && selectedTag.hasOwnProperty('pageIndex')) {
        return [[{ annot: selectedTag.annot }, selectedTag.pageIndex]];
    }
    else if (selectedTag.hasOwnProperty('contentItems')) {
        return [[undefined, selectedTag.pageIndex, [
                    selectedTag.contentStream,
                    selectedTag.content,
                    ...selectedTag.contentItems
                ]]];
    }
    else if (selectedTag instanceof Array) {
        let objectOfErrors = Object.assign({}, structure);
        selectedTag.forEach((node, index) => {
            let nextStepObject;
            if (!objectOfErrors.children) {
                nextStepObject = objectOfErrors[node[0]];
            }
            else if (!(objectOfErrors.children instanceof Array)) {
                if (objectOfErrors.children.name === node[1]) {
                    nextStepObject = objectOfErrors.children;
                }
                else {
                    nextStepObject = objectOfErrors;
                }
            }
            else {
                if ((objectOfErrors === null || objectOfErrors === void 0 ? void 0 : objectOfErrors.name) === node[1] && index === 0) {
                    nextStepObject = objectOfErrors;
                }
                else {
                    const clearedChildrenArray = [...objectOfErrors.children].filter((tag) => {
                        return !(tag === null || tag === void 0 ? void 0 : tag.hasOwnProperty('mcid')) && !(tag === null || tag === void 0 ? void 0 : tag.hasOwnProperty('rect'));
                    });
                    nextStepObject = Object.assign({}, (clearedChildrenArray.length ? clearedChildrenArray : objectOfErrors.children)[node[0]]);
                }
            }
            objectOfErrors = Object.assign({}, nextStepObject);
        });
        return findAllMcid(objectOfErrors);
    }
    return defaultValue;
};
/*
 *  Convert returning from veraPDF api path to error in array of nodes
 *
 *  @param errorContext {string} ugly path to error
 *
 *  @return arrayOfNodes {array} of nodes from Document to error Tag
 */
const convertContextToPath = (errorContext = '') => {
    let arrayOfNodes = [];
    if (!errorContext) {
        return arrayOfNodes;
    }
    let contextString = errorContext;
    try {
        if (contextString.includes('contentItem')) {
            const result = contextString.match(/pages\[(?<pages>\d+)\](\(.+\))?\/(annots\[(?<annots>\d+)\](\(.+\))?\/appearance\[\d\](\(.+\))?\/)?contentStream\[(?<contentStream>\d+)\](\(.+\))?\/content\[(?<content>\d+)\](\{mcid:\d+\})?(?<contentItems>((\(.+\))?\/contentItem\[(\d+)\](\{mcid:\d+\})?)+)/);
            if (result) {
                try {
                    let path = {};
                    path.pageIndex = parseInt(result.groups.pages, 10);
                    path.contentStream = parseInt(result.groups.contentStream, 10);
                    path.content = parseInt(result.groups.content, 10);
                    path.contentItems = result.groups.contentItems.split('/').filter((ci) => ci.includes('contentItem')).map((ci) => {
                        var _a;
                        const contentItemIndex = ci.match(/\[(?<contentItem>\d+)\]/);
                        return parseInt(((_a = contentItemIndex === null || contentItemIndex === void 0 ? void 0 : contentItemIndex.groups) === null || _a === void 0 ? void 0 : _a.contentItem) || '-1', 10);
                    });
                    path.annotIndex = parseInt(result.groups.annots, 10) || undefined;
                    return path;
                }
                catch (err) {
                    console.log('NoMCIDContentItemPathParseError:', err.message || err);
                }
            }
            let path = {};
            contextString.split('/').forEach(nodeString => {
                if (nodeString.includes('page')) {
                    path.pageIndex = parseInt(nodeString.split(/[[\]]/)[1], 10);
                }
                else if (nodeString.includes('contentItem') && nodeString.includes('mcid')) {
                    path.mcid = parseInt(nodeString.split('mcid:')[1].slice(0, -1), 10);
                }
            });
            return path;
        }
        else if (contextString.includes('annots')) {
            let path = {};
            contextString.split('/').forEach(nodeString => {
                if (nodeString.includes('page')) {
                    path.pageIndex = parseInt(nodeString.split(/[[\]]/)[1], 10);
                }
                else if (nodeString.includes('annots')) {
                    path.annot = parseInt(nodeString.split(/[[\]]/)[1], 10);
                }
            });
            return path;
        }
        contextString = contextString.split('PDStructTreeRoot)/')[1].split('/'); // cut path before start of Document
        contextString.forEach(nodeString => {
            const nextIndex = parseInt(nodeString.split('](')[0].split('K[')[1], 10);
            let nextTag = nodeString
                .split('(')[1]
                .split(')')[0]
                .split(' ');
            nextTag = nextTag[nextTag.length - 1];
            arrayOfNodes = [...arrayOfNodes, [nextIndex, nextTag]];
        });
        return arrayOfNodes;
    }
    catch (e) {
        return [];
    }
};
/*
 *  Going through object of tags from error placement and return array of its MCIDs
 *
 *  @param {Object} of tags
 *
 *  @return [[{Array}, {Number}]] - [[[array of mcids], page of error]]
 */
function findAllMcid(tagObject) {
    const mcidMap = {};
    function func(obj) {
        if (!obj)
            return;
        if (obj.mcid || obj.mcid === 0) {
            if (!mcidMap[obj.pageIndex])
                mcidMap[obj.pageIndex] = [];
            mcidMap[obj.pageIndex].push(obj.mcid);
        }
        if (!obj.children) {
            return;
        }
        if (!(obj.children instanceof Array)) {
            func(obj.children);
        }
        else {
            [...obj.children].forEach(child => func(child));
        }
    }
    func(tagObject);
    return ___default["default"].map(mcidMap, (value, key) => [value, ___default["default"].toNumber(key)]);
}
const getBboxForViewport = (bbox, viewport, rotateAngle, leftOffset, bottomOffset) => {
    const coords = [...bbox];
    coords[0] += leftOffset;
    coords[1] += bottomOffset;
    const coordsArray = rotateCoordinates(coords, rotateAngle, viewport);
    const rotatedViewport = rotateViewport(rotateAngle, viewport);
    return [coordsArray[0] - rotatedViewport[0], coordsArray[1] - rotatedViewport[1], coordsArray[2], coordsArray[3]];
};
const parseMcidToBbox = (listOfMcid, pageMap, refMap, annotations, viewport, rotateAngle, left = 0, bottom = 0) => {
    var _a;
    let coords = {};
    let leftOffset = left;
    let bottomOffset = bottom;
    if (listOfMcid instanceof Array) {
        listOfMcid.forEach(mcid => {
            var _a;
            let currentBbox;
            if (mcid instanceof Object) {
                currentBbox = ___default["default"].isNil(mcid.ref) ? pageMap[mcid.mcid] : (_a = refMap === null || refMap === void 0 ? void 0 : refMap[`${mcid.ref}R`]) === null || _a === void 0 ? void 0 : _a[mcid.mcid];
            }
            else {
                currentBbox = pageMap[mcid];
            }
            if (!___default["default"].isNil(currentBbox) &&
                !___default["default"].isNaN(currentBbox.x) &&
                !___default["default"].isNaN(currentBbox.y) &&
                !___default["default"].isNaN(currentBbox.width) &&
                !___default["default"].isNaN(currentBbox.height)) {
                coords = concatBoundingBoxes(currentBbox, coords.hasOwnProperty('x') ? coords : undefined);
            }
        });
    }
    else if (listOfMcid.hasOwnProperty('annot')) {
        const rect = (_a = annotations[listOfMcid.annot]) === null || _a === void 0 ? void 0 : _a.rect;
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
    if (!coords || ___default["default"].isEmpty(coords))
        return [];
    const coordsArray = rotateCoordinates([
        coords.x + leftOffset,
        coords.y + bottomOffset,
        coords.width,
        coords.height,
    ], rotateAngle, viewport);
    const rotatedViewport = rotateViewport(rotateAngle, viewport);
    return [coordsArray[0] - rotatedViewport[0], coordsArray[1] - rotatedViewport[1], coordsArray[2], coordsArray[3]];
};
const rotateViewport = (rotateAngle, viewport) => {
    if ([0, 180].includes(rotateAngle)) {
        return viewport;
    }
    return [viewport[1], viewport[0], viewport[3], viewport[2]];
};
const rotateCoordinates = (coords, rotateAngle, viewport) => {
    if (rotateAngle === 0)
        return coords;
    const [x1, y1] = rotatePoint(rotateAngle, [coords[0], coords[1]], viewport);
    const [x2, y2] = rotatePoint(rotateAngle, [coords[0] + coords[2], coords[1] + coords[3]], viewport);
    return [Math.min(x1, x2), Math.min(y1, y2), Math.abs(x1 - x2), Math.abs(y1 - y2)];
};
const rotatePoint = (rotateAngle, point, viewport) => {
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
    }
    return [x, y];
};
const activeBboxInViewport = () => {
    let isInView = false;
    const bboxes = document.querySelectorAll('.pdf-bbox_selected');
    for (let index = 0; index < bboxes.length; index++) {
        isInView = elementInViewport(bboxes[index]);
        if (isInView) {
            break;
        }
    }
    return isInView;
};
const scrollToActiveBbox = (force) => {
    setTimeout(() => {
        if (!force && activeBboxInViewport())
            return;
        const el = document.querySelector('.pdf-bbox_selected');
        if (el)
            el.scrollIntoView({ block: 'center', inline: 'center' });
    }, 100);
};
function elementInViewport(el) {
    let top = el.offsetTop;
    let left = el.offsetLeft;
    const width = el.offsetWidth;
    const height = el.offsetHeight;
    const elementArea = width * height;
    while (el.offsetParent && !el.offsetParent.className.includes('pdf-viewer')) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }
    const parent = document.querySelector('.pdf-viewer');
    const parentArea = parent.clientWidth * parent.clientHeight;
    const parentScrollTop = parent.scrollTop;
    const parentScrollLeft = parent.scrollLeft;
    if (elementArea >= parentArea) {
        return true;
    }
    return (top >= parentScrollTop &&
        left >= parentScrollLeft &&
        (top + height) <= (parentScrollTop + parent.clientHeight) &&
        (left + width) <= (parentScrollLeft + parent.clientWidth));
}
function concatBoundingBoxes(newBoundingBox, oldBoundingBox) {
    if (___default["default"].isNil(oldBoundingBox) && ___default["default"].isNil(newBoundingBox)) {
        return {};
    }
    if (___default["default"].isNil(newBoundingBox) || Object.values(newBoundingBox).some((el) => ___default["default"].isNil(el))) {
        return oldBoundingBox || {};
    }
    if (___default["default"].isNil(oldBoundingBox)) {
        return ___default["default"].cloneDeep(newBoundingBox);
    }
    return {
        x: Math.min(newBoundingBox.x, oldBoundingBox.x),
        y: Math.min(newBoundingBox.y, oldBoundingBox.y),
        width: Math.max(newBoundingBox.x + newBoundingBox.width, oldBoundingBox.x + oldBoundingBox.width) -
            Math.min(newBoundingBox.x, oldBoundingBox.x),
        height: Math.max(newBoundingBox.y + newBoundingBox.height, oldBoundingBox.y + oldBoundingBox.height) -
            Math.min(newBoundingBox.y, oldBoundingBox.y),
    };
}

const WARNING_CODES = {
    BBOX_OUT_OF_THE_PAGE_VIEWPORT: 'BBOX_OUT_OF_THE_PAGE_VIEWPORT',
};

___$insertStyle(".pdf-page {\n  position: relative;\n  background: #fff;\n  margin-top: 8px;\n  overflow: hidden;\n  -moz-box-shadow: 0 0 4px 2px #cccccc;\n  -webkit-box-shadow: 0 0 4px 2px #cccccc;\n  box-shadow: 0 0 4px 2px #cccccc;\n}\n.pdf-page .bbox-wrapper {\n  opacity: 0.75;\n  isolation: isolate;\n}\n.pdf-page_selected {\n  outline: orangered solid 2px;\n}");

const bboxBorderHover = 'orangered';
const StyledPdfPage = styled__default["default"].div.withConfig({ displayName: "StyledPdfPage", componentId: "-1bn9hgf" }) `
  margin-left: auto;
  margin-right: auto;
  height: ${(props) => props.height ? props.height * props.scale + 'px' : 'fit-content'};
  width: ${(props) => props.width ? props.width * props.scale + 'px' : 'fit-content'};
  &.pdf-page_selected {
    outline-color: ${(props) => props.colorScheme && props.colorScheme.borderSelected || bboxBorderHover};
  }
`;
const PdfPage = (props) => {
    var _a, _b;
    const { scrollInto } = React.useContext(ViewerContext);
    const { treeElementsBboxes, bboxList, scale = 1 } = props;
    const [page, setPage] = React.useState(null);
    const prevPageBboxes = reactUse.usePrevious({ page, treeElementsBboxes });
    const intersectionRef = React.useRef(null);
    const [bboxesAll, setBboxesAll] = React.useState([]);
    const [bboxesErrors, setBboxesErrors] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    const [pageScale, setPageScale] = React.useState(scale);
    const [pageViewport, setPageViewport] = React.useState([]);
    const [isRendered, setIsRendered] = React.useState(false);
    const [isIntersecting, setIsIntersecting] = React.useState(false);
    const [intersectionRatio, setIntersectionRatio] = React.useState(0);
    const [pageBorders, setPageBorders] = React.useState({});
    React.useLayoutEffect(() => {
        if (intersectionRef.current) {
            const observer = new ResizeObserver((entries) => {
                window.requestAnimationFrame(() => {
                    const { width, height } = entries[0].contentRect;
                    setPageBorders({ width, height });
                });
            });
            setPageBorders({
                width: intersectionRef.current.clientWidth,
                height: intersectionRef.current.clientHeight,
            });
            observer.observe(intersectionRef.current);
            return () => observer.disconnect();
        }
        return;
    }, []);
    useIntersection.useIntersection(intersectionRef, {
        threshold: [.2, .4, .5, .6, .8, 1],
    }, (entry) => {
        if (isIntersecting !== entry.isIntersecting) {
            setIsIntersecting(entry.isIntersecting);
        }
        if (intersectionRatio !== entry.intersectionRatio) {
            setIntersectionRatio(entry.intersectionRatio);
        }
    });
    const { activeBboxId, activeBboxIndex } = React.useMemo(() => {
        var _a, _b;
        const { id: activeBboxId } = (_a = props.activeBboxId) !== null && _a !== void 0 ? _a : {};
        const { index: activeBboxIndex } = (_b = props.activeBboxIndex) !== null && _b !== void 0 ? _b : {};
        return { activeBboxId, activeBboxIndex };
    }, [(_a = props.activeBboxIndex) === null || _a === void 0 ? void 0 : _a.index, (_b = props.activeBboxId) === null || _b === void 0 ? void 0 : _b.id]);
    const onPageClick = React.useCallback((e) => {
        var _a;
        e.stopPropagation();
        (_a = props.onBboxClick) === null || _a === void 0 ? void 0 : _a.call(props, null);
    }, [props.onBboxClick]);
    const onBboxClick = React.useCallback((index, id) => (e) => {
        var _a;
        e.stopPropagation();
        (_a = props.onBboxClick) === null || _a === void 0 ? void 0 : _a.call(props, { index, id });
    }, [props.onBboxClick]);
    const onPageRenderSuccess = React.useCallback(() => {
        var _a, _b;
        setIsRendered(true);
        (_a = props.onPageRenderSuccess) === null || _a === void 0 ? void 0 : _a.call(props, intersectionRef.current);
        (_b = document.querySelectorAll('.pdf-page_rendered img')) === null || _b === void 0 ? void 0 : _b.forEach((img) => {
            if (img.alt.includes('Annotation')) {
                const index = img.src.lastIndexOf('/') + 1;
                const name = img.src.substr(index);
                img.src = require(`pdfjs-dist/web/images/${name}`) || img.src;
            }
        });
    }, [props.onPageRenderSuccess]);
    const onPageLoadSuccess = React.useCallback((page) => {
        var _a;
        setPage(page);
        setIsRendered(true);
        setPageViewport(page.view);
        (_a = props.onPageLoadSuccess) === null || _a === void 0 ? void 0 : _a.call(props, page);
    }, [props.onPageLoadSuccess]);
    React.useEffect(() => {
        const triggeredByBboxList = prevPageBboxes
            && prevPageBboxes.page === page
            && prevPageBboxes.treeElementsBboxes === treeElementsBboxes;
        if (page) {
            if (triggeredByBboxList && !(bboxList === null || bboxList === void 0 ? void 0 : bboxList.length))
                setBboxesErrors([]);
            else {
                Promise.all([page.getOperatorList(), page.getAnnotations()]).then(([operatorList, annotations]) => {
                    const annotBBoxesAndOpPos = operatorList.argsArray[operatorList.argsArray.length - 3];
                    const operationData = operatorList.argsArray[operatorList.argsArray.length - 2];
                    const [positionData, noMCIDData, refPositionData] = operatorList.argsArray[operatorList.argsArray.length - 1];
                    const annotsFormatted = getFormattedAnnotations(annotations);
                    const errorBboxes = (bboxList !== null && bboxList !== void 0 ? bboxList : []).flatMap((bbox) => {
                        var _a, _b, _c, _d, _e, _f, _g, _h;
                        let opData = operationData, posData = positionData, nMcidData = noMCIDData;
                        let left = 0, bottom = 0;
                        const { annotIndex } = bbox;
                        if (annotIndex != null) {
                            left = (_b = (_a = annotations[annotIndex]) === null || _a === void 0 ? void 0 : _a.rect[0]) !== null && _b !== void 0 ? _b : 0;
                            bottom = (_d = (_c = annotations[annotIndex]) === null || _c === void 0 ? void 0 : _c.rect[1]) !== null && _d !== void 0 ? _d : 0;
                            opData = (_f = (_e = annotBBoxesAndOpPos[annotIndex]) === null || _e === void 0 ? void 0 : _e[0]) !== null && _f !== void 0 ? _f : [];
                            [posData, nMcidData] = (_h = (_g = annotBBoxesAndOpPos[annotIndex]) === null || _g === void 0 ? void 0 : _g[1]) !== null && _h !== void 0 ? _h : [[], []];
                        }
                        if (bbox.mcidList) {
                            bbox.location = parseMcidToBbox(bbox.mcidList, posData, refPositionData, annotsFormatted, page.view, page.rotate, left, bottom);
                            if (___default["default"].isEmpty(bbox.location)) {
                                return null;
                            }
                        }
                        else if (bbox.contentItemPath) {
                            const contentItemsPath = bbox.contentItemPath.slice(2);
                            let contentItemsBBoxes = nMcidData[bbox.contentItemPath[1]];
                            try {
                                contentItemsPath.forEach((ci, i) => {
                                    if (contentItemsPath.length > i + 1 || !contentItemsBBoxes.final) {
                                        contentItemsBBoxes = contentItemsBBoxes.contentItems[0];
                                    }
                                    contentItemsBBoxes = contentItemsBBoxes.contentItems[ci];
                                });
                                bbox.location = [
                                    contentItemsBBoxes.contentItem.x + left,
                                    contentItemsBBoxes.contentItem.y + bottom,
                                    contentItemsBBoxes.contentItem.w,
                                    contentItemsBBoxes.contentItem.h
                                ];
                            }
                            catch (err) {
                                console.log('NoMCIDDataParseError:', err.message || err);
                                bbox.location = [0, 0, 0, 0];
                            }
                        }
                        if (___default["default"].isFinite(bbox.operatorIndex) && bbox.subOperatorIndex != null) {
                            const { operatorIndex, subOperatorIndex } = bbox;
                            const operator = opData[operatorIndex];
                            if (!Array.isArray(operator)) {
                                bbox.location = [];
                            }
                            else if (subOperatorIndex === '*') {
                                return operator.map((coords) => (Object.assign(Object.assign({}, bbox), { location: getBboxForViewport(coords, page.view, page.rotate, left, bottom) })));
                            }
                            else {
                                const coords = operator[subOperatorIndex];
                                bbox.location = coords
                                    ? getBboxForViewport(coords, page.view, page.rotate, left, bottom)
                                    : [];
                            }
                        }
                        return bbox;
                    });
                    if (!triggeredByBboxList) {
                        const allBboxes = createAllBboxes(treeElementsBboxes, positionData, refPositionData, annotsFormatted, page.view, page.rotate);
                        setBboxesAll(allBboxes);
                    }
                    setBboxesErrors(errorBboxes);
                });
            }
        }
    }, [page, bboxList, treeElementsBboxes]);
    React.useEffect(() => {
        var _a;
        if (!loaded && isIntersecting) {
            setLoaded(true);
        }
        (_a = props.onPageInViewport) === null || _a === void 0 ? void 0 : _a.call(props, props.page, { isIntersecting, intersectionRatio });
    }, [isIntersecting, intersectionRatio, loaded]);
    React.useEffect(() => {
        var _a;
        if (scrollInto.page === props.page) {
            (_a = intersectionRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView();
        }
    }, [scrollInto]);
    React.useEffect(() => {
        const width = pageViewport[2] - pageViewport[0];
        const height = pageViewport[3] - pageViewport[1];
        if (props.width && width) {
            return setPageScale((props.width / width) * scale);
        }
        else if (props.height && height) {
            return setPageScale((props.height / height) * scale);
        }
        setPageScale(scale);
    }, [pageViewport, scale, props.width, props.height]);
    const isBboxSelected = React.useCallback((bbox) => {
        var _a;
        if (!___default["default"].isNil(activeBboxIndex))
            return bbox.index === activeBboxIndex;
        if (___default["default"].isNil(activeBboxId))
            return false;
        let isStructureBboxSelected;
        switch (props.treeBboxSelectionMode) {
            case TreeBboxSelectionMode.SELECTED_WITH_KIDS: {
                isStructureBboxSelected = (bbox === null || bbox === void 0 ? void 0 : bbox.id) === activeBboxId || ((_a = bbox === null || bbox === void 0 ? void 0 : bbox.id) === null || _a === void 0 ? void 0 : _a.startsWith(`${activeBboxId}:`));
                break;
            }
            case TreeBboxSelectionMode.SELECTED:
            default: isStructureBboxSelected = (bbox === null || bbox === void 0 ? void 0 : bbox.id) === activeBboxId;
        }
        return isStructureBboxSelected;
    }, [activeBboxIndex, activeBboxId]);
    const isBboxRelated = React.useCallback((bbox) => {
        var _a, _b;
        const [, , activeId] = ((_a = props === null || props === void 0 ? void 0 : props.groupId) === null || _a === void 0 ? void 0 : _a.split('-')) || [];
        const [, , bboxId] = ((_b = bbox === null || bbox === void 0 ? void 0 : bbox.groupId) === null || _b === void 0 ? void 0 : _b.split('-')) || [];
        return props.groupId ? activeId === bboxId && !isBboxSelected(bbox) : false;
    }, [props.groupId, isBboxSelected]);
    const isBboxStructured = React.useCallback((bbox) => ___default["default"].isNil(bbox.index), []);
    const isBboxDisabled = React.useCallback((bbox) => {
        if (___default["default"].isNil(bbox))
            return true;
        if (bbox.hasOwnProperty('isVisible'))
            return !bbox.isVisible;
        return !props.isTreeBboxesVisible;
    }, [props.isTreeBboxesVisible]);
    const bboxes = React.useMemo(() => {
        /*
          Sorting bboxes in descending order of area
          Note: if the area of error bbox equal to the area of structure bbox,
          then we assume that the structure bbox has a larger area
        */
        return [...bboxesAll, ...cleanArray(bboxesErrors)].sort(({ location: locationAll }, { location: locationError }) => {
            const getArea = (arr) => ___default["default"].round(+arr[2], 4) * ___default["default"].round(+arr[3], 4);
            const areaAll = locationAll ? getArea(locationAll) : 0;
            const areaError = locationError ? getArea(locationError) : 0;
            return areaAll < areaError ? 1 : (areaAll > areaError ? -1 : 0);
        });
    }, [bboxesErrors, bboxesAll]);
    const activeBboxes = React.useMemo(() => bboxes.filter((bbox) => {
        const isBboxMode = !___default["default"].isNil(activeBboxIndex);
        return isBboxMode ? bbox.index === activeBboxIndex : (bbox === null || bbox === void 0 ? void 0 : bbox.id) === activeBboxId;
    }), [activeBboxIndex, activeBboxId]);
    React.useEffect(React.useCallback(() => {
        var _a;
        if (activeBboxes && activeBboxes.length && activeBboxes.every((activeBbox) => checkIsBboxOutOfThePage(activeBbox, scale, props.page))) {
            (_a = props.onWarning) === null || _a === void 0 ? void 0 : _a.call(props, WARNING_CODES.BBOX_OUT_OF_THE_PAGE_VIEWPORT);
        }
    }, [activeBboxes, scale, props.page]), [activeBboxes]);
    return (React__default["default"].createElement("div", { className: "pdf-page-min-margin-wrapper", style: { margin: '0 15px' } },
        React__default["default"].createElement(StyledPdfPage, { className: `pdf-page pdf-page_rendered${props.isPageSelected ? ' pdf-page_selected' : ''}`, "data-page": props.page, onClick: onPageClick, height: !isRendered ? props.height || props.defaultHeight : undefined, width: !isRendered ? props.width || props.defaultWidth : undefined, scale: pageScale, ref: intersectionRef, colorScheme: props.colorScheme || {} }, loaded ? React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(reactPdf.Page, { pageNumber: props.page, error: props.pageError, height: props.height, width: props.width, loading: props.pageLoading, inputRef: props.inputRef, renderAnnotationLayer: props.renderAnnotationLayer, renderForms: props.renderInteractiveForms, renderTextLayer: props.renderTextLayer, scale: props.scale, onLoadError: props.onPageLoadError, onLoadSuccess: onPageLoadSuccess, onRenderError: props.onPageRenderError, onRenderSuccess: onPageRenderSuccess, onGetAnnotationsSuccess: props.onGetAnnotationsSuccess, onGetAnnotationsError: props.onGetAnnotationsError, onGetTextSuccess: props.onGetTextSuccess, onGetTextError: props.onGetTextError, customTextRenderer: props.customTextRenderer }),
            isRendered ? React__default["default"].createElement("div", { className: "bbox-wrapper" }, bboxes.map((bbox, index) => (React__default["default"].createElement(Bbox$1, { key: index, bbox: bbox, pageBorders: pageBorders, onClick: onBboxClick(bbox.index, bbox.id), disabled: isBboxDisabled(bbox), structured: isBboxStructured(bbox), selected: isBboxSelected(bbox), related: isBboxRelated(bbox), scale: pageScale, selectionMode: props.treeBboxSelectionMode, colorScheme: props.colorScheme })))) : null) : null)));
};
var PdfPage$1 = React.memo(PdfPage);

___$insertStyle(".pdf-document {\n  display: flex;\n  flex-direction: column;\n  min-width: fit-content;\n  width: 100%;\n}");

reactPdf.pdfjs.GlobalWorkerOptions.workerSrc = new URL(pdfWorkerURL__default["default"], (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT' && document.currentScript.src || new URL('index.js', document.baseURI).href))).toString();
class MapWithEvents extends Map {
    constructor() {
        super(...arguments);
        this.emitter = new EventEmitter__default["default"]();
    }
    addEventListener(type, callback, once) {
        if (once) {
            this.emitter.once(type, callback);
        }
        else {
            this.emitter.on(type, callback);
        }
    }
    removeEventListener(type, callback) {
        this.emitter.off(type, callback);
    }
    set(key, value) {
        super.set(key, value);
        this.emitter.emit('add', key, value);
        return this;
    }
}
const zoomInScaleRatioThreshold = 0.4;
const zoomOutScaleRatioThreshold = 0.7;
const PdfDocument = (props) => {
    var _a, _b;
    const renderedPages = React.useRef(new MapWithEvents());
    const { page, setPage, maxPage, setMaxPage, scrollInto, setScrollIntoPage } = React.useContext(ViewerContext);
    const { bboxes = [] } = props;
    const [loaded, setLoaded] = React.useState(false);
    const [structureTree, setStructureTree] = React.useState({});
    const [parsedTree, setParsedTree] = React.useState({});
    const [bboxMap, setBboxMap] = React.useState({});
    const [treeElementsBboxes, setTreeElementsBboxes] = React.useState({});
    const [pagesByViewport, setPagesByViewport] = React.useState([]);
    const [ratioArray, setRatioArray] = React.useState([]);
    const [defaultHeight, setDefaultHeight] = React.useState(props.defaultHeight);
    const [defaultWidth, setDefaultWidth] = React.useState(props.defaultWidth);
    const [selectedPage, setSelectedPage] = React.useState(undefined);
    const { activeBboxId, activeBboxIndex } = React.useMemo(() => {
        var _a, _b;
        const { id: activeBboxId } = (_a = props.activeBboxId) !== null && _a !== void 0 ? _a : {};
        const { index: activeBboxIndex } = (_b = props.activeBboxIndex) !== null && _b !== void 0 ? _b : {};
        return { activeBboxId, activeBboxIndex };
    }, [(_a = props.activeBboxIndex) === null || _a === void 0 ? void 0 : _a.index, (_b = props.activeBboxId) === null || _b === void 0 ? void 0 : _b.id]);
    const autoScaleRatio = React.useMemo(() => {
        if (!props.autoScaleOptions)
            return [];
        const scales = props.autoScaleOptions.map(({ value }) => +value).sort((a, b) => b - a);
        const ratioScales = [];
        for (const s of scales) {
            if (s > 1) {
                ratioScales.push({ ratio: zoomInScaleRatioThreshold / s, scale: s });
            }
            else if (s === 1) {
                ratioScales.push({ ratio: zoomOutScaleRatioThreshold, scale: 1 });
            }
            else if (zoomOutScaleRatioThreshold / s <= 1) {
                ratioScales.push({ ratio: zoomOutScaleRatioThreshold / s, scale: s });
            }
            else {
                break;
            }
        }
        return ratioScales;
    }, [props.autoScaleOptions]);
    const activeBbox = React.useMemo(() => {
        return activeBboxIndex != null ? bboxes[activeBboxIndex] : null;
    }, [activeBboxIndex, bboxes]);
    const shownPages = React.useMemo(() => {
        if (props.showAllPages) {
            return Array.from(new Array(maxPage), (_el, index) => index + 1);
        }
        return [props.page || 1];
    }, [maxPage, props.showAllPages, props.page]);
    React.useEffect(() => {
        var _a;
        setBboxMap(buildBboxMap(bboxes, structureTree));
        (_a = props.onBboxesParsed) === null || _a === void 0 ? void 0 : _a.call(props, getBboxPages(bboxes, structureTree));
    }, [bboxes, structureTree]);
    React.useEffect(() => {
        const mcidList = getMcidList(parsedTree !== null && parsedTree !== void 0 ? parsedTree : {});
        setTreeElementsBboxes(createBboxMap(mcidList));
    }, [parsedTree]);
    const handleZoomOnActive = React.useCallback((page, controller) => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d, _e, _f, _g;
        const { setScale } = props;
        if (!setScale || !autoScaleRatio.length) {
            return;
        }
        if (!renderedPages.current.has(page)) {
            yield new Promise((resolve, reject) => {
                const callback = (v) => {
                    if (v === page) {
                        renderedPages.current.removeEventListener('add', callback);
                        resolve();
                    }
                };
                renderedPages.current.addEventListener('add', callback);
                controller.signal.onabort = () => {
                    renderedPages.current.removeEventListener('add', callback);
                    reject(new Error('Aborted'));
                };
            });
        }
        const pageEl = renderedPages.current.get(page);
        if (!pageEl)
            return;
        const { clientWidth: pageWidth, clientHeight: pageHeight } = pageEl;
        const selectedBboxes = document.querySelectorAll('.pdf-bbox_selected');
        let [x0, y0, x1, y1] = [
            Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY,
            Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY,
        ];
        selectedBboxes.forEach((b) => {
            const { x, y, width, height } = b.getBoundingClientRect();
            x0 = Math.min(x0, x);
            y0 = Math.min(y0, y);
            x1 = Math.max(x1, x + width);
            y1 = Math.max(y1, y + height);
        });
        let newScale = 1;
        const w = (x1 - x0), h = (y1 - y0);
        if (Number.isFinite(w)) {
            const wRatio = w / pageWidth;
            newScale = (_d = (_c = autoScaleRatio
                .find(({ ratio }, i, { length }) => wRatio < ratio || i + 1 === length)) === null || _c === void 0 ? void 0 : _c.scale) !== null && _d !== void 0 ? _d : 1;
        }
        if (Number.isFinite(h)) {
            const hRatio = h / pageHeight;
            const tempScale = (_f = (_e = autoScaleRatio
                .find(({ ratio }, i, { length }) => hRatio < ratio || i + 1 === length)) === null || _e === void 0 ? void 0 : _e.scale) !== null && _f !== void 0 ? _f : 1;
            newScale = Math.min(newScale, tempScale);
        }
        if (newScale !== ((_g = props.scale) !== null && _g !== void 0 ? _g : 1)) {
            renderedPages.current.clear();
            setScale(newScale.toString());
        }
    }), [props.setScale, props.scale, autoScaleRatio]);
    React.useEffect(() => {
        const isBboxMode = !___default["default"].isNil(activeBboxIndex);
        const id = isBboxMode ? activeBboxIndex : activeBboxId;
        if ((id !== null && id !== void 0 ? id : false) === false) {
            return;
        }
        const autoZoom = isBboxMode ? props.activeBboxIndex.zoom : props.activeBboxId.zoom;
        const entries = Object.entries(isBboxMode ? bboxMap : treeElementsBboxes);
        const finder = isBboxMode
            ? (value) => ___default["default"].find(value, { index: activeBboxIndex })
            : (value) => ___default["default"].find(value, arr => arr[1] === activeBboxId);
        let bboxPage = 0;
        for (const [key, value] of entries) {
            if (finder(value)) {
                bboxPage = parseInt(key);
                break;
            }
        }
        if (bboxPage > 0) {
            if (autoZoom) {
                const controller = new AbortController();
                const forceScrollToActiveBbox = (p) => {
                    if (bboxPage === p) {
                        renderedPages.current.removeEventListener('add', forceScrollToActiveBbox);
                        scrollToActiveBbox(true);
                    }
                };
                handleZoomOnActive(bboxPage, controller)
                    .then(() => {
                    if (renderedPages.current.has(bboxPage))
                        scrollToActiveBbox();
                    else {
                        setScrollIntoPage(bboxPage);
                        renderedPages.current.addEventListener('add', forceScrollToActiveBbox);
                    }
                })
                    .catch(() => { });
                return () => {
                    controller.abort();
                    renderedPages.current.removeEventListener('add', forceScrollToActiveBbox);
                };
            }
            else {
                if (renderedPages.current.has(bboxPage))
                    scrollToActiveBbox();
                else {
                    setScrollIntoPage(bboxPage);
                    const scrollOnRender = (p) => {
                        if (bboxPage === p) {
                            renderedPages.current.removeEventListener('add', scrollOnRender);
                            scrollToActiveBbox();
                        }
                    };
                    renderedPages.current.addEventListener('add', scrollOnRender);
                    return () => {
                        renderedPages.current.removeEventListener('add', scrollOnRender);
                    };
                }
            }
        }
        return;
    }, [
        props.activeBboxIndex, props.activeBboxId,
        bboxMap, treeElementsBboxes,
    ]);
    React.useEffect(() => {
        if (activeBbox) {
            const selectedPage = getSelectedPageByLocation(activeBbox.location);
            if (selectedPage > -1) {
                setPage(selectedPage);
            }
            setSelectedPage(selectedPage);
        }
        else {
            setSelectedPage(undefined);
        }
    }, [activeBbox]);
    const onDocumentLoadSuccess = React.useCallback((data) => __awaiter(void 0, void 0, void 0, function* () {
        var _h;
        setStructureTree(data._pdfInfo.structureTree);
        const parsedTree = parseTree(___default["default"].cloneDeep(data._pdfInfo.structureTree));
        const treeWithData = structurizeTree(parsedTree);
        const [treeWithIds, annotMap] = setTreeIds(treeWithData !== null && treeWithData !== void 0 ? treeWithData : {});
        if (!___default["default"].isNil(treeWithIds))
            treeWithIds.annotMap = annotMap;
        setParsedTree(treeWithIds !== null && treeWithIds !== void 0 ? treeWithIds : {});
        data.parsedTree = treeWithIds !== null && treeWithIds !== void 0 ? treeWithIds : {};
        const pageData = yield data.getPage(1);
        const width = Math.min(pageData.view[2], props.defaultWidth || pageData.view[2]);
        const scale = width / pageData.view[2];
        setDefaultWidth(width);
        setDefaultHeight(pageData.view[3] * scale);
        setMaxPage(data.numPages);
        setLoaded(true);
        (_h = props.onLoadSuccess) === null || _h === void 0 ? void 0 : _h.call(props, data);
    }), [props.onLoadSuccess, bboxes, props.defaultHeight, props.defaultWidth]);
    const onPageLoadSuccess = React.useCallback((data) => {
        var _a;
        (_a = props.onPageLoadSuccess) === null || _a === void 0 ? void 0 : _a.call(props, data);
    }, [props.onPageLoadSuccess]);
    const onPageInViewport = React.useCallback((page, intersection) => {
        if (props.showAllPages) {
            setPageByViewport(page, intersection);
        }
        else {
            setPage(page);
        }
    }, [maxPage, props.showAllPages]);
    const onBboxClick = React.useCallback((data) => {
        var _a;
        (_a = props.onBboxClick) === null || _a === void 0 ? void 0 : _a.call(props, data);
    }, [props.onBboxClick]);
    const setPageByViewport = React.useMemo(() => (newPage, intersection) => {
        const { isIntersecting, intersectionRatio } = intersection;
        if (isIntersecting) {
            if (!pagesByViewport.includes(newPage)) {
                pagesByViewport.push(newPage);
                ratioArray.push(intersectionRatio);
                setPagesByViewport(pagesByViewport);
                setRatioArray(ratioArray);
            }
            else {
                ratioArray[pagesByViewport.indexOf(newPage)] = intersectionRatio;
                setRatioArray(ratioArray);
            }
        }
        else {
            if (pagesByViewport.includes(newPage)) {
                const prevPageIndex = pagesByViewport.indexOf(newPage);
                pagesByViewport.splice(prevPageIndex, 1);
                setPagesByViewport(pagesByViewport);
                ratioArray.splice(prevPageIndex, 1);
                setRatioArray(ratioArray);
            }
        }
        let newPageIndex = -1;
        pagesByViewport.forEach((_pageFromViewport, index) => {
            if (newPageIndex === -1) {
                newPageIndex = index;
            }
            if (ratioArray[newPageIndex] < ratioArray[index]) {
                newPageIndex = index;
            }
        });
        if (newPageIndex !== -1 && pagesByViewport[newPageIndex]) {
            setPage(pagesByViewport[newPageIndex]);
            if (scrollInto.page) {
                setScrollIntoPage(0);
            }
        }
    }, [pagesByViewport, page, ratioArray, scrollInto]);
    reactUse.useDebounce(() => {
        var _a;
        if (props.page !== page)
            (_a = props.onPageChange) === null || _a === void 0 ? void 0 : _a.call(props, page);
    }, 30, [page]);
    React.useEffect(() => {
        if (page !== props.page) {
            setPage(props.page || 1);
            if (props.showAllPages) {
                setScrollIntoPage(props.page);
            }
        }
    }, [props.page, props.showAllPages]);
    React.useEffect(() => {
        renderedPages.current.clear();
        setLoaded(false);
        setPagesByViewport([]);
        setRatioArray([]);
        setDefaultHeight(0);
        setDefaultWidth(0);
        setMaxPage(0);
        setPage(1);
    }, [props.file]);
    React.useEffect(() => {
        function handlekeydownEvent(event) {
            var _a, _b;
            if ((event.ctrlKey || event.metaKey) && event.key === 'ArrowUp') {
                props.onSelectBbox((___default["default"].isNil(activeBboxIndex) || activeBboxIndex === -1 || activeBboxIndex === 0) ? 0 : activeBboxIndex - 1);
            }
            else if ((event.ctrlKey || event.metaKey) && event.key === 'ArrowDown') {
                props.onSelectBbox((activeBboxIndex === -1 || ___default["default"].isNil(activeBboxIndex)) ? 0 :
                    (activeBboxIndex + 1 === bboxes.length) ? activeBboxIndex : activeBboxIndex + 1);
            }
            else if (event.key === 'ArrowLeft' && (props.page - 1 > 0)) {
                (_a = props.onPageChange) === null || _a === void 0 ? void 0 : _a.call(props, props.page - 1);
            }
            else if (event.key === 'ArrowRight' && props.page !== maxPage) {
                (_b = props.onPageChange) === null || _b === void 0 ? void 0 : _b.call(props, props.page + 1);
            }
        }
        document.addEventListener('keydown', handlekeydownEvent);
        return () => {
            document.removeEventListener('keydown', handlekeydownEvent);
        };
    }, [activeBboxIndex, props.page, maxPage]);
    return (React__default["default"].createElement(reactPdf.Document, { className: "pdf-document", file: props.file, onLoadSuccess: onDocumentLoadSuccess, onLoadError: props.onLoadError, externalLinkTarget: props.externalLinkTarget, error: props.error, loading: props.loading, noData: props.noData, onItemClick: props.onItemClick, rotate: props.rotate }, React.useMemo(() => loaded ? shownPages.map((page) => React__default["default"].createElement(PdfPage$1, { defaultHeight: defaultHeight, defaultWidth: defaultWidth, key: page, page: page, pageError: props.pageError, inputRef: props.inputRef, height: props.height, width: props.width, pageLoading: props.pageLoading, renderAnnotationLayer: props.renderAnnotationLayer, renderInteractiveForms: props.renderInteractiveForms, renderTextLayer: props.renderTextLayer, scale: props.scale, onPageLoadError: props.onPageLoadError, onPageLoadSuccess: onPageLoadSuccess, onPageRenderError: props.onPageRenderError, onPageRenderSuccess: (ref) => {
            var _a;
            renderedPages.current.set(page, ref);
            (_a = props.onPageRenderSuccess) === null || _a === void 0 ? void 0 : _a.call(props);
        }, onGetAnnotationsSuccess: props.onGetAnnotationsSuccess, onGetAnnotationsError: props.onGetAnnotationsError, onGetTextSuccess: props.onGetTextSuccess, onGetTextError: props.onGetTextError, onPageInViewport: onPageInViewport, bboxList: bboxMap[page], treeElementsBboxes: treeElementsBboxes[page], treeBboxSelectionMode: props.treeBboxSelectionMode, groupId: activeBbox === null || activeBbox === void 0 ? void 0 : activeBbox.groupId, activeBboxIndex: props.activeBboxIndex, activeBboxId: props.activeBboxId, isTreeBboxesVisible: props.isTreeBboxesVisible, onBboxClick: onBboxClick, colorScheme: props.colorScheme, isPageSelected: selectedPage === page, onWarning: props.onWarning })) : null, [loaded, shownPages, defaultHeight, defaultWidth, bboxMap, treeElementsBboxes, props, selectedPage])));
};
var PdfDocument$1 = React.memo(PdfDocument);

___$insertStyle(".pdf-viewer {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  position: relative;\n  flex-direction: column;\n  justify-content: flex-start;\n  overflow: auto;\n  outline: none;\n}\n.pdf-viewer .annotationLayer section {\n  pointer-events: none;\n}");

const App = (props) => {
    const { className = '', bboxes = [], renderBbox } = props, pdfProps = __rest(props, ["className", "bboxes", "renderBbox"]);
    const onViewerClick = React.useCallback((e) => {
        var _a;
        e.stopPropagation();
        (_a = props.onBboxClick) === null || _a === void 0 ? void 0 : _a.call(props, null);
    }, [props.onBboxClick]);
    return (React__default["default"].createElement(ViewerProvider, { renderBbox: renderBbox },
        React__default["default"].createElement("div", { className: `pdf-viewer ${className}`, role: "button", tabIndex: 0, onClick: onViewerClick },
            React__default["default"].createElement(PdfDocument$1, Object.assign({}, pdfProps, { bboxes: bboxes })))));
};

exports["default"] = App;
exports.scrollToActiveBbox = scrollToActiveBbox;
//# sourceMappingURL=index.js.map
