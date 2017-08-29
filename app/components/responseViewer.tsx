import * as React from 'react';
import * as ReactMD from 'react-md';

// import MonacoEditor from 'react-monaco-editor';
import MonacoEditor from './reactMonacoEditor';
import { ResponseViewerState } from '../reducers/responseViewer';

export interface IResponseViewerProps {
    responseViewerState: ResponseViewerState;
    fullMethod: string;
}

export default function ResponseViewer({ responseViewerState, fullMethod }: IResponseViewerProps) {
    return (
        <ReactMD.Card style={{ width: '50%', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <ReactMD.CardTitle
                    title='Response Viewer'
                    subtitle={fullMethod}
                    style={{ padding: 24 }}
                />
                <ReactMD.Button
                        icon={true}
                        tooltipLabel={responseViewerState.serverStreamingResponse !== undefined ?
                            (responseViewerState.serverStreamingResponse ? 'streaming response' : 'unary response')
                            : ''}
                        tooltipPosition='right'
                    >
                        {responseViewerState.serverStreamingResponse !== undefined ?
                            (responseViewerState.serverStreamingResponse ? 'more_horiz' : 'lens')
                            : ''}
                </ReactMD.Button>
            </div>
            <div style={{height: 3}}/>
            <ReactMD.Card className='md-block-centered'>
                <MonacoEditor
                    language='json'
                    theme='vs'
                    height='500'
                    value={responseViewerState.responseBody}
                    options={{ wordWrap: true, readOnly: true }}
                    requireConfig={{url: (process.env.NODE_ENV === 'production') ?
                        `./dist/monaco-editor/min/vs/loader.js` :
                        './dist/monaco-editor/dev/vs/loader.js',
                        }}
                />
            </ReactMD.Card>
        </ReactMD.Card>
    );
}
