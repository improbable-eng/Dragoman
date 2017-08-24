import * as React from 'react';
import * as ReactMD from 'react-md';

// import MonacoEditor from 'react-monaco-editor';
import MonacoEditor from './reactMonacoEditor';

export interface IResponseViewerProps {
    response: string;
    serviceMethodIdentifier?: string;
    serverStreaming?: boolean;
}

export default function ResponseViewer({ response, serviceMethodIdentifier, serverStreaming }: IResponseViewerProps) {
    return (
        <ReactMD.Card style={{ width: '50%', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <ReactMD.CardTitle
                    title='Response Viewer'
                    subtitle={serviceMethodIdentifier}
                    style={{ padding: 24 }}
                />
                <ReactMD.Button
                        icon={true}
                        tooltipLabel={serverStreaming !== undefined ?
                            (serverStreaming ? 'streaming response' : 'unary response')
                            : ''}
                        tooltipPosition='right'
                    >
                        {serverStreaming !== undefined ?
                            (serverStreaming ? 'more_horiz' : 'lens')
                            : ''}
                </ReactMD.Button>
            </div>
            <div style={{height: 3}}/>
            <ReactMD.Card className='md-block-centered'>
                <MonacoEditor
                    language='json'
                    theme='vs'
                    height='500'
                    value={response}
                    options={{ wordWrap: true, readOnly: true }}
                />
            </ReactMD.Card>
        </ReactMD.Card>
    );
}
