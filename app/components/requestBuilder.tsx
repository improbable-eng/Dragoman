import * as React from 'react';
import * as ReactMD from 'react-md';

import { AppUIState } from '../types/index';
import MonacoEditor from './reactMonacoEditor';
import { CallServiceOptions } from '../types/index';

export interface IRequestBuilderProps {
    callServiceOptions: CallServiceOptions;
    appUIState: AppUIState;
    handleRunClick: () => void;
    handleRequestChange: (newValue: string) => void;
    handleCancelClick: () => void;
}

export default function RequestBuilder({callServiceOptions, appUIState, handleRunClick,
    handleRequestChange, handleCancelClick}: IRequestBuilderProps) {
        return (
            <ReactMD.Card style={{ width: '50%', padding: '20px' }} >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ReactMD.CardActions
                    >
                        {!appUIState.callRequestInProgress ?
                            <ReactMD.Button
                                icon={true}
                                secondary={true}
                                swapTheming={true}
                                onClick={handleRunClick}
                                style={{ marginRight: 'auto' }}
                                tooltipLabel='Send Request'
                                tooltipPosition='bottom'
                            >
                                play_arrow
                            </ReactMD.Button>
                            :
                            <ReactMD.Button
                                icon={true}
                                onClick={handleCancelClick}
                                style={{ marginRight: 'auto', backgroundColor: '#EF9A9A' }}
                                tooltipLabel='Cancel Request'
                                tooltipPosition='bottom'
                            >
                                clear
                            </ReactMD.Button>}
                    </ReactMD.CardActions>
                    <ReactMD.CardTitle
                        title='Request Builder'
                        subtitle={callServiceOptions.fullMethod}
                        style={{ padding: 24 }}
                    />
                    <ReactMD.Button
                        icon={true}
                        tooltipLabel={appUIState.clientStreaming !== undefined ?
                            (appUIState.clientStreaming ? 'streaming request' : 'unary request')
                            : ''}
                        tooltipPosition='right'
                    >
                        {appUIState.clientStreaming !== undefined ?
                            (appUIState.clientStreaming ? 'more_horiz' : 'lens')
                            : ''}
                    </ReactMD.Button>
                </div>
                {appUIState.callRequestInProgress ?
                <ReactMD.LinearProgress id='callRequestProgress' style={{margin: 0}}/> :
                <div style={{height: 3}}/>}
                <ReactMD.Card className='md-block-centered'>
                    <MonacoEditor
                        language='json'
                        theme='vs'
                        onChange={(val: string) => handleRequestChange(val)}
                        height='500'
                        value={callServiceOptions.jsonBody}
                        // options={{ wordWrap: true }}
                        requireConfig={{url: (process.env.NODE_ENV === 'production') ?
                        `file:///${__dirname}/dist/monaco-editor/min/vs/loader.js` :
                        './dist/monaco-editor/dev/vs/loader.js',
                        }}
                    />
                </ReactMD.Card>
            </ReactMD.Card>
        );
    }
