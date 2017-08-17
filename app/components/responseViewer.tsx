import * as React from "react";
import * as ReactMD from "react-md";

// import MonacoEditor from "react-monaco-editor";
import MonacoEditor from "./reactMonacoEditor";

export interface IResponseViewerProps {
    response: string;
    serviceMethodIdentifier?: string;
}

export function ResponseViewer({ response, serviceMethodIdentifier }: IResponseViewerProps) {
    return (
        <ReactMD.Card style={{ width: "50%", padding: "20px" }}>
            <ReactMD.CardTitle
                title="Response Viewer"
                subtitle={serviceMethodIdentifier}
            />
            <ReactMD.Card className="md-block-centered">
                <MonacoEditor
                    language="json"
                    theme="vs"
                    height="500"
                    value={response}
                    options={{ wordWrap: true, readOnly: true }}
                />
            </ReactMD.Card>
        </ReactMD.Card>
    );
}

export default ResponseViewer;
