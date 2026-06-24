import './InfoPane.css';

function InfoPane({ documentInfo, numPages, nodePath }) {
    return (
        <div className="info-pane">
            <InfoItem label="Document title" value={documentInfo?.Title}/>
            <InfoItem label="Number of pages" value={numPages}/>
            <InfoItem label="Selected element" value={(nodePath || []).at(-1)}/>
            <InfoItem label="Structure tree path" value={(nodePath || []).join(" > ")}/>
        </div>
    )
}

function InfoItem({ label, value }) {
    return (
        <div className="info-item">
            <div className="label">{label}</div>
            <div>{value || "-"}</div>
        </div>
    )
}

export default InfoPane;