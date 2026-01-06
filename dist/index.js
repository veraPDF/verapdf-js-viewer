

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
require('react-pdf/dist/esm/Page/TextLayer.css');
var reactUse = require('react-use');
var _ = require('lodash');
var useIntersection = require('use-intersection');
var styled = require('styled-components');
var pdfWorkerURL = require('pdfjs-dist/build/pdf.worker?url');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var TreeBboxSelectionMode;
(function (TreeBboxSelectionMode) {
    TreeBboxSelectionMode["SELECTED"] = "SELECTED";
    TreeBboxSelectionMode["SELECTED_WITH_KIDS"] = "SELECTED_WITH_KIDS";
})(TreeBboxSelectionMode || (TreeBboxSelectionMode = {}));

var ViewerContext = React.createContext({});
var ViewerProvider = function (_a) {
    var renderBbox = _a.renderBbox, children = _a.children;
    var _b = React.useState(1), page = _b[0], setPage = _b[1];
    var _c = React.useState(0), maxPage = _c[0], setMaxPage = _c[1];
    var _d = React.useState({ page: 0 }), scrollInto = _d[0], setScrollInto = _d[1];
    var setScrollIntoPage = React.useCallback(function (page) { return setScrollInto({ page: page }); }, [setScrollInto]);
    var context = {
        page: page,
        setPage: setPage,
        maxPage: maxPage,
        setMaxPage: setMaxPage,
        scrollInto: scrollInto,
        setScrollIntoPage: setScrollIntoPage,
        renderBbox: renderBbox,
    };
    return React__default["default"].createElement(ViewerContext.Provider, { value: context }, children);
};

___$insertStyle(".pdf-bbox {\n  position: absolute;\n  border: 2px solid grey;\n  box-sizing: border-box;\n  cursor: pointer;\n  z-index: 3;\n}\n.pdf-bbox:hover {\n  border-color: orangered;\n}\n.pdf-bbox_selected {\n  z-index: 1000;\n  background: rgba(255, 69, 0, 0.5);\n}\n.pdf-bbox_structured_selected {\n  pointer-events: none;\n  z-index: 4;\n}\n.pdf-bbox_disabled {\n  display: none;\n}\n\nsection[data-annotation-id] {\n  z-index: 2 !important;\n}\nsection[data-annotation-id] * {\n  color: transparent !important;\n}");

var bboxBorder = 'grey';
var bboxRelatedBorder = 'rgba(255,176,0,0.5)';
var bboxStructuredBorder = 'rgba(255,255,255,0)';
var bboxSelectedStructuredBorder = 'rgba(255,122,0,1)';
var bboxBorderHover$1 = 'orangered';
var bboxStructuredBorderHover = 'rgba(255,122,0,1)';
var bboxBg = 'rgba(255,255,255,0)';
var bboxBgSelected = 'rgba(255,69,0,0.5)';
var bboxBgRelated = 'rgba(255,176,0,0.3)';
var bboxBgStructured = 'rgba(255,255,255,0)';
var bboxBgSelectedStructured = 'rgba(255,100,0,0.4)';
var BboxDiv = styled__default["default"].div.withConfig({ displayName: "BboxDiv", componentId: "-d59wxb" })(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  mix-blend-mode: multiply;\n  left: ", ";\n  bottom: ", ";\n  height: ", ";\n  width: ", ";\n  top: ", ";\n  border-color: ", ";\n  background-color: ", ";\n  &:hover {\n    border-color: ", ";\n    background-color: ", ";\n  }\n  &.pdf-bbox_selected {\n    border-color: ", ";\n    background-color: ", ";\n  }\n  &.pdf-bbox_related {\n    border-color: ", ";\n    background-color: ", ";\n  }\n  &.pdf-bbox_structured {\n    &:hover {\n      border-color: ", ";\n    }\n    border-color: ", ";\n    background-color: ", ";\n  }\n  &.pdf-bbox_structured_selected {\n    border-color: ", ";\n    background-color: ", ";\n  }\n  &.pdf-bbox_structured_selected_multiple {\n    background-color: ", ";\n  }\n"], ["\n  mix-blend-mode: multiply;\n  left: ", ";\n  bottom: ", ";\n  height: ", ";\n  width: ", ";\n  top: ", ";\n  border-color: ", ";\n  background-color: ", ";\n  &:hover {\n    border-color: ", ";\n    background-color: ", ";\n  }\n  &.pdf-bbox_selected {\n    border-color: ", ";\n    background-color: ", ";\n  }\n  &.pdf-bbox_related {\n    border-color: ", ";\n    background-color: ", ";\n  }\n  &.pdf-bbox_structured {\n    &:hover {\n      border-color: ", ";\n    }\n    border-color: ", ";\n    background-color: ", ";\n  }\n  &.pdf-bbox_structured_selected {\n    border-color: ", ";\n    background-color: ", ";\n  }\n  &.pdf-bbox_structured_selected_multiple {\n    background-color: ", ";\n  }\n"])), function (props) { return props.left; }, function (props) { return props.bottom; }, function (props) { return props.height; }, function (props) { return props.width; }, function (props) { return props.top; }, function (props) { return props.colorScheme && props.colorScheme.border || bboxBorder; }, function (props) { return props.colorScheme && props.colorScheme.background || bboxBg; }, function (props) { return props.colorScheme && props.colorScheme.borderHovered || bboxBorderHover$1; }, function (props) { return props.colorScheme && props.colorScheme.backgroundHovered || bboxBg; }, function (props) { return props.colorScheme && props.colorScheme.borderSelected || bboxBorderHover$1; }, function (props) { return props.colorScheme && props.colorScheme.backgroundSelected || bboxBgSelected; }, function (props) { return props.colorScheme && props.colorScheme.borderRelated || bboxRelatedBorder; }, function (props) { return props.colorScheme && props.colorScheme.backgroundRelated || bboxBgRelated; }, bboxStructuredBorderHover, function (props) { return props.colorScheme && props.colorScheme.borderStructured || bboxStructuredBorder; }, function (props) { return props.colorScheme && props.colorScheme.backgroundStructured || bboxBgStructured; }, function (props) { return props.colorScheme && props.colorScheme.borderSelectedStructured || bboxSelectedStructuredBorder; }, function (props) { return props.colorScheme && props.colorScheme.backgroundSelectedStructured || bboxBgSelectedStructured; }, function (props) { return props.colorScheme && props.colorScheme.background || bboxBg; });
var Bbox = function (props) {
    var bbox = props.bbox, disabled = props.disabled, selected = props.selected, related = props.related, structured = props.structured, scale = props.scale, colorScheme = props.colorScheme, selectionMode = props.selectionMode, onClick = props.onClick;
    var renderBbox = React.useContext(ViewerContext).renderBbox;
    var _a = React.useMemo(function () {
        return [
            (parseFloat(bbox.location[0]) * scale) + 'px',
            (bbox.location[3] === 'bottom'
                ? '0'
                : (parseFloat(bbox.location[1]) * scale) + 'px'),
            (parseFloat(bbox.location[2]) * scale) + 'px',
            (bbox.location[3] === 'top'
                ? 'auto'
                : (parseFloat(bbox.location[3]) * scale) + 'px'),
            bbox.location[3] === 'top'
                ? '0' : bbox.location[3] === 'bottom'
                ? "calc(100% - ".concat(parseFloat(bbox.location[1]) * scale, "px)")
                : 'auto',
        ];
    }, [bbox.location, scale]), left = _a[0], bottom = _a[1], width = _a[2], height = _a[3], top = _a[4];
    var isSelected = React.useMemo(function () { return selected ? ' pdf-bbox_selected' : ''; }, [selected]);
    var isRelated = React.useMemo(function () { return related ? ' pdf-bbox_related' : ''; }, [related]);
    var isDisabled = React.useMemo(function () { return disabled ? ' pdf-bbox_disabled' : ''; }, [disabled]);
    var isStructured = React.useMemo(function () { return structured ? ' pdf-bbox_structured' : ''; }, [structured]);
    var isStructuredSelected = React.useMemo(function () { return structured && selected ? ' pdf-bbox_structured_selected' : ''; }, [structured, selected]);
    var isStructuredSelectedMultiple = React.useMemo(function () {
        if (structured && selected && selectionMode === TreeBboxSelectionMode.SELECTED_WITH_KIDS)
            return ' pdf-bbox_structured_selected_multiple';
        else
            return '';
    }, [structured, selected, selectionMode]);
    if (renderBbox) {
        return renderBbox({
            left: left,
            width: width,
            height: height,
            top: top,
            colorScheme: colorScheme,
            disabled: disabled,
            related: related,
            selected: selected,
            scale: scale,
            selectionMode: selectionMode,
            structured: structured,
            onClick: onClick,
        });
    }
    return React__default["default"].createElement(BboxDiv, { className: "pdf-bbox".concat(isSelected).concat(isRelated).concat(isStructured).concat(isStructuredSelected).concat(isStructuredSelectedMultiple).concat(isDisabled), left: left, bottom: bottom, width: width, height: height, top: top, colorScheme: colorScheme || {}, title: bbox.bboxTitle, "aria-describedby": bbox.bboxTitle, onClick: onClick });
};
var Bbox$1 = React.memo(Bbox);
var templateObject_1$1;

var groupChildren = function (children) {
    var _a, _b, _c;
    if (___default["default"].isNil(children))
        children = [];
    var group = ___default["default"].groupBy(cleanArray(children), function (child) {
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
var getMultiBboxPagesObj = function (mcidList) {
    var mcidListPages = [];
    var multiBbox = {};
    mcidList.forEach(function (obj) {
        if (!___default["default"].isNil(obj))
            mcidListPages.push(obj.pageIndex);
    });
    var mcidListPagesDict = Array.from(new Set(mcidListPages));
    for (var _i = 0, mcidListPagesDict_1 = mcidListPagesDict; _i < mcidListPagesDict_1.length; _i++) {
        var value = mcidListPagesDict_1[_i];
        multiBbox[value + 1] = [];
    }
    mcidListPages.forEach(function (page, index) { return multiBbox[page + 1].push(mcidList[index]); });
    return multiBbox;
};
var extractMcidFromNode = function (children) {
    if (___default["default"].isNil(children))
        return [];
    var mcidList = [];
    if (!(children instanceof Array)) {
        children.hasOwnProperty('mcid') && mcidList.push(children);
    }
    else {
        mcidList.push.apply(mcidList, ___default["default"].filter(children, function (child) { return child === null || child === void 0 ? void 0 : child.hasOwnProperty('mcid'); }));
    }
    return mcidList;
};
var updateMcidList = function (oldMcidList, children) {
    if (___default["default"].isNil(oldMcidList))
        oldMcidList = [];
    if (___default["default"].isNil(children))
        children = [];
    return __spreadArray(__spreadArray([], oldMcidList, true), ___default["default"].flatMap(cleanArray(children), function (child) {
        if (child.hasOwnProperty('mcidList') && !___default["default"].isNil(child.mcidList)) {
            return child.mcidList;
        }
    }), true);
};
var cleanArray = function (arr) {
    if (___default["default"].isNil(arr))
        return [];
    return arr.filter(function (el) { return !___default["default"].isNil(el); });
};
var getFormattedAnnotations = function (annots) {
    var formattedAnnots = [];
    ___default["default"].forEach(annots, function (annot) {
        var _a;
        if (annot.hasOwnProperty('parentId')
            && annot.hasOwnProperty('parentRect')
            && annot.hasOwnProperty('parentType')
            && annot.parentType === 'Highlight') {
            formattedAnnots.push((_a = {},
                _a['id'] = annot.parentId,
                _a['rect'] = annot.parentRect,
                _a));
        }
        formattedAnnots.push(annot);
    });
    return formattedAnnots;
};
var annotIndexRegExp = /\/annots\[(?<annotIndex>\d+)\](\(.*\))?\//;
var buildBboxMap = function (bboxes, structure) {
    var bboxMap = {};
    bboxes.forEach(function (bbox, index) {
        var _a;
        try {
            if (___default["default"].isNil(bbox.location))
                return;
            var match = bbox.location.match(annotIndexRegExp);
            var annotIndex_1 = parseInt((_a = match === null || match === void 0 ? void 0 : match.groups) === null || _a === void 0 ? void 0 : _a.annotIndex, 10);
            if (bbox.location.includes('contentStream') && bbox.location.includes('operators')) {
                var bboxPosition = calculateLocationInStreamOperator(bbox.location);
                if (!bboxPosition) {
                    return;
                }
                bboxMap[bboxPosition.pageIndex + 1] = __spreadArray(__spreadArray([], (bboxMap[bboxPosition.pageIndex + 1] || []), true), [
                    {
                        index: index,
                        annotIndex: Number.isNaN(annotIndex_1) ? undefined : annotIndex_1,
                        isVisible: bbox.hasOwnProperty('isVisible') ? bbox.isVisible : true,
                        operatorIndex: bboxPosition.operatorIndex,
                        glyphIndex: bboxPosition.glyphIndex,
                        bboxTitle: bbox.bboxTitle,
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
                            annotIndex: Number.isNaN(annotIndex_1) ? undefined : annotIndex_1,
                            isVisible: bbox.hasOwnProperty('isVisible') ? bbox.isVisible : true,
                            mcidList: mcidList,
                            contentItemPath: contentItemPath,
                            groupId: bbox.groupId || undefined,
                            bboxTitle: bbox.bboxTitle,
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
                            annotIndex: Number.isNaN(annotIndex_1) ? undefined : annotIndex_1,
                            isVisible: bbox.hasOwnProperty('isVisible') ? bbox.isVisible : true,
                            location: bboxWithLocation.location,
                            groupId: bbox.groupId || undefined,
                            bboxTitle: bbox.bboxTitle,
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
var parseTree = function (tree) {
    if (tree instanceof Array && tree.length === 1) {
        return tree[0];
    }
    if (tree instanceof Array) {
        return { name: 'Document', children: tree };
    }
    return tree;
};
var structurizeTree = function (node) {
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
        var mcidListChildren_1 = [];
        var _a = groupChildren(node.children), nodeList = _a[0], mcidList = _a[1], annotList = _a[2];
        ___default["default"].forEach(node.children, function (child) {
            return mcidListChildren_1.push.apply(mcidListChildren_1, extractMcidFromNode(child));
        });
        node.mcidListChildren = mcidListChildren_1;
        node.children = ___default["default"].map(nodeList, function (child) { return structurizeTree(child); });
        node.mcidList = updateMcidList(mcidList, node.children);
        if (annotList.length) {
            node.annotList = annotList;
        }
    }
    node.children = cleanArray(node.children);
    return node;
};
var setTreeIds = function (node, annotMap, id) {
    if (annotMap === void 0) { annotMap = {}; }
    if (id === void 0) { id = '0'; }
    if (___default["default"].isNil(node))
        return [null, annotMap];
    node.id = id;
    if (node === null || node === void 0 ? void 0 : node.hasOwnProperty('annotList')) {
        node.annotList.forEach(function (annot) {
            var index = "".concat(annot.pageIndex, ":").concat(annot.annotIndex);
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
        node.children = [setTreeIds(node.children, annotMap, "".concat(id, ":0"))[0]];
    else
        node.children = ___default["default"].map(node.children, function (child, index) { return setTreeIds(child, annotMap, "".concat(id, ":").concat(index))[0]; });
    return [node, annotMap];
};
var getMcidList = function (node, mcidList) {
    if (mcidList === void 0) { mcidList = []; }
    if (___default["default"].isNil(node))
        return mcidList;
    if (!___default["default"].isNil(node.mcidList) && !___default["default"].isNil(node.id) && node.mcidList.length)
        mcidList.push([node.mcidList, node.id]);
    if (___default["default"].isNil(node.children))
        return mcidList;
    if (!(node.children instanceof Array))
        mcidList.push([node.children.mcidList, node.children.id]);
    else
        ___default["default"].map(node.children, function (child) { return (mcidList = getMcidList(child, mcidList)); });
    return mcidList;
};
var createBboxMap = function (mcidList) {
    var mcidListPages = [];
    var bboxMap = {};
    var getPages = function (list) {
        var cleanedList = list.filter(function (obj) { return !___default["default"].isNil(obj) && !___default["default"].isNil(obj.pageIndex); });
        return Array.from(new Set(cleanedList.map(function (obj) { return obj === null || obj === void 0 ? void 0 : obj.pageIndex; })));
    };
    mcidList.forEach(function (arr) {
        var list = arr[0];
        var pages = getPages(list);
        mcidListPages.push(pages.length === 1 ? pages[0] : pages);
    });
    var mcidListPagesDict = Array.from(new Set(mcidListPages.flat()));
    for (var _i = 0, mcidListPagesDict_2 = mcidListPagesDict; _i < mcidListPagesDict_2.length; _i++) {
        var value = mcidListPagesDict_2[_i];
        bboxMap[value + 1] = [];
    }
    mcidListPages.forEach(function (page, index) {
        if (!(page instanceof Array))
            bboxMap[page + 1].push(mcidList[index]);
        else {
            var _a = mcidList[index], mcid = _a[0], id_1 = _a[1];
            var multiBboxPagesObj_1 = getMultiBboxPagesObj(mcid);
            page.forEach(function (pageIndex) { return bboxMap[pageIndex + 1].push([multiBboxPagesObj_1[pageIndex + 1], id_1]); });
        }
    });
    return bboxMap;
};
var createAllBboxes = function (bboxesAll, pageMap, refMap, annotations, viewport, rotateAngle) {
    if (___default["default"].isNil(bboxesAll))
        return [];
    var unfilteredBboxes = bboxesAll === null || bboxesAll === void 0 ? void 0 : bboxesAll.map(function (bbox) {
        var _a = bbox, mcid = _a[0], id = _a[1];
        var listOfMcid = cleanArray(mcid).map(function (obj) { var _a; return (obj === null || obj === void 0 ? void 0 : obj.stm) ? { mcid: obj === null || obj === void 0 ? void 0 : obj.mcid, ref: (_a = obj === null || obj === void 0 ? void 0 : obj.stm) === null || _a === void 0 ? void 0 : _a.num } : obj === null || obj === void 0 ? void 0 : obj.mcid; });
        var location = parseMcidToBbox(listOfMcid, pageMap, refMap, annotations, viewport, rotateAngle);
        if (___default["default"].isEmpty(location)) {
            return null;
        }
        var width = location[2], height = location[3];
        return {
            id: id,
            location: location,
            area: width * height,
        };
    });
    return cleanArray(unfilteredBboxes).sort(function (_a, _b) {
        var area1 = _a.area;
        var area2 = _b.area;
        return (area1 < area2) ? 1 : (area1 > area2) ? -1 : 0;
    });
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
        glyphIndex: glyphIndex,
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
        var mcid = selectedTag.stm ? { mcid: selectedTag.mcid, ref: selectedTag.stm.num } : selectedTag.mcid;
        return [[[mcid], selectedTag.pageIndex]];
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
                    var clearedChildrenArray = __spreadArray([], objectOfErrors_1.children, true).filter(function (tag) {
                        return !(tag === null || tag === void 0 ? void 0 : tag.hasOwnProperty('mcid')) && !(tag === null || tag === void 0 ? void 0 : tag.hasOwnProperty('rect'));
                    });
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
        if (contextString.includes('contentItem')) {
            var result = contextString.match(/pages\[(?<pages>\d+)\](\(.+\))?\/(annots\[(?<annots>\d+)\](\(.+\))?\/appearance\[\d\](\(.+\))?\/)?contentStream\[(?<contentStream>\d+)\](\(.+\))?\/content\[(?<content>\d+)\](\{mcid:\d+\})?(?<contentItems>((\(.+\))?\/contentItem\[(\d+)\](\{mcid:\d+\})?)+)/);
            if (result) {
                try {
                    var path_1 = {};
                    path_1.pageIndex = parseInt(result.groups.pages, 10);
                    path_1.contentStream = parseInt(result.groups.contentStream, 10);
                    path_1.content = parseInt(result.groups.content, 10);
                    path_1.contentItems = result.groups.contentItems.split('/').filter(function (ci) { return ci.includes('contentItem'); }).map(function (ci) {
                        var _a;
                        var contentItemIndex = ci.match(/\[(?<contentItem>\d+)\]/);
                        return parseInt(((_a = contentItemIndex === null || contentItemIndex === void 0 ? void 0 : contentItemIndex.groups) === null || _a === void 0 ? void 0 : _a.contentItem) || '-1', 10);
                    });
                    path_1.annotIndex = parseInt(result.groups.annots, 10) || undefined;
                    return path_1;
                }
                catch (err) {
                    console.log('NoMCIDContentItemPathParseError:', err.message || err);
                }
            }
            var path_2 = {};
            contextString.split('/').forEach(function (nodeString) {
                if (nodeString.includes('page')) {
                    path_2.pageIndex = parseInt(nodeString.split(/[[\]]/)[1], 10);
                }
                else if (nodeString.includes('contentItem') && nodeString.includes('mcid')) {
                    path_2.mcid = parseInt(nodeString.split('mcid:')[1].slice(0, -1), 10);
                }
            });
            return path_2;
        }
        else if (contextString.includes('annots')) {
            var path_3 = {};
            contextString.split('/').forEach(function (nodeString) {
                if (nodeString.includes('page')) {
                    path_3.pageIndex = parseInt(nodeString.split(/[[\]]/)[1], 10);
                }
                else if (nodeString.includes('annots')) {
                    path_3.annot = parseInt(nodeString.split(/[[\]]/)[1], 10);
                }
            });
            return path_3;
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
var getBboxForGlyph = function (operatorIndex, glyphIndex, operationsList, viewport, rotateAngle, leftOffset, bottomOffset) {
    var bbox = operationsList[operatorIndex] ? operationsList[operatorIndex][glyphIndex] : null;
    if (!bbox) {
        return [];
    }
    var coords = __spreadArray([], bbox, true);
    coords[0] += leftOffset;
    coords[1] += bottomOffset;
    var coordsArray = rotateCoordinates(coords, rotateAngle, viewport);
    var rotatedViewport = rotateViewport(rotateAngle, viewport);
    return [coordsArray[0] - rotatedViewport[0], coordsArray[1] - rotatedViewport[1], coordsArray[2], coordsArray[3]];
};
var parseMcidToBbox = function (listOfMcid, pageMap, refMap, annotations, viewport, rotateAngle, left, bottom) {
    var _a;
    if (left === void 0) { left = 0; }
    if (bottom === void 0) { bottom = 0; }
    var coords = {};
    var leftOffset = left;
    var bottomOffset = bottom;
    if (listOfMcid instanceof Array) {
        listOfMcid.forEach(function (mcid) {
            var _a;
            var currentBbox;
            if (mcid instanceof Object) {
                currentBbox = ___default["default"].isNil(mcid.ref) ? pageMap[mcid.mcid] : (_a = refMap === null || refMap === void 0 ? void 0 : refMap["".concat(mcid.ref, "R")]) === null || _a === void 0 ? void 0 : _a[mcid.mcid];
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
        var rect = (_a = annotations[listOfMcid.annot]) === null || _a === void 0 ? void 0 : _a.rect;
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
    var coordsArray = rotateCoordinates([
        coords.x + leftOffset,
        coords.y + bottomOffset,
        coords.width,
        coords.height,
    ], rotateAngle, viewport);
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
    var elementArea = width * height;
    while (el.offsetParent && !el.offsetParent.className.includes('pdf-viewer')) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }
    var parent = document.querySelector('.pdf-viewer');
    var parentArea = parent.offsetWidth * parent.offsetHeight;
    var parentScrollTop = parent.scrollTop;
    var parentScrollLeft = parent.scrollLeft;
    if (elementArea >= parentArea) {
        return true;
    }
    return (top >= parentScrollTop &&
        left >= parentScrollLeft &&
        (top + height) <= (parentScrollTop + parent.offsetHeight) &&
        (left + width) <= (parentScrollLeft + parent.offsetWidth));
}
function concatBoundingBoxes(newBoundingBox, oldBoundingBox) {
    if (___default["default"].isNil(oldBoundingBox) && ___default["default"].isNil(newBoundingBox)) {
        return {};
    }
    if (___default["default"].isNil(newBoundingBox) || Object.values(newBoundingBox).some(function (el) { return ___default["default"].isNil(el); })) {
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
var StyledPdfPage = styled__default["default"].div.withConfig({ displayName: "StyledPdfPage", componentId: "-1bn9hgf" })(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  min-height: ", ";\n  min-width: ", ";\n  &.pdf-page_selected {\n    outline-color: ", ";\n  }\n"], ["\n  min-height: ", ";\n  min-width: ", ";\n  &.pdf-page_selected {\n    outline-color: ", ";\n  }\n"])), function (props) { return props.height ? props.height * props.scale + 'px' : 'auto'; }, function (props) { return props.width ? props.width * props.scale + 'px' : 'auto'; }, function (props) { return props.colorScheme && props.colorScheme.borderSelected || bboxBorderHover; });
var PdfPage = function (props) {
    var scrollInto = React.useContext(ViewerContext).scrollInto;
    var _a = props.bboxList, bboxList = _a === void 0 ? [] : _a, _b = props.scale, scale = _b === void 0 ? 1 : _b;
    var intersectionRef = React.useRef(null);
    var _c = React.useState([]), bboxesAll = _c[0], setBboxesAll = _c[1];
    var _d = React.useState([]), bboxesErrors = _d[0], setBboxesErrors = _d[1];
    var _e = React.useState(false), loaded = _e[0], setLoaded = _e[1];
    var _f = React.useState(scale), pageScale = _f[0], setPageScale = _f[1];
    var _g = React.useState([]), pageViewport = _g[0], setPageViewport = _g[1];
    var _h = React.useState(false), isRendered = _h[0], setIsRendered = _h[1];
    var _j = React.useState(false), isIntersecting = _j[0], setIsIntersecting = _j[1];
    var _k = React.useState(0), intersectionRatio = _k[0], setIntersectionRatio = _k[1];
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
    var onBboxClick = React.useCallback(function (index, id) { return function (e) {
        var _a;
        e.stopPropagation();
        (_a = props.onBboxClick) === null || _a === void 0 ? void 0 : _a.call(props, { index: index, id: id });
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
            var annotBBoxesAndOpPos = operatorList.argsArray[operatorList.argsArray.length - 3];
            var operationData = operatorList.argsArray[operatorList.argsArray.length - 2];
            var _b = operatorList.argsArray[operatorList.argsArray.length - 1], positionData = _b[0], noMCIDData = _b[1], refPositionData = _b[2];
            var annotsFormatted = getFormattedAnnotations(annotations);
            var allBboxes = createAllBboxes(props.treeElementsBboxes, positionData, refPositionData, annotsFormatted, page.view, page.rotate);
            var errorBboxes = bboxList.map(function (bbox) {
                var _a;
                var _b, _c, _d, _e, _f, _g, _h, _j;
                var opData = operationData, posData = positionData, nMcidData = noMCIDData;
                var left = 0, bottom = 0;
                var annotIndex = bbox.annotIndex;
                if (annotIndex != null) {
                    left = (_c = (_b = annotations[annotIndex]) === null || _b === void 0 ? void 0 : _b.rect[0]) !== null && _c !== void 0 ? _c : 0;
                    bottom = (_e = (_d = annotations[annotIndex]) === null || _d === void 0 ? void 0 : _d.rect[1]) !== null && _e !== void 0 ? _e : 0;
                    opData = (_g = (_f = annotBBoxesAndOpPos[annotIndex]) === null || _f === void 0 ? void 0 : _f[0]) !== null && _g !== void 0 ? _g : [];
                    _a = (_j = (_h = annotBBoxesAndOpPos[annotIndex]) === null || _h === void 0 ? void 0 : _h[1]) !== null && _j !== void 0 ? _j : [[], []], posData = _a[0], nMcidData = _a[1];
                }
                if (bbox.mcidList) {
                    bbox.location = parseMcidToBbox(bbox.mcidList, posData, refPositionData, annotsFormatted, page.view, page.rotate, left, bottom);
                    if (___default["default"].isEmpty(bbox.location)) {
                        return null;
                    }
                }
                else if (bbox.contentItemPath) {
                    var contentItemsPath_1 = bbox.contentItemPath.slice(2);
                    var contentItemsBBoxes_1 = nMcidData[bbox.contentItemPath[1]];
                    try {
                        contentItemsPath_1.forEach(function (ci, i) {
                            if (contentItemsPath_1.length > i + 1 || !contentItemsBBoxes_1.final) {
                                contentItemsBBoxes_1 = contentItemsBBoxes_1.contentItems[0];
                            }
                            contentItemsBBoxes_1 = contentItemsBBoxes_1.contentItems[ci];
                        });
                        bbox.location = [
                            contentItemsBBoxes_1.contentItem.x + left,
                            contentItemsBBoxes_1.contentItem.y + bottom,
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
                    bbox.location = getBboxForGlyph(bbox.operatorIndex, bbox.glyphIndex, opData, page.view, page.rotate, left, bottom);
                }
                return bbox;
            });
            setBboxesAll(allBboxes);
            setBboxesErrors(errorBboxes);
        });
        (_a = props.onPageLoadSuccess) === null || _a === void 0 ? void 0 : _a.call(props, page);
    }, [bboxList, props.treeElementsBboxes, props.width, props.height, scale]);
    React.useEffect(function () {
        if (bboxList.length) {
            setBboxesErrors(function (prev) { return ___default["default"].map(prev, function (bbox, index) {
                if (___default["default"].isNil(bbox))
                    return null;
                return __assign(__assign({}, bbox), { isVisible: bboxList[index].hasOwnProperty('isVisible') ? bboxList[index].isVisible : true });
            }); });
        }
    }, [bboxList]);
    React.useEffect(function () {
        var _a;
        if (!loaded && isIntersecting) {
            setLoaded(true);
        }
        (_a = props.onPageInViewport) === null || _a === void 0 ? void 0 : _a.call(props, props.page, { isIntersecting: isIntersecting, intersectionRatio: intersectionRatio });
    }, [isIntersecting, intersectionRatio, loaded]);
    React.useEffect(function () {
        var _a;
        if (scrollInto.page === props.page) {
            (_a = intersectionRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView();
        }
    }, [scrollInto]);
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
    var isBboxSelected = React.useCallback(function (bbox) {
        var _a;
        var isBboxMode = !___default["default"].isNil(props.activeBboxIndex);
        var isErrorBboxSelected = bbox.index === props.activeBboxIndex;
        var isStructureBboxSelected;
        switch (props.treeBboxSelectionMode) {
            case TreeBboxSelectionMode.SELECTED_WITH_KIDS: {
                isStructureBboxSelected = (bbox === null || bbox === void 0 ? void 0 : bbox.id) === (props === null || props === void 0 ? void 0 : props.activeBboxId) || ((_a = bbox === null || bbox === void 0 ? void 0 : bbox.id) === null || _a === void 0 ? void 0 : _a.startsWith("".concat(props === null || props === void 0 ? void 0 : props.activeBboxId, ":")));
                break;
            }
            case TreeBboxSelectionMode.SELECTED:
            default: isStructureBboxSelected = (bbox === null || bbox === void 0 ? void 0 : bbox.id) === (props === null || props === void 0 ? void 0 : props.activeBboxId);
        }
        return isBboxMode ? isErrorBboxSelected : isStructureBboxSelected;
    }, [props.activeBboxIndex, props.activeBboxId]);
    var isBboxRelated = React.useCallback(function (bbox) {
        var _a, _b;
        var _c = ((_a = props === null || props === void 0 ? void 0 : props.groupId) === null || _a === void 0 ? void 0 : _a.split('-')) || [], activeId = _c[2];
        var _d = ((_b = bbox === null || bbox === void 0 ? void 0 : bbox.groupId) === null || _b === void 0 ? void 0 : _b.split('-')) || [], bboxId = _d[2];
        return props.groupId ? activeId === bboxId && !isBboxSelected(bbox) : false;
    }, [props.groupId, isBboxSelected]);
    var isBboxStructured = React.useCallback(function (bbox) { return ___default["default"].isNil(bbox.index); }, []);
    var isBboxDisabled = React.useCallback(function (bbox) {
        if (___default["default"].isNil(bbox))
            return true;
        if (bbox.hasOwnProperty('isVisible'))
            return !bbox.isVisible;
        return !props.isTreeBboxesVisible;
    }, [props.isTreeBboxesVisible]);
    var bboxes = React.useMemo(function () {
        /*
          Sorting bboxes in descending order of area
          Note: if the area of error bbox equal to the area of structure bbox,
          then we assume that the structure bbox has a larger area
        */
        return __spreadArray(__spreadArray([], bboxesAll, true), cleanArray(bboxesErrors), true).sort(function (_a, _b) {
            var locationAll = _a.location;
            var locationError = _b.location;
            var getArea = function (arr) { return ___default["default"].round(+arr[2], 4) * ___default["default"].round(+arr[3], 4); };
            var areaAll = locationAll ? getArea(locationAll) : 0;
            var areaError = locationError ? getArea(locationError) : 0;
            return areaAll < areaError ? 1 : (areaAll > areaError ? -1 : 0);
        });
    }, [bboxesErrors, bboxesAll]);
    var activeBboxes = React.useMemo(function () { return bboxes.filter(function (bbox) {
        var isBboxMode = !___default["default"].isNil(props.activeBboxIndex);
        return isBboxMode ? bbox.index === props.activeBboxIndex : (bbox === null || bbox === void 0 ? void 0 : bbox.id) === (props === null || props === void 0 ? void 0 : props.activeBboxId);
    }); }, [props.activeBboxIndex, props.activeBboxId]);
    React.useEffect(React.useCallback(function () {
        var _a;
        if (activeBboxes && activeBboxes.length && activeBboxes.every(function (activeBbox) { return checkIsBboxOutOfThePage(activeBbox, scale, props.page); })) {
            (_a = props.onWarning) === null || _a === void 0 ? void 0 : _a.call(props, WARNING_CODES.BBOX_OUT_OF_THE_PAGE_VIEWPORT);
        }
    }, [activeBboxes, scale, props.page]), [activeBboxes]);
    return (React__default["default"].createElement(StyledPdfPage, { className: "pdf-page pdf-page_rendered".concat(props.isPageSelected ? ' pdf-page_selected' : ''), "data-page": props.page, onClick: onPageClick, height: !isRendered ? props.height || props.defaultHeight : undefined, width: !isRendered ? props.width || props.defaultWidth : undefined, scale: pageScale, ref: intersectionRef, colorScheme: props.colorScheme || {} }, loaded ? React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(reactPdf.Page, { pageNumber: props.page, error: props.pageError, height: props.height, width: props.width, loading: props.pageLoading, inputRef: props.inputRef, renderAnnotationLayer: props.renderAnnotationLayer, renderForms: props.renderInteractiveForms, renderTextLayer: props.renderTextLayer, scale: props.scale, onLoadError: props.onPageLoadError, onLoadSuccess: onPageLoadSuccess, onRenderError: props.onPageRenderError, onRenderSuccess: onPageRenderSuccess, onGetAnnotationsSuccess: props.onGetAnnotationsSuccess, onGetAnnotationsError: props.onGetAnnotationsError, onGetTextSuccess: props.onGetTextSuccess, onGetTextError: props.onGetTextError, customTextRenderer: props.customTextRenderer }),
        isRendered ? bboxes.map(function (bbox, index) { return (React__default["default"].createElement(Bbox$1, { key: index, bbox: bbox, onClick: onBboxClick(bbox.index, bbox.id), disabled: isBboxDisabled(bbox), structured: isBboxStructured(bbox), selected: isBboxSelected(bbox), related: isBboxRelated(bbox), scale: pageScale, selectionMode: props.treeBboxSelectionMode, colorScheme: props.colorScheme })); }) : null) : null));
};
var PdfPage$1 = React.memo(PdfPage);
var templateObject_1;

___$insertStyle(".pdf-document {\n  display: flex;\n  flex-direction: column;\n  margin: auto;\n}");

reactPdf.pdfjs.GlobalWorkerOptions.workerSrc = new URL(pdfWorkerURL__default["default"], (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT' && document.currentScript.src || new URL('index.js', document.baseURI).href))).toString();
var PdfDocument = function (props) {
    var _a = React.useContext(ViewerContext), page = _a.page, setPage = _a.setPage, maxPage = _a.maxPage, setMaxPage = _a.setMaxPage, scrollInto = _a.scrollInto, setScrollIntoPage = _a.setScrollIntoPage;
    var _b = props.bboxes, bboxes = _b === void 0 ? [] : _b;
    var _c = React.useState(false), loaded = _c[0], setLoaded = _c[1];
    var _d = React.useState({}), structureTree = _d[0], setStructureTree = _d[1];
    var _e = React.useState({}), parsedTree = _e[0], setParsedTree = _e[1];
    var _f = React.useState({}), bboxMap = _f[0], setBboxMap = _f[1];
    var _g = React.useState({}), treeElementsBboxes = _g[0], setTreeElementsBboxes = _g[1];
    var _h = React.useState([]), pagesByViewport = _h[0], setPagesByViewport = _h[1];
    var _j = React.useState([]), ratioArray = _j[0], setRatioArray = _j[1];
    var _k = React.useState(props.defaultHeight), defaultHeight = _k[0], setDefaultHeight = _k[1];
    var _l = React.useState(props.defaultWidth), defaultWidth = _l[0], setDefaultWidth = _l[1];
    var _m = React.useState(undefined), selectedPage = _m[0], setSelectedPage = _m[1];
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
        var mcidList = getMcidList(parsedTree !== null && parsedTree !== void 0 ? parsedTree : {});
        setTreeElementsBboxes(createBboxMap(mcidList));
    }, [parsedTree]);
    React.useEffect(function () {
        var isBboxMode = !___default["default"].isNil(props.activeBboxIndex);
        var id = isBboxMode ? props.activeBboxIndex : props.activeBboxId;
        if ((id !== null && id !== void 0 ? id : false) === false) {
            return;
        }
        var entries = Object.entries(isBboxMode ? bboxMap : treeElementsBboxes);
        var finder = isBboxMode
            ? function (value) { return ___default["default"].find(value, { index: props.activeBboxIndex }); }
            : function (value) { return ___default["default"].find(value, function (arr) { return arr[1] === props.activeBboxId; }); };
        var bboxPage = 0;
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var _a = entries_1[_i], key = _a[0], value = _a[1];
            if (finder(value)) {
                bboxPage = parseInt(key);
                break;
            }
        }
        if (bboxPage > 0 && !activeBboxInViewport()) {
            setScrollIntoPage(bboxPage);
            // To be sure that page is loaded before scrolling to the active bbox
            setTimeout(function () { return scrollToActiveBbox(); }, 100);
        }
    }, [props.activeBboxIndex, props.activeBboxId, bboxMap, treeElementsBboxes]);
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
        var parsedTree, treeWithData, _a, treeWithIds, annotMap, pageData, width, scale;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    setStructureTree(data._pdfInfo.structureTree);
                    parsedTree = parseTree(___default["default"].cloneDeep(data._pdfInfo.structureTree));
                    treeWithData = structurizeTree(parsedTree);
                    _a = setTreeIds(treeWithData !== null && treeWithData !== void 0 ? treeWithData : {}), treeWithIds = _a[0], annotMap = _a[1];
                    if (!___default["default"].isNil(treeWithIds))
                        treeWithIds.annotMap = annotMap;
                    setParsedTree(treeWithIds !== null && treeWithIds !== void 0 ? treeWithIds : {});
                    data.parsedTree = treeWithIds !== null && treeWithIds !== void 0 ? treeWithIds : {};
                    return [4 /*yield*/, data.getPage(1)];
                case 1:
                    pageData = _c.sent();
                    width = Math.min(pageData.view[2], props.defaultWidth || pageData.view[2]);
                    scale = width / pageData.view[2];
                    setDefaultWidth(width);
                    setDefaultHeight(pageData.view[3] * scale);
                    setMaxPage(data.numPages);
                    setLoaded(true);
                    (_b = props.onLoadSuccess) === null || _b === void 0 ? void 0 : _b.call(props, data);
                    return [2 /*return*/];
            }
        });
    }); }, [props.onLoadSuccess, bboxes, props.defaultHeight, props.defaultWidth]);
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
            if (scrollInto.page) {
                setScrollIntoPage(0);
            }
        }
    }; }, [pagesByViewport, page, ratioArray, scrollInto]);
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
    React.useEffect(function () {
        function handlekeydownEvent(event) {
            var _a, _b;
            if ((event.ctrlKey || event.metaKey) && event.key === 'ArrowUp') {
                props.onSelectBbox((___default["default"].isNil(props.activeBboxIndex) || props.activeBboxIndex === -1 || props.activeBboxIndex === 0) ? 0 : props.activeBboxIndex - 1);
            }
            else if ((event.ctrlKey || event.metaKey) && event.key === 'ArrowDown') {
                props.onSelectBbox((props.activeBboxIndex === -1 || ___default["default"].isNil(props.activeBboxIndex)) ? 0 :
                    (props.activeBboxIndex + 1 === bboxes.length) ? props.activeBboxIndex : props.activeBboxIndex + 1);
            }
            else if (event.key === 'ArrowLeft' && (props.page - 1 > 0)) {
                (_a = props.onPageChange) === null || _a === void 0 ? void 0 : _a.call(props, props.page - 1);
            }
            else if (event.key === 'ArrowRight' && props.page !== maxPage) {
                (_b = props.onPageChange) === null || _b === void 0 ? void 0 : _b.call(props, props.page + 1);
            }
        }
        document.addEventListener('keydown', handlekeydownEvent);
        return function () {
            document.removeEventListener('keydown', handlekeydownEvent);
        };
    }, [props.activeBboxIndex, props.page, maxPage]);
    return (React__default["default"].createElement(reactPdf.Document, { className: "pdf-document", file: props.file, onLoadSuccess: onDocumentLoadSuccess, onLoadError: props.onLoadError, externalLinkTarget: props.externalLinkTarget, error: props.error, loading: props.loading, noData: props.noData, onItemClick: props.onItemClick, rotate: props.rotate }, React.useMemo(function () { return loaded ? shownPages.map(function (page) {
        var _a;
        return React__default["default"].createElement(PdfPage$1, { defaultHeight: defaultHeight, defaultWidth: defaultWidth, key: page, page: page, pageError: props.pageError, inputRef: props.inputRef, height: props.height, width: props.width, pageLoading: props.pageLoading, renderAnnotationLayer: props.renderAnnotationLayer, renderInteractiveForms: props.renderInteractiveForms, renderTextLayer: props.renderTextLayer, scale: props.scale, onPageLoadError: props.onPageLoadError, onPageLoadSuccess: onPageLoadSuccess, onPageRenderError: props.onPageRenderError, onPageRenderSuccess: props.onPageRenderSuccess, onGetAnnotationsSuccess: props.onGetAnnotationsSuccess, onGetAnnotationsError: props.onGetAnnotationsError, onGetTextSuccess: props.onGetTextSuccess, onGetTextError: props.onGetTextError, onPageInViewport: onPageInViewport, bboxList: bboxMap[page], treeElementsBboxes: treeElementsBboxes[page], treeBboxSelectionMode: props.treeBboxSelectionMode, groupId: (_a = bboxes[props.activeBboxIndex]) === null || _a === void 0 ? void 0 : _a.groupId, activeBboxIndex: props.activeBboxIndex, activeBboxId: props.activeBboxId, isTreeBboxesVisible: props.isTreeBboxesVisible, onBboxClick: onBboxClick, colorScheme: props.colorScheme, isPageSelected: selectedPage === page, onWarning: props.onWarning });
    }) : null; }, [loaded, shownPages, defaultHeight, defaultWidth, bboxMap, treeElementsBboxes, props, selectedPage])));
};
var PdfDocument$1 = React.memo(PdfDocument);

___$insertStyle(".pdf-viewer {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  position: relative;\n  flex-direction: column;\n  justify-content: flex-start;\n  overflow: auto;\n  outline: none;\n}\n.pdf-viewer .annotationLayer section {\n  pointer-events: none;\n}");

var App = function (props) {
    var _a = props.className, className = _a === void 0 ? '' : _a, _b = props.bboxes, bboxes = _b === void 0 ? [] : _b, renderBbox = props.renderBbox, pdfProps = __rest(props, ["className", "bboxes", "renderBbox"]);
    return (React__default["default"].createElement(ViewerProvider, { renderBbox: renderBbox },
        React__default["default"].createElement("div", { className: "pdf-viewer ".concat(className), role: "button", tabIndex: 0 },
            React__default["default"].createElement(PdfDocument$1, __assign({}, pdfProps, { bboxes: bboxes })))));
};

exports["default"] = App;
exports.scrollToActiveBbox = scrollToActiveBbox;
//# sourceMappingURL=index.js.map
