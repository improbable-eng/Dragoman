import * as React from 'react';
import * as ReactMD from 'react-md';

import AceEditor from 'react-ace';
import 'brace/theme/xcode';

export interface ResponseViewerProps {
    response: string;
    serviceMethodIdentifier?: string;
}

export function ResponseViewer({response, serviceMethodIdentifier}: ResponseViewerProps) {
    return (
        <ReactMD.Card style={{ width: '50%', padding: '20px' }}>
            <ReactMD.CardTitle
                title="Response Viewer"
                subtitle={serviceMethodIdentifier}
            />
            <ReactMD.Card className="md-block-centered">
                <AceEditor
                    mode="text"
                    theme="xcode"
                    name="RESPONSE_VIEWER"
                    editorProps={{ $blockScrolling: true }}
                    width="auto"
                    readOnly={true}
                    value={response}
                />
            </ReactMD.Card>
        </ReactMD.Card>
    );
}

export default ResponseViewer;