import * as React from 'react';
import { Button, Card, CardActions, CardText, CardTitle } from 'react-md';

import MonacoEditor from './reactMonacoEditor';
import { ResponseViewerState } from '../reducers/responseViewer';

export interface ResponseViewerComponentState {
    responseViewerState: ResponseViewerState;
    fullMethod: string;
}

export interface ResponseViewerComponentMethods {
    clearLogs: () => void;
}

export type ResponseViewerComponentProps = ResponseViewerComponentState & ResponseViewerComponentMethods;


export default function ResponseViewer({ responseViewerState, fullMethod, clearLogs }: ResponseViewerComponentProps) {
    return (
        <Card style={{ width: '50%', padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <CardTitle
                    title='Response Viewer'
                    subtitle={fullMethod}
                    style={{ padding: 24 }}
                />
                <Button
                    icon={true}
                    tooltipLabel={responseViewerState.serverStreamingResponse !== undefined ?
                        (responseViewerState.serverStreamingResponse ? 'streaming response' : 'unary response')
                        : ''}
                    tooltipPosition='right'
                >
                    {responseViewerState.serverStreamingResponse !== undefined ?
                        (responseViewerState.serverStreamingResponse ? 'more_horiz' : 'lens')
                        : ''}
                </Button>
            </div>
            <div style={{ height: 3 }} />
            <Card className='md-block-centered'>
                <MonacoEditor
                    language='json'
                    theme='vs'
                    height='500'
                    value={responseViewerState.response}
                    options={{ wordWrap: 'on', readOnly: true, automaticLayout: true }}
                    requireConfig={{
                        url: (process.env.NODE_ENV === 'production') ?
                            `./dist/monaco-editor/min/vs/loader.js` :
                            './dist/monaco-editor/dev/vs/loader.js',
                    }}
                />
            </Card>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <CardActions
                >
                        <Button
                            icon={true}
                            secondary={true}
                            swapTheming={true}
                            onClick={clearLogs}
                            tooltipLabel='Clear Logs'
                            tooltipPosition='bottom'
                            children='clear_all'
                        />
                </CardActions>
                <CardTitle
                    title='Logs'
                />
            </div>
            <CardText
                children={<div style={{overflowY: 'scroll', height: 200}}>{responseViewerState.logs.map((log, index) => {
                    return <p key={index}>{log}</p>;
                })}</div>}
            />
        </Card>
    );
}
