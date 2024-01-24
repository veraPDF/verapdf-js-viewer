# Verapdf-js-viewer

Display pdf with opportunity of bounding boxes selection

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](LICENSE.MPL)

### Compatibility

#### React

To use the latest version of Verapdf-js-viewer, your project needs to use React 16.3 or later.

#### Internet Explorer

Internet Explorer is not supported in Verapdf-js-viewer. Use Edge instead

### Usage

Here's an example of basic usage:

```js
import React, { useState } from 'react';
import PdfViewer from 'verapdf-js-viewer';

function MyApp() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <PdfViewer
        file="somefile.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      />
      <p>Page {pageNumber} of {numPages}</p>
    </div>
  );
}
```

## Input parameters

|Prop name|Description|Default value| Example values                                                                                                                                                                                                                                                                                                    |
|----|----|----|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|<b>Document props</b>|
|className|Class name(s) that will be added to rendered element.|n/a| `"custom-class-name-1 custom-class-name-2"`                                                                                                                                                                                                                                                                       |
|file|What PDF should be displayed.<br />Its value can be an URL, a file (imported using `import ... from ...` or from file input form element), or an object with parameters (`url` - URL; `data` - data, preferably Uint8Array; `range` - PDFDataRangeTransport; `httpHeaders` - custom request headers, e.g. for authorization), `withCredentials` - a boolean to indicate whether or not to include cookies in the request (defaults to `false`).<br />**Warning**: Since equality check (`===`) is used to determine if `file` object has changed, it must be memoized by setting it in component's state, `useMemo` or other similar technique.|n/a| <ul><li>URL:<br />`"http://example.com/sample.pdf"` </li><li>File:<br />`import sample from '../static/sample.pdf'` and then<br />`sample`</li><li>Parameter object:<br />`{ url: 'http://example.com/sample.pdf', httpHeaders: { 'X-CustomHeader': '40359820958024350238508234' }, withCredentials: true }`</ul> |
|bboxes|Array of bboxes `[ {location, groupId, bboxTitle, isVisible} ]` that will be rendered as selectable rectangles over pdf pages.<br /><br />`isVisible` is an optional flag that specifies whether bbox should be shown on the canvas (default value: true).<br /><br />Bboxes can be grouped by optional parameter `groupId`. If error's check has 3rd item (2nd index) of `errorArguments`, it can be grouped with other checks with the same id from `check.errorArguments[2]` (`'${clause}-${testNumber}-${check.errorArguments[2]}'` => `4.1.2-9-79`)<br />`bboxTitle` is an optional parameter that is set to `title` and `aria-describedby` bounding box attributes. <br /><br />Currently support these locations:<br /><ul><li>JSON string of bbox object: `{"bbox":[{"p":1,"rect":[x,y,x2,y2]}]}`</li><li>String with coordinates for left-bottom point and top-right:`pages[1-2]/boundingBox[x,y,x2,y2]`</li><li>String path through tagged structure tree: `root/document[0]/pages[1](1 0 obj PDPage)/annots[1](100 0 obj PDLinkAnnot)`</li><li>String path to glyph in page stream: `root/document[0]/pages[0](14 0 obj PDPage)/contentStream[0](20 0 obj PDSemanticContentStream)/operators[6]/usedGlyphs[5](OPCPIB+TimesNewRomanPSMT OPCPIB+TimesNewRomanPSMT 32 0 56991387 0)`</li></ul> New contexts will be added.|n/a| `[{  groupId: '4.1.2-9-79', location: 'pages[2-4]/boundingBox[10,200,300,400]' }]`                                                                                                                                                                                                                                |
|activeBboxIndex|Index of active bbox from bboxes array|n/a| `0`                                                                                                                                                                                                                                                                                                               |
|activeBboxId|Id of active tree bbox|n/a| `"0:3:11:0"`                                                                                                                                                                                                                                                                                                               |
|showAllPages|Boolean flag to show pdf with all pages with scroll or single page|false| `true`                                                                                                                                                                                                                                                                     
|isTreeBboxesVisible|Boolean flag to show tree bboxes|false| `true`                                              
|error|What the component should display in case of an error.|`"Failed to load PDF file."`| <ul><li>String:<br />`"An error occurred!"`</li><li>React element:<br />`<div>An error occurred!</div>`</li><li>Function:<br />`this.renderError`</li></ul>                                                                                                                                                       |
|externalLinkTarget|Link target for external links rendered in annotations.|unset, which means that default behavior will be used| One of valid [values for `target` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes). <ul><li>`"_self"`</li><li>`"_blank"`</li><li>`"_parent"`</li><li>`"_top"`</li></ul>                                                                                                         
|loading|What the component should display while loading.|`"Loading PDF…"`| <ul><li>String:<br />`"Please wait!"`</li><li>React element:<br />`<div>Please wait!</div>`</li><li>Function:<br />`this.renderLoader`</li></ul>                                                                                                                                                                  |
|noData|What the component should display in case of no data.|`"No PDF file specified."`| <ul><li>String:<br />`"Please select a file."`</li><li>React element:<br />`<div>Please select a file.</div>`</li><li>Function:<br />`this.renderNoData`</li></ul>                                                                                                                                                |
|rotate|Rotation of the document in degrees. If provided, will change rotation globally, even for the pages which were given `rotate` prop of their own. `90` = rotated to the right, `180` = upside down, `270` = rotated to the left.|n/a| `90`                                                                                                                                                                                                                                                                                                              |
|onLoadSuccess|Function called when the document is successfully loaded.|n/a| `(pdf) => alert('Loaded a file with ' + pdf.numPages + ' pages!')`                                                                                                                                                                                                                                                |
|onLoadError|Function called in case of an error while loading a document.|n/a| `(error) => alert('Error while loading document! ' + error.message)`                                                                                                                                                                                                                                              |
|onItemClick|Function called when an outline item has been clicked. Usually, you would like to use this callback to move the user wherever they requested to.|n/a| `({ pageNumber }) => alert('Clicked an item from page ' + pageNumber + '!')`                                                                                                                                                                                                                                      |
|onBboxClick|Function called when an bbox item has been clicked.|n/a| `(bboxData) => alert('Selected bbox from ' + bboxData.page + ' page!')`                                                                                                                                                                                                                                           |
|onPageChange|Function called when page changed during scrolling|n/a| `(page: number) => alert('New page ' + page);`                                                                                                                                                                                                                                                                    |
|onWarning|Function called in case of a warning for the selected bounding box. The warning is described by the code from the list: <br /> <ul><li>`BBOX_OUT_OF_THE_PAGE_VIEWPORT` (selected bounding box is out of the page viewport)</li></ul>|n/a| `(warningCode: string) => alert('Warning: ' + warningCode);`                                                                                                                                                                                                                                                      |
|<b>Page props</b>|
|page|Which page from PDF file should be displayed, by page number. In case `showAllPages={true}` autoscroll to provided page|`1`| `2`                                                                                                                                                                                                                                                                                                               |
|inputRef|A prop that behaves like [ref](https://reactjs.org/docs/refs-and-the-dom.html), but it's passed to main `<div>` rendered by `<Page>` component.|n/a| <ul><li>Function:<br />`(ref) => { this.myPage = ref; }`</li><li>Ref created using `React.createRef`:<br />`this.ref = React.createRef();`<br />…<br />`inputRef={this.ref}`</li><li>Ref created using `React.useRef`:<br />`const ref = React.useRef();`<br />…<br />`inputRef={ref}`</li></ul>                  |
|pageError|What the component should display in case of an error.|`"Failed to load the page."`| <ul><li>String:<br />`"An error occurred!"`</li><li>React element:<br />`<div>An error occurred!</div>`</li><li>Function:<br />`this.renderError`</li></ul>                                                                                                                                                       |
|height|Page height. If neither `height` nor `width` are defined, page will be rendered at the size defined in PDF. If you define `width` and `height` at the same time, `height` will be ignored. If you define `height` and `scale` at the same time, the height will be multiplied by a given factor.|Page's default height| `300`                                                                                                                                                                                                                                                                                                             |
|width|Page width. If neither `height` nor `width` are defined, page will be rendered at the size defined in PDF. If you define `width` and `height` at the same time, `height` will be ignored. If you define `width` and `scale` at the same time, the width will be multiplied by a given factor.|Page's default width| `300`                                                                                                                                                                                                                                                                                                             |
|pageLoading|What the component should display while loading.|`"Loading page…"`| <ul><li>String:<br />`"Please wait!"`</li><li>React element:<br />`<div>Please wait!</div>`</li><li>Function:<br />`this.renderLoader`</li></ul>                                                                                                                                                                  |
|renderAnnotationLayer|Whether annotations (e.g. links) should be rendered.|`true`| `false`                                                                                                                                                                                                                                                                                                           |
|renderInteractiveForms|Whether interactive forms should be rendered. `renderAnnotationLayer` prop must be set to `true`.|`false`| `true`                                                                                                                                                                                                                                                                                                            |
|renderTextLayer|Whether a text layer should be rendered.|`true`| `false`                                                                                                                                                                                                                                                                                                           |
|scale|Page scale.|`1.0`| `0.5`                                                                                                                                                                                                                                                                                                             |
|onPageLoadError|Function called in case of an error while loading the page.|n/a| `(error) => alert('Error while loading page! ' + error.message)`                                                                                                                                                                                                                                                  |
|onPageLoadProgress|Function called, potentially multiple times, as the loading progresses.|n/a| `({ loaded, total }) => alert('Loading a document: ' + (loaded / total) * 100 + '%');`                                                                                                                                                                                                                            |
|onPageLoadSuccess|Function called when the page is successfully loaded.|n/a| `(page) => alert('Now displaying a page number ' + page.pageNumber + '!')`                                                                                                                                                                                                                                        |
|onPageRenderError|Function called in case of an error while rendering the page.|n/a| `(error) => alert('Error while loading page! ' + error.message)`                                                                                                                                                                                                                                                  |
|onPageRenderSuccess|Function called when the page is successfully rendered on the screen.|n/a| `() => alert('Rendered the page!')`                                                                                                                                                                                                                                                                               |
|onBboxesParsed|Function called after bboxes were parsed and returns array of pages.|n/a| `(pages) => console.log(pages)`                                                                                                                                                                                                                                                                                   |
|onGetAnnotationsSuccess|Function called when annotations are successfully loaded.|n/a| `(annotations) => alert('Now displaying ' + annotations.length + ' annotations!')`                                                                                                                                                                                                                                |
|onGetAnnotationsError|Function called in case of an error while loading annotations.|n/a| `(error) => alert('Error while loading annotations! ' + error.message)`                                                                                                                                                                                                                                           |
|onGetTextSuccess|Function called when text layer items are successfully loaded.|n/a| `({ items }) => alert('Now displaying ' + items.length + ' text layer items!')`                                                                                                                                                                                                                                   |
|onGetTextError|Function called in case of an error while loading text layer items.|n/a| `(error) => alert('Error while loading text layer items! ' + error.message)`                                                                                                                                                                                                                                      |
|onSelectBbox|Function that is called when the bbox is selected by keypress handlers.|n/a| `(index) => alert('Select bounding box with index: ' + index)`                                                                                                                                                                                                                                                    |
|<b>Bbox props</b>|
|colorScheme|Set custom colors for bbox|```{ border?: string; borderSelected?: string; borderRelated?: string; borderStructured?: string; borderStructuredSelected?: string; borderHovered?: string; borderStructuredHovered?: string; background?: string; backgroundSelected?: string; backgroundHovered?: string; backgroundRelated?: string; backgroundStructured?: string; backgroundStructuredSelected?: string;}```| n/a                                                                                                                                                                                                                                                                                                               |

## Shortcuts

Bounding box selection (see `onSelectBbox` prop):
- `Ctrl/⌘ + Up Arrow` - select next bounding box
- `Ctrl/⌘ + Down Arrow` - select previous bounding box

Page scrolling:
- `Up Arrow` - scroll up
- `Down Arrow` - scroll down
- `Right Arrow` - scroll to next page
- `Left Arrow` - scroll to previous page

## Useful links

* [React-PDF](https://github.com/wojtekmaj/react-pdf)
