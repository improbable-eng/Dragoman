import * as React from 'react';
import { Button, Card, CardActions, CardText, CardTitle } from 'react-md';

import MonacoEditor from './reactMonacoEditor';
import { ResponseViewerState } from '../reducers/responseViewer';

const sharedStyles = require('./sharedRequestResponse.css');
const styles = require('./responseViewer.css');

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
        <Card className={sharedStyles.card}>
            <div className={sharedStyles['card-title-container']}>
                <CardTitle
                    title='Response Viewer'
                    subtitle={fullMethod}
                    className={sharedStyles['card-title']}
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
            <div className={sharedStyles['div-spacer']} />
            <Card className='md-block-centered'>
                <MonacoEditor
                    language='json'
                    theme='vs'
                    height='500'
                    value={responseViewerState.response}
                    // TODO: Remove automaticLayout option. This is not great for performance. Every 100ms
                    // the monaco-editor component will update itself. This is necessary as currently without
                    // this option the editor does not update when it's container resizes.
                    options={{ wordWrap: 'on', readOnly: true, automaticLayout: true }}
                    requireConfig={{
                        url: (process.env.NODE_ENV === 'production') ?
                            `./dist/monaco-editor/min/vs/loader.js` :
                            './dist/monaco-editor/dev/vs/loader.js',
                    }}
                />
            </Card>
            <div className={sharedStyles['card-title-container']}>
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
                children={<div className={styles['log-viewer']}>{responseViewerState.logs.map((log, index) => {
                    return <p key={index}>{log}</p>;
                })}</div>}
            />
        </Card>
    );
}
