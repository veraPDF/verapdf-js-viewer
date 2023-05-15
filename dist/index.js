

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
var reactPdf = require('react-pdf');
require('react-pdf/dist/esm/Page/AnnotationLayer.css');
var reactUse = require('react-use');
var _ = require('lodash');
var useIntersection = require('use-intersection');
var styled = require('styled-components');
var pdfjsWorker = require('pdfjs-dist/build/pdf.worker.entry');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var ___default = /*#__PURE__*/_interopDefaultLegacy(_);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var pdfjsWorker__default = /*#__PURE__*/_interopDefaultLegacy(pdfjsWorker);

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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

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

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

___$insertStyle(".pdf-bbox {\n  position: absolute;\n  border: 2px solid grey;\n  box-sizing: border-box;\n  cursor: pointer;\n  z-index: 2;\n}\n.pdf-bbox:hover {\n  border-color: orangered;\n}\n.pdf-bbox_selected {\n  pointer-events: none;\n  z-index: 100;\n  background: rgba(255, 69, 0, 0.5);\n}\n.pdf-bbox_related {\n  z-index: 99;\n}");

var bboxBg = 'rgba(255, 255, 255, 0)';
var bboxBorder = 'grey';
var bboxBorderHover$1 = 'orangered';
var bboxRelatedBorder = 'rgba(255,176,0,0.5)';
var bboxBgSelected = 'rgba(255, 69, 0, 0.5)';
var bboxRelatedBackground = 'rgba(255,176,0,0.3)';
var BboxDiv = styled__default["default"].div.withConfig({ displayName: "BboxDiv", componentId: "-1cbm183" })(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  left: ", ";\n  bottom: ", ";\n  height: ", ";\n  width: ", ";\n  top: ", ";\n  border-color: ", ";\n  background-color: ", ";\n  &:hover {\n    border-color: ", ";\n    background-color: ", ";\n  }\n  &.pdf-bbox_selected {\n    border-color: ", ";\n    background-color: ", ";\n  }\n  &.pdf-bbox_related {\n    border-color: ", ";\n    background-color: ", ";\n  }\n"], ["\n  left: ", ";\n  bottom: ", ";\n  height: ", ";\n  width: ", ";\n  top: ", ";\n  border-color: ", ";\n  background-color: ", ";\n  &:hover {\n    border-color: ", ";\n    background-color: ", ";\n  }\n  &.pdf-bbox_selected {\n    border-color: ", ";\n    background-color: ", ";\n  }\n  &.pdf-bbox_related {\n    border-color: ", ";\n    background-color: ", ";\n  }\n"])), function (props) { return props.left; }, function (props) { return props.bottom; }, function (props) { return props.height; }, function (props) { return props.width; }, function (props) { return props.top; }, function (props) { return props.colorScheme && props.colorScheme.border || bboxBorder; }, function (props) { return props.colorScheme && props.colorScheme.background || bboxBg; }, function (props) { return props.colorScheme && props.colorScheme.borderHovered || bboxBorderHover$1; }, function (props) { return props.colorScheme && props.colorScheme.backgroundHovered || bboxBg; }, function (props) { return props.colorScheme && props.colorScheme.borderSelected || bboxBorderHover$1; }, function (props) { return props.colorScheme && props.colorScheme.backgroundSelected || bboxBgSelected; }, function (props) { return props.colorScheme && props.colorScheme.borderRelated || bboxRelatedBorder; }, function (props) { return props.colorScheme && props.colorScheme.backgroundRelated || bboxRelatedBackground; });
var Bbox = function (props) {
    var _a = React.useMemo(function () {
        return [
            (parseFloat(props.bbox.location[0]) * props.scale) + 'px',
            (props.bbox.location[3] === 'bottom'
                ? '0'
                : (parseFloat(props.bbox.location[1]) * props.scale) + 'px'),
            (parseFloat(props.bbox.location[2]) * props.scale) + 'px',
            (props.bbox.location[3] === 'top'
                ? 'auto'
                : (parseFloat(props.bbox.location[3]) * props.scale) + 'px'),
            props.bbox.location[3] === 'top'
                ? '0' : props.bbox.location[3] === 'bottom'
                ? "calc(100% - ".concat(parseFloat(props.bbox.location[1]) * props.scale, "px)")
                : 'auto',
        ];
    }, [props.bbox.location, props.scale]), left = _a[0], bottom = _a[1], width = _a[2], height = _a[3], top = _a[4];
    return React__default["default"].createElement(BboxDiv, { className: "pdf-bbox ".concat(props.selected && 'pdf-bbox_selected', " ").concat(props.related && 'pdf-bbox_related'), left: left, bottom: bottom, width: width, height: height, top: top, colorScheme: props.colorScheme || {}, onClick: props.onClick });
};
var Bbox$1 = React.memo(Bbox);
var templateObject_1$1;

var ViewerContext = React.createContext({});
var ViewerProvider = function (props) {
    var _a = React.useState(1), page = _a[0], setPage = _a[1];
    var _b = React.useState(0), scrollIntoPage = _b[0], setScrollIntoPage = _b[1];
    var _c = React.useState(0), maxPage = _c[0], setMaxPage = _c[1];
    var context = {
        page: page,
        setPage: setPage,
        maxPage: maxPage,
        setMaxPage: setMaxPage,
        scrollIntoPage: scrollIntoPage,
        setScrollIntoPage: setScrollIntoPage,
    };
    return React__default["default"].createElement(ViewerContext.Provider, { value: context }, props.children);
};

var buildBboxMap = function (bboxes, structure) {
    var bboxMap = {};
    bboxes.forEach(function (bbox, index) {
        try {
            if (bbox.location.includes('contentStream') && bbox.location.includes('operators')) {
                var bboxPosition = calculateLocationInStreamOperator(bbox.location);
                if (!bboxPosition) {
                    return;
                }
                bboxMap[bboxPosition.pageIndex + 1] = __spreadArray(__spreadArray([], (bboxMap[bboxPosition.pageIndex + 1] || []), true), [
                    {
                        index: index,
                        operatorIndex: bboxPosition.operatorIndex,
                        glyphIndex: bboxPosition.glyphIndex,
                    }
                ], false);
            }
            else if (bbox.location.includes('StructTreeRoot') || bbox.location.includes('root/doc') || bbox.location === 'root') {
                var mcidData = getTagsFromErrorPlace(bbox.location, structure);
                mcidData.forEach(function (_a) {
                    var mcidList = _a[0], pageIndex = _a[1], contentItemPath = _a[2];
                    bboxMap[pageIndex + 1] = __spreadArray(__spreadArray([], (bboxMap[pageIndex + 1] || []), true), [
                        {
                            index: index,
                            mcidList: mcidList,
                            contentItemPath: contentItemPath,
                            groupId: bbox.groupId || undefined,
                        },
                    ], false);
                });
            }
            else {
                var bboxesFromLocation = bbox.location.includes('pages[') ? calculateLocation(bbox.location) : calculateLocationJSON(bbox.location);
                bboxesFromLocation.forEach(function (bboxWithLocation) {
                    bboxMap[bboxWithLocation.page] = __spreadArray(__spreadArray([], (bboxMap[bboxWithLocation.page] || []), true), [
                        {
                            index: index,
                            location: bboxWithLocation.location,
                            groupId: bbox.groupId || undefined,
                        },
                    ], false);
                });
            }
        }
        catch (e) {
            console.error("Location not supported: ".concat(bbox.location));
        }
    });
    return bboxMap;
};
var calculateLocationInStreamOperator = function (location) {
    var path = location.split("/");
    var pageIndex = -1;
    var operatorIndex = -1;
    var glyphIndex = -1;
    path.forEach(function (step) {
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
        pageIndex: pageIndex,
        operatorIndex: operatorIndex,
        glyphIndex: glyphIndex
    };
};
var getSelectedPageByLocation = function (bboxLocation) {
    var location = bboxLocation;
    var path = location.split('/');
    var pageNumber = -1;
    if ((location === null || location === void 0 ? void 0 : location.includes('pages')) && path[path.length - 1].startsWith('pages')) {
        location.split('/').forEach(function (nodeString) {
            if (nodeString.includes('pages')) {
                pageNumber = parseInt(nodeString.split(/[[\]]/)[1], 10) + 1;
            }
        });
    }
    return pageNumber;
};
var getBboxPages = function (bboxes, structure) {
    return bboxes.map(function (bbox) {
        try {
            if (bbox.location.includes('StructTreeRoot') || bbox.location.includes('root/doc') || bbox.location === 'root') {
                var mcidData = getTagsFromErrorPlace(bbox.location, structure);
                var pageIndex = mcidData[0][1];
                return pageIndex + 1;
            }
            else {
                var bboxesFromLocation = bbox.location.includes('pages[') ? calculateLocation(bbox.location) : calculateLocationJSON(bbox.location);
                return bboxesFromLocation.length ? bboxesFromLocation[0].page : 0;
            }
        }
        catch (e) {
            console.error("Location not supported: ".concat(bbox.location));
        }
    });
};
var checkIsBboxOutOfThePage = function (bbox, scale, page) {
    var parent = document.querySelector('.react-pdf__Page[data-page-number="' + page + '"]');
    var parentHeight = parent.offsetHeight;
    var parentWidth = parent.offsetWidth;
    var left = parseFloat(bbox.location[0]) * scale;
    var top = parseFloat(bbox.location[1]) * scale;
    var width = parseFloat(bbox.location[2]) * scale;
    var height = parseFloat(bbox.location[3]) * scale;
    return (top <= 0 && (top + height) <= 1 ||
        left <= 0 && (left + width) <= 1 ||
        parentHeight - top <= 1 && (top + height) >= parentHeight ||
        parentWidth - left <= 1 && (left + width) >= parentWidth);
};
var calculateLocation = function (location) {
    var bboxes = [];
    var _a = location.split('/'), pages = _a[0], boundingBox = _a[1];
    var _b = pages.replace('pages[', '').replace(']', '').split('-'), start = _b[0], end = _b[1];
    var _c = boundingBox.replace('boundingBox[', '').replace(']', '').split(','), x = _c[0], y = _c[1], x1 = _c[2], y1 = _c[3];
    var width = parseFloat(x1) - parseFloat(x);
    if (end) {
        for (var i = parseInt(start) + 1; i <= parseInt(end) + 1; i++) {
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
        var height = parseFloat(y1) - parseFloat(y);
        bboxes.push({
            page: parseInt(start) + 1,
            location: [parseFloat(x), parseFloat(y), width, height],
        });
    }
    return bboxes;
};
var calculateLocationJSON = function (location) {
    var bboxes = [];
    var bboxMap = JSON.parse(location);
    bboxMap.bbox.forEach(function (_a) {
        var p = _a.p, rect = _a.rect;
        var x = rect[0], y = rect[1], x1 = rect[2], y1 = rect[3];
        var width = parseFloat(x1) - parseFloat(x);
        var height = parseFloat(y1) - parseFloat(y);
        bboxes.push({
            page: parseFloat(p) + 1,
            location: [parseFloat(x), parseFloat(y), width, height],
        });
    });
    return bboxes;
};
var getTagsFromErrorPlace = function (context, structure) {
    var defaultValue = [[[], -1, undefined]];
    var selectedTag = convertContextToPath(context);
    if (___default["default"].isEmpty(selectedTag)) {
        return defaultValue;
    }
    if (selectedTag.hasOwnProperty('mcid') && selectedTag.hasOwnProperty('pageIndex')) {
        return [[[selectedTag.mcid], selectedTag.pageIndex]];
    }
    else if (selectedTag.hasOwnProperty('annot') && selectedTag.hasOwnProperty('pageIndex')) {
        return [[{ annot: selectedTag.annot }, selectedTag.pageIndex]];
    }
    else if (selectedTag.hasOwnProperty('contentItems')) {
        return [[undefined, selectedTag.pageIndex, __spreadArray([
                    selectedTag.contentStream,
                    selectedTag.content
                ], selectedTag.contentItems, true)]];
    }
    else if (selectedTag instanceof Array) {
        var objectOfErrors_1 = __assign({}, structure);
        selectedTag.forEach(function (node, index) {
            var nextStepObject;
            if (!objectOfErrors_1.children) {
                nextStepObject = objectOfErrors_1[node[0]];
            }
            else if (!(objectOfErrors_1.children instanceof Array)) {
                if (objectOfErrors_1.children.name === node[1]) {
                    nextStepObject = objectOfErrors_1.children;
                }
                else {
                    nextStepObject = objectOfErrors_1;
                }
            }
            else {
                if ((objectOfErrors_1 === null || objectOfErrors_1 === void 0 ? void 0 : objectOfErrors_1.name) === node[1] && index === 0) {
                    nextStepObject = objectOfErrors_1;
                }
                else {
                    var clearedChildrenArray = __spreadArray([], objectOfErrors_1.children, true).filter(function (tag) { return !(tag === null || tag === void 0 ? void 0 : tag.mcid); });
                    nextStepObject = __assign({}, (clearedChildrenArray.length ? clearedChildrenArray : objectOfErrors_1.children)[node[0]]);
                }
            }
            objectOfErrors_1 = __assign({}, nextStepObject);
        });
        return findAllMcid(objectOfErrors_1);
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
var convertContextToPath = function (errorContext) {
    if (errorContext === void 0) { errorContext = ''; }
    var arrayOfNodes = [];
    if (!errorContext) {
        return arrayOfNodes;
    }
    var contextString = errorContext;
    try {
        if (contextString.includes('contentItem') && !contextString.includes('mcid')) {
            var result = contextString.match(/pages\[(?<pages>\d+)\](\(.+\))?\/contentStream\[(?<contentStream>\d+)\](\(.+\))?\/content\[(?<content>\d+)\](?<contentItems>((\(.+\))?\/contentItem\[(\d+)\])+)/);
            if (result) {
                try {
                    var path = {};
                    path.pageIndex = parseInt(result.groups.pages, 10);
                    path.contentStream = parseInt(result.groups.contentStream, 10);
                    path.content = parseInt(result.groups.content, 10);
                    path.contentItems = result.groups.contentItems.split('/').filter(function (ci) { return ci.includes('contentItem'); }).map(function (ci) {
                        var _a;
                        var contentItemIndex = ci.match(/\[(?<contentItem>\d+)\]/);
                        return parseInt(((_a = contentItemIndex === null || contentItemIndex === void 0 ? void 0 : contentItemIndex.groups) === null || _a === void 0 ? void 0 : _a.contentItem) || '-1', 10);
                    });
                    return path;
                }
                catch (err) {
                    console.log('NoMCIDContentItemPathParseError:', err.message || err);
                }
            }
        }
        if (contextString.includes('contentItem')) {
            var path_1 = {};
            contextString.split('/').forEach(function (nodeString) {
                if (nodeString.includes('page')) {
                    path_1.pageIndex = parseInt(nodeString.split(/[[\]]/)[1], 10);
                }
                else if (nodeString.includes('contentItem') && nodeString.includes('mcid')) {
                    path_1.mcid = parseInt(nodeString.split('mcid:')[1].slice(0, -1), 10);
                }
            });
            return path_1;
        }
        else if (contextString.includes('annots')) {
            var path_2 = {};
            contextString.split('/').forEach(function (nodeString) {
                if (nodeString.includes('page')) {
                    path_2.pageIndex = parseInt(nodeString.split(/[[\]]/)[1], 10);
                }
                else if (nodeString.includes('annots')) {
                    path_2.annot = parseInt(nodeString.split(/[[\]]/)[1], 10);
                }
            });
            return path_2;
        }
        contextString = contextString.split('PDStructTreeRoot)/')[1].split('/'); // cut path before start of Document
        contextString.forEach(function (nodeString) {
            var nextIndex = parseInt(nodeString.split('](')[0].split('K[')[1], 10);
            var nextTag = nodeString
                .split('(')[1]
                .split(')')[0]
                .split(' ');
            nextTag = nextTag[nextTag.length - 1];
            arrayOfNodes = __spreadArray(__spreadArray([], arrayOfNodes, true), [[nextIndex, nextTag]], false);
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
    var mcidMap = {};
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
            __spreadArray([], obj.children, true).forEach(function (child) { return func(child); });
        }
    }
    func(tagObject);
    return ___default["default"].map(mcidMap, function (value, key) { return [value, ___default["default"].toNumber(key)]; });
}
var getBboxForGlyph = function (operatorIndex, glyphIndex, operationsList, viewport, rotateAngle) {
    var bbox = operationsList[operatorIndex] ? operationsList[operatorIndex][glyphIndex] : null;
    if (!bbox) {
        return [];
    }
    var coordsArray = rotateCoordinates(bbox, rotateAngle, viewport);
    var rotatedViewport = rotateViewport(rotateAngle, viewport);
    return [coordsArray[0] - rotatedViewport[0], coordsArray[1] - rotatedViewport[1], coordsArray[2], coordsArray[3]];
};
var parseMcidToBbox = function (listOfMcid, pageMap, annotations, viewport, rotateAngle) {
    var _a;
    var coords = {};
    if (listOfMcid instanceof Array) {
        listOfMcid.forEach(function (mcid) {
            var currentBbox = pageMap[mcid];
            if (!___default["default"].isNil(currentBbox) &&
                !___default["default"].isNaN(currentBbox.x) &&
                !___default["default"].isNaN(currentBbox.y) &&
                !___default["default"].isNaN(currentBbox.width) &&
                !___default["default"].isNaN(currentBbox.height)) {
                coords = concatBoundingBoxes(currentBbox, coords.x ? coords : undefined);
            }
        });
    }
    else if (listOfMcid.hasOwnProperty('annot')) {
        var rect = (_a = annotations[listOfMcid.annot]) === null || _a === void 0 ? void 0 : _a.rect;
        if (rect) {
            coords = {
                x: rect[0],
                y: rect[1],
                width: Math.abs(rect[0] - rect[2]),
                height: Math.abs(rect[1] - rect[3]),
            };
        }
    }
    if (!coords)
        return [];
    var coordsArray = rotateCoordinates([coords.x, coords.y, coords.width, coords.height], rotateAngle, viewport);
    var rotatedViewport = rotateViewport(rotateAngle, viewport);
    return [coordsArray[0] - rotatedViewport[0], coordsArray[1] - rotatedViewport[1], coordsArray[2], coordsArray[3]];
};
var rotateViewport = function (rotateAngle, viewport) {
    if ([0, 180].includes(rotateAngle)) {
        return viewport;
    }
    return [viewport[1], viewport[0], viewport[3], viewport[2]];
};
var rotateCoordinates = function (coords, rotateAngle, viewport) {
    if (rotateAngle === 0)
        return coords;
    var _a = rotatePoint(rotateAngle, [coords[0], coords[1]], viewport), x1 = _a[0], y1 = _a[1];
    var _b = rotatePoint(rotateAngle, [coords[0] + coords[2], coords[1] + coords[3]], viewport), x2 = _b[0], y2 = _b[1];
    return [Math.min(x1, x2), Math.min(y1, y2), Math.abs(x1 - x2), Math.abs(y1 - y2)];
};
var rotatePoint = function (rotateAngle, point, viewport) {
    var rad = (rotateAngle * Math.PI) / 180;
    var x = point[0] * Math.cos(rad) + point[1] * Math.sin(rad);
    var y = -point[0] * Math.sin(rad) + point[1] * Math.cos(rad);
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
var activeBboxInViewport = function () {
    var isInView = false;
    var bboxes = document.querySelectorAll('.pdf-bbox_selected');
    for (var index = 0; index < bboxes.length; index++) {
        isInView = elementInViewport(bboxes[index]);
        if (isInView) {
            break;
        }
    }
    return isInView;
};
var scrollToActiveBbox = function () {
    if (activeBboxInViewport()) {
        return;
    }
    var el = document.querySelector('.pdf-bbox_selected');
    if (!el)
        return;
    el.scrollIntoView();
    document.querySelector('.pdf-viewer').scrollTop -= 150;
    if (!activeBboxInViewport()) {
        el.scrollIntoView();
    }
};
function elementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;
    while (el.offsetParent && !el.offsetParent.className.includes('pdf-viewer')) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }
    var parent = document.querySelector('.pdf-viewer');
    var parentScrollTop = parent.scrollTop;
    var parentScrollLeft = parent.scrollLeft;
    return (top >= parentScrollTop &&
        left >= parentScrollLeft &&
        (top + height) <= (parentScrollTop + parent.offsetHeight) &&
        (left + width) <= (parentScrollLeft + parent.offsetWidth));
}
function concatBoundingBoxes(newBoundingBox, oldBoundingBox) {
    if (___default["default"].isNil(oldBoundingBox) && ___default["default"].isNil(newBoundingBox)) {
        return {};
    }
    if (___default["default"].isNil(newBoundingBox)) {
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

var WARNING_CODES = {
    BBOX_OUT_OF_THE_PAGE_VIEWPORT: 'BBOX_OUT_OF_THE_PAGE_VIEWPORT',
};

___$insertStyle(".pdf-page {\n  position: relative;\n  background: #fff;\n  margin-top: 8px;\n  overflow: hidden;\n  -moz-box-shadow: 0 0 4px 2px #cccccc;\n  -webkit-box-shadow: 0 0 4px 2px #cccccc;\n  box-shadow: 0 0 4px 2px #cccccc;\n}\n.pdf-page_selected {\n  outline: orangered solid 2px;\n}");

var bboxBorderHover = 'orangered';
var StyledPdfPage = styled__default["default"].div.withConfig({ displayName: "StyledPdfPage", componentId: "-1k5h6ed" })(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  min-height: ", ";\n  min-width: ", ";\n  &.pdf-page_selected {\n    outline-color: ", ";\n  }\n"], ["\n  min-height: ", ";\n  min-width: ", ";\n  &.pdf-page_selected {\n    outline-color: ", ";\n  }\n"])), function (props) { return props.height ? props.height * props.scale + 'px' : 'auto'; }, function (props) { return props.width ? props.width * props.scale + 'px' : 'auto'; }, function (props) { return props.colorScheme && props.colorScheme.borderSelected || bboxBorderHover; });
var PdfPage = function (props) {
    var scrollIntoPage = React.useContext(ViewerContext).scrollIntoPage;
    var _a = props.bboxList, bboxList = _a === void 0 ? [] : _a, _b = props.scale, scale = _b === void 0 ? 1 : _b;
    var intersectionRef = React.useRef(null);
    var _c = React.useState([]), bboxes = _c[0], setBboxes = _c[1];
    var _d = React.useState(false), loaded = _d[0], setLoaded = _d[1];
    var _e = React.useState(scale), pageScale = _e[0], setPageScale = _e[1];
    var _f = React.useState([]), pageViewport = _f[0], setPageViewport = _f[1];
    var _g = React.useState(false), isRendered = _g[0], setIsRendered = _g[1];
    var _h = React.useState(false), isIntersecting = _h[0], setIsIntersecting = _h[1];
    var _j = React.useState(0), intersectionRatio = _j[0], setIntersectionRatio = _j[1];
    useIntersection.useIntersection(intersectionRef, {
        threshold: [.2, .4, .5, .6, .8, 1],
    }, function (entry) {
        if (isIntersecting !== entry.isIntersecting) {
            setIsIntersecting(entry.isIntersecting);
        }
        if (intersectionRatio !== entry.intersectionRatio) {
            setIntersectionRatio(entry.intersectionRatio);
        }
    });
    var onPageClick = React.useCallback(function () {
        var _a;
        (_a = props.onBboxClick) === null || _a === void 0 ? void 0 : _a.call(props, null);
    }, []);
    var onBboxClick = React.useCallback(function (index) { return function (e) {
        var _a;
        e.stopPropagation();
        (_a = props.onBboxClick) === null || _a === void 0 ? void 0 : _a.call(props, { index: index });
    }; }, [props.onBboxClick]);
    var onPageRenderSuccess = React.useCallback(function () {
        var _a, _b;
        setIsRendered(true);
        (_a = props.onPageRenderSuccess) === null || _a === void 0 ? void 0 : _a.call(props);
        (_b = document.querySelectorAll('.pdf-page_rendered img')) === null || _b === void 0 ? void 0 : _b.forEach(function (img) {
            if (img.alt.includes('Annotation')) {
                var index = img.src.lastIndexOf('/') + 1;
                var name_1 = img.src.substr(index);
                img.src = require("pdfjs-dist/web/images/".concat(name_1)) || img.src;
            }
        });
    }, []);
    var onPageLoadSuccess = React.useCallback(function (page) {
        var _a;
        setIsRendered(true);
        setPageViewport(page.view);
        Promise.all([page.getOperatorList(), page.getAnnotations()]).then(function (_a) {
            var operatorList = _a[0], annotations = _a[1];
            var operationData = operatorList.argsArray[operatorList.argsArray.length - 2];
            var _b = operatorList.argsArray[operatorList.argsArray.length - 1], positionData = _b[0], noMCIDData = _b[1];
            var bboxes = bboxList.map(function (bbox) {
                if (bbox.mcidList) {
                    bbox.location = parseMcidToBbox(bbox.mcidList, positionData, annotations, page.view, page.rotate);
                }
                else if (bbox.contentItemPath) {
                    var contentItemsPath_1 = bbox.contentItemPath.slice(2);
                    var contentItemsBBoxes_1 = noMCIDData[bbox.contentItemPath[1]];
                    try {
                        contentItemsPath_1.forEach(function (ci, i) {
                            if (contentItemsPath_1.length > i + 1 || !contentItemsBBoxes_1.final) {
                                contentItemsBBoxes_1 = contentItemsBBoxes_1.contentItems[0];
                            }
                            contentItemsBBoxes_1 = contentItemsBBoxes_1.contentItems[ci];
                        });
                        bbox.location = [
                            contentItemsBBoxes_1.contentItem.x,
                            contentItemsBBoxes_1.contentItem.y,
                            contentItemsBBoxes_1.contentItem.w,
                            contentItemsBBoxes_1.contentItem.h
                        ];
                    }
                    catch (err) {
                        console.log('NoMCIDDataParseError:', err.message || err);
                        bbox.location = [0, 0, 0, 0];
                    }
                }
                if (___default["default"].isNumber(bbox.operatorIndex) && ___default["default"].isNumber(bbox.glyphIndex)) {
                    bbox.location = getBboxForGlyph(bbox.operatorIndex, bbox.glyphIndex, operationData, page.view, page.rotate);
                }
                return bbox;
            });
            setBboxes(bboxes);
        });
        (_a = props.onPageLoadSuccess) === null || _a === void 0 ? void 0 : _a.call(props, page);
    }, [bboxList, props.width, props.height, scale]);
    React.useEffect(function () {
        var _a;
        if (!loaded && isIntersecting) {
            setLoaded(true);
        }
        (_a = props.onPageInViewport) === null || _a === void 0 ? void 0 : _a.call(props, props.page, { isIntersecting: isIntersecting, intersectionRatio: intersectionRatio });
    }, [isIntersecting, intersectionRatio, loaded]);
    React.useEffect(function () {
        var _a;
        if (scrollIntoPage === props.page) {
            (_a = intersectionRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView();
        }
    }, [scrollIntoPage]);
    React.useEffect(function () {
        var width = pageViewport[2] - pageViewport[0];
        var height = pageViewport[3] - pageViewport[1];
        if (props.width && width) {
            return setPageScale((props.width / width) * scale);
        }
        else if (props.height && height) {
            return setPageScale((props.height / height) * scale);
        }
        setPageScale(scale);
    }, [pageViewport, scale, props.width, props.height]);
    var isBboxSelected = React.useCallback(function (bbox) { return props.activeBboxIndex === bbox.index; }, [props.activeBboxIndex]);
    var isRelated = React.useCallback(function (bbox) {
        var _a, _b;
        var _c = ((_a = props === null || props === void 0 ? void 0 : props.groupId) === null || _a === void 0 ? void 0 : _a.split('-')) || [], activeId = _c[2];
        var _d = ((_b = bbox === null || bbox === void 0 ? void 0 : bbox.groupId) === null || _b === void 0 ? void 0 : _b.split('-')) || [], bboxId = _d[2];
        return props.groupId ? activeId === bboxId && !isBboxSelected(bbox) : false;
    }, [props.groupId, isBboxSelected]);
    var activeBboxes = React.useMemo(function () { return bboxes.filter(function (bbox) { return bbox.index === props.activeBboxIndex; }); }, [bboxes, props.activeBboxIndex]);
    React.useEffect(React.useCallback(function () {
        var _a;
        if (activeBboxes && activeBboxes.length && activeBboxes.every(function (activeBbox) { return checkIsBboxOutOfThePage(activeBbox, scale, props.page); })) {
            (_a = props.onWarning) === null || _a === void 0 ? void 0 : _a.call(props, WARNING_CODES.BBOX_OUT_OF_THE_PAGE_VIEWPORT);
        }
    }, [activeBboxes, scale, props.page]), [activeBboxes]);
    return (React__default["default"].createElement(StyledPdfPage, { className: "pdf-page pdf-page_rendered ".concat(props.isPageSelected && 'pdf-page_selected'), "data-page": props.page, onClick: onPageClick, height: !isRendered ? props.height || props.defaultHeight : undefined, width: !isRendered ? props.width || props.defaultWidth : undefined, scale: pageScale, ref: intersectionRef, colorScheme: props.colorScheme || {} }, loaded ? React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(reactPdf.Page, { pageNumber: props.page, error: props.pageError, height: props.height, width: props.width, loading: props.pageLoading, inputRef: props.inputRef, renderAnnotationLayer: props.renderAnnotationLayer, renderInteractiveForms: props.renderInteractiveForms, renderTextLayer: props.renderTextLayer, scale: props.scale, onLoadError: props.onPageLoadError, onLoadSuccess: onPageLoadSuccess, onRenderError: props.onPageRenderError, onRenderSuccess: onPageRenderSuccess, onGetAnnotationsSuccess: props.onGetAnnotationsSuccess, onGetAnnotationsError: props.onGetAnnotationsError, onGetTextSuccess: props.onGetTextSuccess, onGetTextError: props.onGetTextError }),
        isRendered ? bboxes.map(function (bbox, index) { return (React__default["default"].createElement(Bbox$1, { key: index, bbox: bbox, onClick: onBboxClick(bbox.index), selected: isBboxSelected(bbox), related: isRelated(bbox), scale: pageScale, colorScheme: props.colorScheme })); }) : null) : null));
};
var PdfPage$1 = React.memo(PdfPage);
var templateObject_1;

___$insertStyle(".pdf-document {\n  display: flex;\n  flex-direction: column;\n  margin: auto;\n}");

var PdfDocument = function (props) {
    var _a = React.useContext(ViewerContext), page = _a.page, setPage = _a.setPage, maxPage = _a.maxPage, setMaxPage = _a.setMaxPage, scrollIntoPage = _a.scrollIntoPage, setScrollIntoPage = _a.setScrollIntoPage;
    var _b = props.bboxes, bboxes = _b === void 0 ? [] : _b;
    var _c = React.useState(false), loaded = _c[0], setLoaded = _c[1];
    var _d = React.useState({}), structureTree = _d[0], setStructureTree = _d[1];
    var _e = React.useState({}), bboxMap = _e[0], setBboxMap = _e[1];
    var _f = React.useState([]), pagesByViewport = _f[0], setPagesByViewport = _f[1];
    var _g = React.useState([]), ratioArray = _g[0], setRatioArray = _g[1];
    var _h = React.useState(0), defaultHeight = _h[0], setDefaultHeight = _h[1];
    var _j = React.useState(0), defaultWidth = _j[0], setDefaultWidth = _j[1];
    var _k = React.useState(undefined), selectedPage = _k[0], setSelectedPage = _k[1];
    var activeBbox = React.useMemo(function () {
        return props.activeBboxIndex !== undefined ? bboxes[props.activeBboxIndex] : null;
    }, [props.activeBboxIndex, bboxes]);
    var shownPages = React.useMemo(function () {
        if (props.showAllPages) {
            return Array.from(new Array(maxPage), function (_el, index) { return index + 1; });
        }
        return [props.page || 1];
    }, [maxPage, props.showAllPages, props.page]);
    React.useEffect(function () {
        var _a;
        setBboxMap(buildBboxMap(bboxes, structureTree));
        (_a = props.onBboxesParsed) === null || _a === void 0 ? void 0 : _a.call(props, getBboxPages(bboxes, structureTree));
    }, [bboxes, structureTree]);
    React.useEffect(function () {
        var _a;
        if (((_a = props.activeBboxIndex) !== null && _a !== void 0 ? _a : false) === false) {
            return;
        }
        var bboxPage = 0;
        for (var _i = 0, _b = Object.entries(bboxMap); _i < _b.length; _i++) {
            var _c = _b[_i], key = _c[0], value = _c[1];
            if (___default["default"].find(value, { index: props.activeBboxIndex })) {
                bboxPage = parseInt(key);
                break;
            }
        }
        if (bboxPage > 0 && !activeBboxInViewport()) {
            setScrollIntoPage(bboxPage);
            // To be sure that page is loaded before scrolling to the active bbox
            setTimeout(function () { return scrollToActiveBbox(); }, 100);
        }
    }, [props.activeBboxIndex, bboxMap]);
    React.useEffect(function () {
        if (activeBbox) {
            var selectedPage_1 = getSelectedPageByLocation(activeBbox.location);
            if (selectedPage_1 > -1) {
                setPage(selectedPage_1);
            }
            setSelectedPage(selectedPage_1);
        }
        else {
            setSelectedPage(undefined);
        }
    }, [activeBbox]);
    var onDocumentLoadSuccess = React.useCallback(function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var pageData;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setStructureTree(data._pdfInfo.structureTree);
                    return [4 /*yield*/, data.getPage(1)];
                case 1:
                    pageData = _b.sent();
                    setDefaultHeight(pageData.view[3]);
                    setDefaultWidth(pageData.view[2]);
                    setMaxPage(data.numPages);
                    setLoaded(true);
                    (_a = props.onLoadSuccess) === null || _a === void 0 ? void 0 : _a.call(props, data);
                    return [2 /*return*/];
            }
        });
    }); }, [props.onLoadSuccess, bboxes]);
    var onPageLoadSuccess = React.useCallback(function (data) {
        var _a;
        (_a = props.onPageLoadSuccess) === null || _a === void 0 ? void 0 : _a.call(props, data);
    }, [props.onPageLoadSuccess]);
    var onPageInViewport = React.useCallback(function (page, intersection) {
        if (props.showAllPages) {
            setPageByViewport(page, intersection);
        }
        else {
            setPage(page);
        }
    }, [maxPage, props.showAllPages]);
    var onBboxClick = React.useCallback(function (data) {
        var _a;
        (_a = props.onBboxClick) === null || _a === void 0 ? void 0 : _a.call(props, data);
    }, []);
    var setPageByViewport = React.useMemo(function () { return function (newPage, intersection) {
        var isIntersecting = intersection.isIntersecting, intersectionRatio = intersection.intersectionRatio;
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
                var prevPageIndex = pagesByViewport.indexOf(newPage);
                pagesByViewport.splice(prevPageIndex, 1);
                setPagesByViewport(pagesByViewport);
                ratioArray.splice(prevPageIndex, 1);
                setRatioArray(ratioArray);
            }
        }
        var newPageIndex = -1;
        pagesByViewport.forEach(function (_pageFromViewport, index) {
            if (newPageIndex === -1) {
                newPageIndex = index;
            }
            if (ratioArray[newPageIndex] < ratioArray[index]) {
                newPageIndex = index;
            }
        });
        if (newPageIndex !== -1 && pagesByViewport[newPageIndex]) {
            setPage(pagesByViewport[newPageIndex]);
            if (scrollIntoPage) {
                setScrollIntoPage(0);
            }
        }
    }; }, [pagesByViewport, page, ratioArray, scrollIntoPage]);
    reactUse.useDebounce(function () {
        var _a;
        if (props.page !== page)
            (_a = props.onPageChange) === null || _a === void 0 ? void 0 : _a.call(props, page);
    }, 30, [page]);
    React.useEffect(function () {
        if (page !== props.page) {
            setPage(props.page || 1);
            if (props.showAllPages) {
                setScrollIntoPage(props.page);
            }
        }
    }, [props.page, props.showAllPages]);
    React.useEffect(function () {
        setLoaded(false);
        setPagesByViewport([]);
        setRatioArray([]);
        setDefaultHeight(0);
        setDefaultWidth(0);
        setMaxPage(0);
        setPage(1);
    }, [props.file]);
    return (React__default["default"].createElement(reactPdf.Document, { className: "pdf-document", file: props.file, onLoadSuccess: onDocumentLoadSuccess, onLoadError: props.onLoadError, externalLinkTarget: props.externalLinkTarget, error: props.error, loading: props.loading, noData: props.noData, onItemClick: props.onItemClick, rotate: props.rotate, options: {
            workerSrc: pdfjsWorker__default["default"],
        } }, React.useMemo(function () { return loaded ? shownPages.map(function (page) {
        var _a;
        return React__default["default"].createElement(PdfPage$1, { defaultHeight: defaultHeight, defaultWidth: defaultWidth, key: page, page: page, pageError: props.pageError, inputRef: props.inputRef, height: props.height, width: props.width, pageLoading: props.pageLoading, renderAnnotationLayer: props.renderAnnotationLayer, renderInteractiveForms: props.renderInteractiveForms, renderTextLayer: props.renderTextLayer, scale: props.scale, onPageLoadError: props.onPageLoadError, onPageLoadSuccess: onPageLoadSuccess, onPageRenderError: props.onPageRenderError, onPageRenderSuccess: props.onPageRenderSuccess, onGetAnnotationsSuccess: props.onGetAnnotationsSuccess, onGetAnnotationsError: props.onGetAnnotationsError, onGetTextSuccess: props.onGetTextSuccess, onGetTextError: props.onGetTextError, onPageInViewport: onPageInViewport, bboxList: bboxMap[page], groupId: (_a = bboxes[props.activeBboxIndex]) === null || _a === void 0 ? void 0 : _a.groupId, activeBboxIndex: props.activeBboxIndex, onBboxClick: onBboxClick, colorScheme: props.colorScheme, isPageSelected: selectedPage === page, onWarning: props.onWarning });
    }) : null; }, [loaded, shownPages, defaultHeight, defaultWidth, bboxMap, props, selectedPage])));
};
var PdfDocument$1 = React.memo(PdfDocument);

___$insertStyle(".pdf-viewer {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  position: relative;\n  flex-direction: column;\n  justify-content: flex-start;\n  overflow: auto;\n}");

var App = function (props) {
    var _a = props.className, className = _a === void 0 ? '' : _a, _b = props.bboxes, bboxes = _b === void 0 ? [] : _b, pdfProps = __rest(props, ["className", "bboxes"]);
    return (React__default["default"].createElement(ViewerProvider, null,
        React__default["default"].createElement("div", { className: "pdf-viewer ".concat(className) },
            React__default["default"].createElement(PdfDocument$1, __assign({}, pdfProps, { bboxes: bboxes })))));
};

exports["default"] = App;
//# sourceMappingURL=index.js.map
