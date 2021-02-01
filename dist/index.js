

function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactPdf = require('react-pdf');
var useIntersection = require('use-intersection');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

/*! *****************************************************************************
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
        while (_) try {
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

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

___$insertStyle(".pdf-bbox {\n  position: absolute;\n  border: 2px solid grey;\n  cursor: pointer;\n  z-index: 2;\n}\n.pdf-bbox:hover {\n  border-color: orangered;\n}\n.pdf-bbox_selected {\n  z-index: 1;\n  background: rgba(255, 69, 0, 0.5);\n}");

var BboxDiv = styled__default['default'].div.withConfig({ displayName: "BboxDiv", componentId: "sc-wabgee" })(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  left: ", "px;\n  top: ", "px;\n  height: ", "px;\n  width: ", "px;\n"], ["\n  left: ", "px;\n  top: ", "px;\n  height: ", "px;\n  width: ", "px;\n"])), function (props) { return props.left; }, function (props) { return props.top; }, function (props) { return props.height; }, function (props) { return props.width; });
var Bbox = function (props) {
    var _a = props.bbox, left = _a[0], top = _a[1], width = _a[2], height = _a[3];
    return React__default['default'].createElement(BboxDiv, { className: "pdf-bbox " + (props.selected && 'pdf-bbox_selected'), left: left, top: top, width: width, height: height, onClick: props.onClick });
};
var templateObject_1;

___$insertStyle(".pdf-page {\n  position: relative;\n  background: #fff;\n}\n.pdf-page + .pdf-page {\n  margin-top: 8px;\n}");

var StyledPdfPage = styled__default['default'].div.withConfig({ displayName: "StyledPdfPage", componentId: "sc-53s4w0" })(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  min-height: ", ";\n  min-width: ", ";\n"], ["\n  min-height: ", ";\n  min-width: ", ";\n"])), function (props) { return props.height ? props.height + 'px' : 'auto'; }, function (props) { return props.width ? props.width + 'px' : 'auto'; });
var PdfPage = function (props) {
    var _a = props.bboxList, bboxList = _a === void 0 ? [] : _a;
    var intersectionRef = React.useRef(null);
    var _b = React.useState(false), isRendered = _b[0], setIsRendered = _b[1];
    var intersection = useIntersection.useIntersection(intersectionRef, {
        once: true,
    });
    var onPageClick = React.useCallback(function () {
        var _a;
        (_a = props.onBboxClick) === null || _a === void 0 ? void 0 : _a.call(props, null);
    }, []);
    var onBboxClick = React.useCallback(function (index) { return function (e) {
        var _a;
        e.stopPropagation();
        (_a = props.onBboxClick) === null || _a === void 0 ? void 0 : _a.call(props, { page: props.page, index: index });
    }; }, [props.onBboxClick]);
    var onPageRenderSuccess = React.useCallback(function () {
        var _a;
        setIsRendered(true);
        (_a = props.onPageRenderSuccess) === null || _a === void 0 ? void 0 : _a.call(props);
    }, []);
    React.useEffect(function () {
        var _a;
        if (intersection) {
            (_a = props.onPageInViewport) === null || _a === void 0 ? void 0 : _a.call(props, props.page);
        }
    }, [intersection]);
    var isBboxSelected = function (index) { return props.activeBbox === index; };
    return (React__default['default'].createElement(StyledPdfPage, { className: "pdf-page pdf-page_rendered", "data-page": props.page, onClick: onPageClick, height: !isRendered ? props.defaultHeight : undefined, width: !isRendered ? props.defaultWidth : undefined, ref: intersectionRef },
        React__default['default'].createElement(reactPdf.Page, { pageNumber: props.page, error: props.pageError, height: props.height, width: props.width, loading: props.pageLoading, inputRef: props.inputRef, renderAnnotationLayer: props.renderAnnotationLayer, renderInteractiveForms: props.renderInteractiveForms, renderTextLayer: props.renderTextLayer, scale: props.scale, onLoadError: props.onPageLoadError, onLoadProgress: props.onPageLoadProgress, onLoadSuccess: props.onPageLoadSuccess, onRenderError: props.onPageRenderError, onRenderSuccess: onPageRenderSuccess, onGetAnnotationsSuccess: props.onGetAnnotationsSuccess, onGetAnnotationsError: props.onGetAnnotationsError, onGetTextSuccess: props.onGetTextSuccess, onGetTextError: props.onGetTextError }),
        isRendered ? bboxList.map(function (bbox, index) { return (React__default['default'].createElement(Bbox, { key: index, bbox: bbox, onClick: onBboxClick(index), selected: isBboxSelected(index) })); }) : null));
};
var PdfPage$1 = React.memo(PdfPage);
var templateObject_1$1;

var StyledEmptyPage = styled__default['default'].div.withConfig({ displayName: "StyledEmptyPage", componentId: "sc-4zqg32" })(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n  min-height: ", ";\n  min-width: ", ";\n"], ["\n  min-height: ", ";\n  min-width: ", ";\n"])), function (props) { return props.height ? props.height + 'px' : 'auto'; }, function (props) { return props.width ? props.width + 'px' : 'auto'; });
var EmptyPage = function (props) {
    var intersectionRef = React.useRef(null);
    var intersection = useIntersection.useIntersection(intersectionRef, {
        once: true,
    });
    React.useEffect(function () {
        var _a;
        if (intersection) {
            (_a = props.onPageInViewport) === null || _a === void 0 ? void 0 : _a.call(props, props.page);
        }
    }, [intersection]);
    return (React__default['default'].createElement(StyledEmptyPage, { className: "pdf-page", height: props.height, width: props.width, "data-page": props.page, ref: intersectionRef }));
};
var EmptyPage$1 = React.memo(EmptyPage);
var templateObject_1$2;

___$insertStyle(".pdf-document {\n  display: flex;\n  flex-direction: column;\n}");

var PdfDocument = function (props) {
    // TODO: Add input param for worker path
    reactPdf.pdfjs.GlobalWorkerOptions.workerSrc = React.useMemo(function () { return "//cdnjs.cloudflare.com/ajax/libs/pdf.js/" + reactPdf.pdfjs.version + "/pdf.worker.min.js"; }, []);
    var _a = props.bboxMap, bboxMap = _a === void 0 ? {} : _a;
    var _b = React.useState(0), numPages = _b[0], setNumPages = _b[1];
    var _c = React.useState([props.page || 1]), renderedPages = _c[0], setRenderedPages = _c[1];
    var _d = React.useState(0), defaultHeight = _d[0], setDefaultHeight = _d[1];
    var _e = React.useState(0), defaultWidth = _e[0], setDefaultWidth = _e[1];
    var shownPages = React.useMemo(function () {
        if (props.showAllPages) {
            return Array.from(new Array(numPages), function (_el, index) { return index + 1; });
        }
        return [props.page || 1];
    }, [numPages, props.showAllPages]);
    var onDocumentLoadSuccess = React.useCallback(function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var pageData;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, data.getPage(1)];
                case 1:
                    pageData = _b.sent();
                    setDefaultHeight(pageData.view[3]);
                    setDefaultWidth(pageData.view[2]);
                    setNumPages(data.numPages);
                    (_a = props.onLoadSuccess) === null || _a === void 0 ? void 0 : _a.call(props, data);
                    return [2 /*return*/];
            }
        });
    }); }, [props.onLoadSuccess]);
    var onPageLoadSuccess = React.useCallback(function (data) {
        var _a;
        (_a = props.onPageLoadSuccess) === null || _a === void 0 ? void 0 : _a.call(props, data);
    }, [props.onPageLoadSuccess]);
    var onPageInViewport = React.useCallback(function (page) {
        if (!numPages || !props.showAllPages || !defaultHeight) {
            return;
        }
        var pagesToRender = [];
        if (!renderedPages.includes(page - 1) && page > 1) {
            pagesToRender.push(page - 1);
        }
        if (!renderedPages.includes(page)) {
            pagesToRender.push(page);
        }
        if (!renderedPages.includes(page + 1) && page < numPages) {
            pagesToRender.push(page + 1);
        }
        setRenderedPages(__spreadArrays(renderedPages, pagesToRender));
    }, [renderedPages, numPages, props.showAllPages]);
    var isPageRendered = React.useMemo(function () { return function (page) { return renderedPages.includes(page); }; }, [renderedPages]);
    var getSelectedBbox = React.useMemo(function () { return function (page) { return props.activePage === page ? props.activeBboxIndex : undefined; }; }, [props.activeBboxIndex, props.activePage]);
    var onBboxClick = React.useCallback(function (data) {
        var _a;
        (_a = props.onBboxClick) === null || _a === void 0 ? void 0 : _a.call(props, data);
    }, []);
    return (React__default['default'].createElement(reactPdf.Document, { className: "pdf-document", file: props.file, onLoadSuccess: onDocumentLoadSuccess, onLoadError: props.onLoadError, externalLinkTarget: props.externalLinkTarget, error: props.error, loading: props.loading, noData: props.noData, onItemClick: props.onItemClick, rotate: props.rotate }, shownPages.map(function (page) {
        return isPageRendered(page) ?
            React__default['default'].createElement(PdfPage$1, { defaultHeight: defaultHeight, defaultWidth: defaultWidth, key: page, page: page, pageError: props.pageError, inputRef: props.inputRef, height: props.height, width: props.width, pageLoading: props.pageLoading, renderAnnotationLayer: props.renderAnnotationLayer, renderInteractiveForms: props.renderInteractiveForms, renderTextLayer: props.renderTextLayer, scale: props.scale, onPageLoadError: props.onPageLoadError, onPageLoadProgress: props.onPageLoadProgress, onPageLoadSuccess: onPageLoadSuccess, onPageRenderError: props.onPageRenderError, onPageRenderSuccess: props.onPageRenderSuccess, onGetAnnotationsSuccess: props.onGetAnnotationsSuccess, onGetAnnotationsError: props.onGetAnnotationsError, onGetTextSuccess: props.onGetTextSuccess, onGetTextError: props.onGetTextError, onPageInViewport: onPageInViewport, bboxList: bboxMap[page], activeBbox: getSelectedBbox(page), onBboxClick: onBboxClick }) :
            React__default['default'].createElement(EmptyPage$1, { key: page, page: page, width: defaultWidth, height: defaultHeight, onPageInViewport: onPageInViewport });
    })));
};
var PdfDocument$1 = React.memo(PdfDocument);

___$insertStyle(".pdf-viewer {\n  display: flex;\n  position: relative;\n  justify-content: center;\n}");

var App = function (props) {
    var _a = props.className, className = _a === void 0 ? '' : _a, pdfProps = __rest(props, ["className"]);
    return (React__default['default'].createElement("div", { className: "pdf-viewer " + className },
        React__default['default'].createElement(PdfDocument$1, __assign({}, pdfProps))));
};

exports.default = App;
//# sourceMappingURL=index.js.map
