

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
var reactUse = require('react-use');

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
    return React__default['default'].createElement(BboxDiv, { className: "pdf-bbox " + (props.selected && 'pdf-bbox_selected'), left: left * props.scale, top: top * props.scale, width: width * props.scale, height: height * props.scale, onClick: props.onClick });
};
var Bbox$1 = React.memo(Bbox);
var templateObject_1;

var ViewerContext = React.createContext({});
var ViewerProvider = function (props) {
    var _a = React.useState(0), tempPage = _a[0], setTempPage = _a[1];
    var _b = React.useState(0), page = _b[0], setPage = _b[1];
    var _c = React.useState(0), scrollIntoPage = _c[0], setScrollIntoPage = _c[1];
    var _d = React.useState(0), maxPage = _d[0], setMaxPage = _d[1];
    var _e = React.useState(true), showBboxes = _e[0], setShowBboxes = _e[1];
    reactUse.useDebounce(function () {
        setPage(tempPage);
    }, 30, [tempPage]);
    var context = {
        page: page,
        setPage: setTempPage,
        maxPage: maxPage,
        setMaxPage: setMaxPage,
        scrollIntoPage: scrollIntoPage,
        setScrollIntoPage: setScrollIntoPage,
        showBboxes: showBboxes,
        setShowBboxes: setShowBboxes,
    };
    return React__default['default'].createElement(ViewerContext.Provider, { value: context }, props.children);
};

___$insertStyle(".pdf-page {\n  position: relative;\n  background: #fff;\n  margin-top: 8px;\n  -moz-box-shadow: 0 0 4px 2px #cccccc;\n  -webkit-box-shadow: 0 0 4px 2px #cccccc;\n  box-shadow: 0 0 4px 2px #cccccc;\n}");

var StyledPdfPage = styled__default['default'].div.withConfig({ displayName: "StyledPdfPage", componentId: "sc-9rs558" })(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  min-height: ", ";\n  min-width: ", ";\n"], ["\n  min-height: ", ";\n  min-width: ", ";\n"])), function (props) { return props.height ? props.height * props.scale + 'px' : 'auto'; }, function (props) { return props.width ? props.width * props.scale + 'px' : 'auto'; });
var PdfPage = function (props) {
    var _a = React.useContext(ViewerContext), scrollIntoPage = _a.scrollIntoPage, setScrollIntoPage = _a.setScrollIntoPage, showBboxes = _a.showBboxes;
    var _b = props.bboxList, bboxList = _b === void 0 ? [] : _b, _c = props.scale, scale = _c === void 0 ? 1 : _c;
    var intersectionRef = React.useRef(null);
    var _d = React.useState(false), loaded = _d[0], setLoaded = _d[1];
    var _e = React.useState(false), isRendered = _e[0], setIsRendered = _e[1];
    var _f = React.useState(false), isIntersecting = _f[0], setIsIntersecting = _f[1];
    var _g = React.useState(0), intersectionRatio = _g[0], setIntersectionRatio = _g[1];
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
        (_a = props.onBboxClick) === null || _a === void 0 ? void 0 : _a.call(props, { page: props.page, index: index });
    }; }, [props.onBboxClick]);
    var onPageRenderSuccess = React.useCallback(function () {
        var _a;
        setIsRendered(true);
        (_a = props.onPageRenderSuccess) === null || _a === void 0 ? void 0 : _a.call(props);
    }, []);
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
            setScrollIntoPage(0);
        }
    }, [scrollIntoPage]);
    var isBboxSelected = function (index) { return props.activeBbox === index; };
    return (React__default['default'].createElement(StyledPdfPage, { className: "pdf-page pdf-page_rendered", "data-page": props.page, onClick: onPageClick, height: !isRendered ? props.defaultHeight : undefined, width: !isRendered ? props.defaultWidth : undefined, scale: scale, ref: intersectionRef }, loaded ? React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement(reactPdf.Page, { pageNumber: props.page, error: props.pageError, height: props.height, width: props.width, loading: props.pageLoading, inputRef: props.inputRef, renderAnnotationLayer: props.renderAnnotationLayer, renderInteractiveForms: props.renderInteractiveForms, renderTextLayer: props.renderTextLayer, scale: props.scale, onLoadError: props.onPageLoadError, onLoadProgress: props.onPageLoadProgress, onLoadSuccess: props.onPageLoadSuccess, onRenderError: props.onPageRenderError, onRenderSuccess: onPageRenderSuccess, onGetAnnotationsSuccess: props.onGetAnnotationsSuccess, onGetAnnotationsError: props.onGetAnnotationsError, onGetTextSuccess: props.onGetTextSuccess, onGetTextError: props.onGetTextError }),
        showBboxes && isRendered ? bboxList.map(function (bbox, index) { return (React__default['default'].createElement(Bbox$1, { key: index, bbox: bbox, onClick: onBboxClick(index), selected: isBboxSelected(index), scale: scale })); }) : null) : null));
};
var PdfPage$1 = React.memo(PdfPage);
var templateObject_1$1;

___$insertStyle(".pdf-document {\n  display: flex;\n  flex-direction: column;\n}");

var PdfDocument = function (props) {
    // TODO: Add input param for worker path
    reactPdf.pdfjs.GlobalWorkerOptions.workerSrc = React.useMemo(function () { return "//cdnjs.cloudflare.com/ajax/libs/pdf.js/" + reactPdf.pdfjs.version + "/pdf.worker.min.js"; }, []);
    var _a = React.useContext(ViewerContext), page = _a.page, setPage = _a.setPage, maxPage = _a.maxPage, setMaxPage = _a.setMaxPage;
    var _b = props.bboxMap, bboxMap = _b === void 0 ? {} : _b;
    var _c = React.useState(false), loaded = _c[0], setLoaded = _c[1];
    var _d = React.useState([]), pagesByViewport = _d[0], setPagesByViewport = _d[1];
    var _e = React.useState([]), ratioArray = _e[0], setRatioArray = _e[1];
    var _f = React.useState(0), defaultHeight = _f[0], setDefaultHeight = _f[1];
    var _g = React.useState(0), defaultWidth = _g[0], setDefaultWidth = _g[1];
    var shownPages = React.useMemo(function () {
        if (props.showAllPages) {
            return Array.from(new Array(maxPage), function (_el, index) { return index + 1; });
        }
        return [props.page || 1];
    }, [maxPage, props.showAllPages, props.page]);
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
                    setMaxPage(data.numPages);
                    setLoaded(true);
                    (_a = props.onLoadSuccess) === null || _a === void 0 ? void 0 : _a.call(props, data);
                    return [2 /*return*/];
            }
        });
    }); }, [props.onLoadSuccess]);
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
    var getSelectedBbox = React.useMemo(function () { return function (page) { return props.activePage === page ? props.activeBboxIndex : undefined; }; }, [props.activeBboxIndex, props.activePage]);
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
        }
    }; }, [pagesByViewport, page, ratioArray]);
    React.useEffect(function () {
        if (page !== props.page) {
            setPage(props.page || 1);
        }
    }, [props.page]);
    React.useEffect(function () {
        setLoaded(false);
        setPagesByViewport([]);
        setRatioArray([]);
        setDefaultHeight(0);
        setDefaultWidth(0);
        setMaxPage(0);
        setPage(1);
    }, [props.file]);
    return (React__default['default'].createElement(reactPdf.Document, { className: "pdf-document", file: props.file, onLoadSuccess: onDocumentLoadSuccess, onLoadError: props.onLoadError, externalLinkTarget: props.externalLinkTarget, error: props.error, loading: props.loading, noData: props.noData, onItemClick: props.onItemClick, rotate: props.rotate }, React.useMemo(function () { return loaded ? shownPages.map(function (page) {
        return React__default['default'].createElement(PdfPage$1, { defaultHeight: defaultHeight, defaultWidth: defaultWidth, key: page, page: page, pageError: props.pageError, inputRef: props.inputRef, height: props.height, width: props.width, pageLoading: props.pageLoading, renderAnnotationLayer: props.renderAnnotationLayer, renderInteractiveForms: props.renderInteractiveForms, renderTextLayer: props.renderTextLayer, scale: props.scale, onPageLoadError: props.onPageLoadError, onPageLoadProgress: props.onPageLoadProgress, onPageLoadSuccess: onPageLoadSuccess, onPageRenderError: props.onPageRenderError, onPageRenderSuccess: props.onPageRenderSuccess, onGetAnnotationsSuccess: props.onGetAnnotationsSuccess, onGetAnnotationsError: props.onGetAnnotationsError, onGetTextSuccess: props.onGetTextSuccess, onGetTextError: props.onGetTextError, onPageInViewport: onPageInViewport, bboxList: bboxMap[page], activeBbox: getSelectedBbox(page), onBboxClick: onBboxClick });
    }) : null; }, [loaded, shownPages, defaultHeight, defaultWidth, bboxMap, props])));
};
var PdfDocument$1 = React.memo(PdfDocument);

var InputSize;
(function (InputSize) {
    InputSize["Sm"] = "32px";
    InputSize["Md"] = "64px";
    InputSize["Lg"] = "128px";
    InputSize["Auto"] = "Auto";
})(InputSize || (InputSize = {}));

___$insertStyle(".viewer-input {\n  outline: none;\n}");

var StyledInput = styled__default['default'].input.withConfig({ displayName: "StyledInput", componentId: "sc-j0wa4t" })(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n  width: ", ";\n"], ["\n  width: ", ";\n"])), function (props) { return props.width; });
var InputControl = function (props) {
    var _a = React.useState(props.defaultValue || ''), value = _a[0], setValue = _a[1];
    var inputRef = React.useRef(null);
    var _b = props.size, size = _b === void 0 ? InputSize.Auto : _b;
    var onChange = React.useCallback(function (e) {
        var _a;
        if (!props.value) {
            setValue(e.target.value);
        }
        (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, e.target.value);
    }, [props.onChange]);
    var onBlur = React.useCallback(function (e) {
        var _a;
        (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, e.target.value);
    }, [props.onBlur]);
    if (props.onEnter) {
        reactUse.useKey('Enter', function () { var _a, _b; return (_a = props.onEnter) === null || _a === void 0 ? void 0 : _a.call(props, ((_b = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _b === void 0 ? void 0 : _b.value) || ''); });
    }
    React.useEffect(function () {
        setValue(props.defaultValue || '');
    }, [props.defaultValue]);
    return (React__default['default'].createElement(StyledInput, { ref: inputRef, onBlur: onBlur, className: "viewer-input", value: props.value || value, width: size, onChange: onChange }));
};
var templateObject_1$2;

___$insertStyle(".viewer-btn {\n  outline: none;\n}");

var ButtonControl = function (props) {
    return (React__default['default'].createElement("button", { disabled: props.disabled, className: "viewer-btn", onClick: props.onClick }, props.children));
};

___$insertStyle(".pdf-toolbar {\n  width: 100%;\n  height: 32px;\n  background: #f9f9fa;\n  box-shadow: 0 1px 0 #cccccc;\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  padding: 0 4px;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.pdf-toolbar__label {\n  color: grey;\n}\n.pdf-toolbar__area > * + * {\n  margin-left: 4px;\n}\n.pdf-toolbar__area_center {\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n}");

var SelectSize;
(function (SelectSize) {
    SelectSize["Sm"] = "32px";
    SelectSize["Md"] = "64px";
    SelectSize["Lg"] = "128px";
    SelectSize["Auto"] = "Auto";
})(SelectSize || (SelectSize = {}));

___$insertStyle(".viewer-select {\n  outline: none;\n}");

var StyledSelect = styled__default['default'].select.withConfig({ displayName: "StyledSelect", componentId: "sc-12i62a3" })(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["\n  width: ", ";\n"], ["\n  width: ", ";\n"])), function (props) { return props.width; });
var SelectControl = function (props) {
    var _a = props.size, size = _a === void 0 ? SelectSize.Md : _a;
    var onChange = React.useCallback(function (e) {
        props.onChange(e.target.value);
    }, []);
    return (React__default['default'].createElement(StyledSelect, { className: "viewer-select", width: size, value: props.value, onChange: onChange }, props.options.map(function (option) {
        return React__default['default'].createElement("option", { key: option.value, value: option.value }, option.label);
    })));
};
var templateObject_1$3;

___$insertStyle(".viewer-checkbox {\n  user-select: none;\n}\n.viewer-checkbox__control {\n  display: none;\n}\n.viewer-checkbox_checked > .viewer-checkbox__label:before, .viewer-checkbox > .viewer-checkbox__label:before {\n  content: \"\";\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  width: 18px;\n  height: 18px;\n  border: 1px solid #dddddd;\n  background-color: #ffffff;\n}\n.viewer-checkbox_checked > .viewer-checkbox__label:before, .viewer-checkbox > .viewer-checkbox__label:before {\n  border-radius: 2px;\n}\n.viewer-checkbox > .viewer-checkbox__label:after {\n  opacity: 0;\n}\n.viewer-checkbox_checked > .viewer-checkbox__label:after {\n  opacity: 1;\n}\n.viewer-checkbox_checked > .viewer-checkbox__label, .viewer-checkbox > .viewer-checkbox__label {\n  position: relative;\n  padding-left: 28px;\n  line-height: 20px;\n  cursor: pointer;\n}\n.viewer-checkbox_checked > .viewer-checkbox__label:after, .viewer-checkbox > .viewer-checkbox__label:after {\n  content: \"\";\n  position: absolute;\n  -webkit-transition: all 0.2s ease;\n  -moz-transition: all 0.2s ease;\n  -o-transition: all 0.2s ease;\n  transition: all 0.2s ease;\n}\n.viewer-checkbox_checked > .viewer-checkbox__label:after, .viewer-checkbox > .viewer-checkbox__label:after {\n  left: 3px;\n  top: 4px;\n  width: 10px;\n  height: 5px;\n  border-radius: 1px;\n  border-left: 4px solid grey;\n  border-bottom: 4px solid grey;\n  -webkit-transform: rotate(-45deg);\n  -moz-transform: rotate(-45deg);\n  -o-transform: rotate(-45deg);\n  -ms-transform: rotate(-45deg);\n  transform: rotate(-45deg);\n}");

var CheckboxControl = function (props) {
    var _a = props.label, label = _a === void 0 ? '' : _a;
    var onChange = React.useCallback(function (e) {
        props.onChange(e.target.checked);
    }, []);
    return (React__default['default'].createElement("div", { className: "viewer-checkbox " + (props.checked ? 'viewer-checkbox_checked' : '') },
        React__default['default'].createElement("label", { className: "viewer-checkbox__label" },
            React__default['default'].createElement("input", { className: "viewer-checkbox__control", type: "checkbox", checked: props.checked, onChange: onChange }),
            label)));
};

var Toolbar = function (props) {
    var _a = props.scale, scale = _a === void 0 ? 1 : _a;
    var _b = React.useContext(ViewerContext), page = _b.page, setPage = _b.setPage, setScrollIntoPage = _b.setScrollIntoPage, maxPage = _b.maxPage, showBboxes = _b.showBboxes, setShowBboxes = _b.setShowBboxes;
    var scaleOptions = React.useMemo(function () {
        return [
            { value: .5, label: '50%' },
            { value: .75, label: '75%' },
            { value: 1, label: '100%' },
            { value: 1.25, label: '125%' },
            { value: 1.5, label: '150%' },
        ];
    }, []);
    var _c = React.useState(page), pageValue = _c[0], setPageValue = _c[1];
    var onNextPage = React.useCallback(function () {
        var _a;
        if (props.showAllPages) {
            setScrollIntoPage(page + 1);
        }
        else {
            setPage(page + 1);
        }
        (_a = props.onPageChange) === null || _a === void 0 ? void 0 : _a.call(props, page + 1);
    }, [page, props.showAllPages, props.onPageChange]);
    var onPrevPage = React.useCallback(function () {
        var _a;
        if (page <= 1) {
            return;
        }
        if (props.showAllPages) {
            setScrollIntoPage(page - 1);
        }
        else {
            setPage(page - 1);
        }
        (_a = props.onPageChange) === null || _a === void 0 ? void 0 : _a.call(props, page - 1);
    }, [page, props.showAllPages, props.onPageChange]);
    var onPageChange = React.useCallback(function (value) {
        var _a;
        if (page !== parseInt(value)) {
            if (props.showAllPages) {
                setScrollIntoPage(parseInt(value));
            }
            else {
                setPage(parseInt(value));
            }
            (_a = props.onPageChange) === null || _a === void 0 ? void 0 : _a.call(props, parseInt(value));
        }
    }, [page]);
    var onScaleChange = React.useCallback(function (value) {
        var _a;
        (_a = props.onScaleChange) === null || _a === void 0 ? void 0 : _a.call(props, parseFloat(value));
    }, []);
    var onShowBboxesChange = React.useCallback(function (checked) {
        setShowBboxes(checked);
    }, []);
    React.useEffect(function () {
        setPageValue(page);
    }, [page]);
    return (React__default['default'].createElement("section", { className: "pdf-toolbar" },
        React__default['default'].createElement("div", { className: "pdf-toolbar__area pdf-toolbar__area_left" },
            React__default['default'].createElement(ButtonControl, { disabled: pageValue < 2, onClick: onPrevPage }, "Prev page"),
            React__default['default'].createElement(ButtonControl, { disabled: pageValue === maxPage, onClick: onNextPage }, "Next page"),
            React__default['default'].createElement(InputControl, { defaultValue: pageValue, size: InputSize.Sm, onBlur: onPageChange, onEnter: onPageChange }),
            React__default['default'].createElement("span", { className: "pdf-toolbar__label" },
                " / ",
                maxPage)),
        React__default['default'].createElement("div", { className: "pdf-toolbar__area pdf-toolbar__area_center" },
            React__default['default'].createElement(SelectControl, { options: scaleOptions, onChange: onScaleChange, value: scale })),
        React__default['default'].createElement("div", { className: "pdf-toolbar__area pdf-toolbar__area_right" },
            React__default['default'].createElement(CheckboxControl, { label: "Show bboxes", onChange: onShowBboxesChange, checked: showBboxes }))));
};
var Toolbar$1 = React.memo(Toolbar);

___$insertStyle("@charset \"UTF-8\";\n.viewer-list-item {\n  height: 50px;\n  width: 100%;\n  margin: 0;\n  cursor: pointer;\n  position: relative;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  flex-direction: column;\n  -webkit-box-align: center;\n  justify-content: center;\n  align-items: flex-start;\n  padding: 0 25px;\n  border-bottom: 1px solid #e0e0e0;\n  box-sizing: border-box;\n}\n.viewer-list-item:hover {\n  box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.1);\n}\n.viewer-list-item_active {\n  box-shadow: inset 0px 0px 3px 1px rgba(255, 69, 0, 0.5) !important;\n}\n.viewer-list-item_opened:after, .viewer-list-item_closed:after {\n  content: \"▼\";\n  position: absolute;\n  right: 0;\n  font-size: 16px;\n  transform: translate(-100%, 0) rotate(180deg);\n  color: grey;\n}\n.viewer-list-item_closed:after {\n  transform: translate(-100%, 0);\n}\n.viewer-list-item__title {\n  margin: 0;\n}\n.viewer-list-item__text {\n  font-size: 14px;\n}");

var ListItem = function (props) {
    var text = props.text, _a = props.title, title = _a === void 0 ? '' : _a, _b = props.isActive, isActive = _b === void 0 ? false : _b, onClick = props.onClick;
    var className = React.useMemo(function () {
        var classList = ['viewer-list-item'];
        if (isActive) {
            classList.push('viewer-list-item_active');
        }
        if (props.children) {
            switch (props.isOpen) {
                case true:
                    classList.push('viewer-list-item_opened');
                    break;
                default:
                    classList.push('viewer-list-item_closed');
                    break;
            }
        }
        return classList.join(' ');
    }, [isActive, props.isOpen]);
    return (React__default['default'].createElement("li", { className: className, onClick: onClick },
        title ? React__default['default'].createElement("h4", { className: "viewer-list-item__title" }, title) : null,
        React__default['default'].createElement("span", { className: "viewer-list-item__text" }, text)));
};

___$insertStyle(".viewer-list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}");

var List = function (props) {
    var _a = props.items, items = _a === void 0 ? [] : _a;
    return React__default['default'].createElement("ul", { className: "viewer-list" }, items.map(function (item, index) { return (React__default['default'].createElement(React__default['default'].Fragment, { key: index },
        React__default['default'].createElement(ListItem, __assign({}, item)),
        item.children && item.isOpen ? item.children.map(function (child, childIndex) {
            return React__default['default'].createElement(ListItem, __assign({}, child, { key: index + '_' + childIndex }));
        }) : null)); }));
};

___$insertStyle(".viewer-bbox-panel {\n  height: 100%;\n  min-width: 300px;\n  overflow: auto;\n  background: #f9f9fa;\n  box-shadow: 1px 0 0 #cccccc;\n}");

var BboxPanel = function (props) {
    var _a = React.useContext(ViewerContext), page = _a.page, setScrollIntoPage = _a.setScrollIntoPage;
    var _b = props.bboxMap, bboxMap = _b === void 0 ? {} : _b;
    var _c = React.useState(0), openedPage = _c[0], setOpenedPage = _c[1];
    var items = React.useMemo(function () {
        var bboxList = [];
        Object.keys(bboxMap || {}).forEach(function (key) {
            var pageNumber = parseInt(key);
            bboxList = __spreadArrays(bboxList, [
                {
                    title: "Page " + pageNumber,
                    text: bboxMap[pageNumber].length + " items",
                    isActive: props.activePage === pageNumber && openedPage !== pageNumber,
                    isOpen: openedPage === pageNumber,
                    onClick: function (e) {
                        e.stopPropagation();
                        setOpenedPage(pageNumber === openedPage ? 0 : pageNumber);
                    },
                    children: bboxMap[key].map(function (bbox, index) {
                        return {
                            text: "" + JSON.stringify(bbox),
                            title: '',
                            isActive: props.activePage === pageNumber && props.activeBboxIndex === index,
                            onClick: function (e) {
                                var _a;
                                e.stopPropagation();
                                if (page !== pageNumber) {
                                    setScrollIntoPage(pageNumber);
                                }
                                (_a = props.onBboxClick) === null || _a === void 0 ? void 0 : _a.call(props, { page: pageNumber, index: index });
                            }
                        };
                    })
                }
            ]);
        });
        return bboxList;
    }, [props.bboxMap, props.activePage, props.activeBboxIndex, page, openedPage]);
    return React__default['default'].createElement("section", { className: "viewer-bbox-panel" },
        React__default['default'].createElement(List, { items: items }));
};

___$insertStyle(".pdf-viewer {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  position: relative;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n}\n.pdf-viewer__header {\n  width: 100%;\n  position: sticky;\n  top: 0;\n  z-index: 1000;\n}\n.pdf-viewer__content {\n  display: flex;\n  flex-direction: row;\n  flex: 1;\n  width: 100%;\n  overflow: auto;\n  position: relative;\n}\n.pdf-viewer__document-section {\n  overflow: auto;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n}");

var App = function (props) {
    var _a = props.className, className = _a === void 0 ? '' : _a, _b = props.withToolbar, withToolbar = _b === void 0 ? false : _b, _c = props.withSidePanel, withSidePanel = _c === void 0 ? false : _c, pdfProps = __rest(props, ["className", "withToolbar", "withSidePanel"]);
    return (React__default['default'].createElement(ViewerProvider, null,
        React__default['default'].createElement("div", { className: "pdf-viewer " + className },
            withToolbar ? (React__default['default'].createElement("header", { className: "pdf-viewer__header" },
                React__default['default'].createElement(Toolbar$1, { onPageChange: props.onPageChange, showAllPages: props.showAllPages, scale: props.scale, onScaleChange: props.onScaleChange }))) : null,
            React__default['default'].createElement("section", { className: "pdf-viewer__content" },
                withSidePanel ?
                    React__default['default'].createElement(BboxPanel, { bboxMap: props.bboxMap, activeBboxIndex: props.activeBboxIndex, activePage: props.activePage, onBboxClick: props.onBboxClick }) : null,
                React__default['default'].createElement("section", { className: "pdf-viewer__document-section" },
                    React__default['default'].createElement(PdfDocument$1, __assign({}, pdfProps)))))));
};

exports.default = App;
//# sourceMappingURL=index.js.map
