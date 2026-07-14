import PdfViewer from '@duallab/verapdf-js-viewer';
import {useState, useEffect, useCallback, useMemo} from "react";

import InfoPane from "./InfoPane/InfoPane.jsx";

import './App.css';

import defaultSample from "./assets/PDFUA-in-a-Nutshell-PDFUA.pdf";

function App() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [file, setFile] = useState(defaultSample);
    const [activeBboxId, setActiveBboxId] = useState('');
    const [activeIndex, setIndex] = useState(null);
    const [structureTree, setStructureTree] = useState({});
    const [documentInfo, setDocumentInfo] = useState({});
    const [nodePath, setNodePath] = useState(null);
    const bboxes = useMemo(() => ([]), []);
    const activeBboxIdData = useMemo(() => ({ id: activeBboxId, zoom: false }), [activeBboxId]);
    const activeBboxIndexData = useMemo(() => ({ index: activeIndex, zoom: false }), [activeIndex]);

    const onDocumentLoadSuccess = useCallback((document) => {
        setNumPages(document.numPages);
        document.getMetadata().then(({info}) => {
            setDocumentInfo(info);
        });
        setStructureTree(document._pdfInfo.structureTree);
    }, []);

    const onFileSelected = (e) => {
        setFile(e.target.files[0]);
    }
    const onPageChange = (pageNumber) => {
        setPageNumber(pageNumber);
    }
    const onBboxSelect = useCallback((data) => {
        if (data && data.id) {
            if (activeBboxId !== data.id) {
                setActiveBboxId(data.id);
                setIndex(data.index);
            }
        } else {
            setActiveBboxId('');
            setIndex(null);
        }
    }, [activeIndex, activeBboxId]);

    useEffect(() => {
        if (activeBboxId) {
            const nodeIds = activeBboxId.split(':');
            let node = [structureTree];
            const nodePath = [];
            nodeIds.forEach((id) => {
                nodePath.push(node[id].name);
                node = Array.isArray(node[id].children) ? node[id].children : [node[id].children];
            });
            setNodePath(nodePath);
        } else {
            setNodePath(null);
        }
    }, [structureTree, activeBboxId]);

    return (
        <div className="app-container">
            <header>
                <p>
                    @duallab/verapdf-js-viewer
                </p>
            </header>
            <div className="content-wrapper">
                <InfoPane documentInfo={documentInfo} numPages={numPages} nodePath={nodePath}/>
                <div className="pdf-container-wrapper">
                    <PdfViewer
                        className="pdf-container"
                        scale={1}
                        file={file}
                        showAllPages
                        externalLinkTarget="_blank"
                        onLoadSuccess={onDocumentLoadSuccess}
                        treeBboxSelectionMode="SELECTED_WITH_KIDS"
                        isTreeBboxesVisible
                        onPageChange={onPageChange}
                        renderTextLayer={false}
                        activeBboxId={activeBboxIdData}
                        activeBboxIndex={activeBboxIndexData}
                        onBboxClick={onBboxSelect}
                        onSelectBbox={onBboxSelect}
                        page={pageNumber}
                        bboxes={bboxes}
                    />
                </div>
            </div>
            <footer>
                <p>Page {pageNumber} of {numPages}</p>
            </footer>
        </div>
    );
}

export default App;
