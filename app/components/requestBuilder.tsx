import * as React from 'react';
import * as ReactMD from 'react-md';

import MonacoEditor from './reactMonacoEditor';
import { RequestBuilderState } from '../reducers/requestBuilder';

const styles = require('./requestBuilder.scss');
const sharedStyles = require('./sharedRequestResponse.scss');

export type RequestBuilderComponentProps = RequestBuilderComponentState & RequestBuilderComponentMethods;

export interface RequestBuilderComponentState {
    requestBuilderState: RequestBuilderState;
}

export interface RequestBuilderComponentMethods {
    handleRunClick: () => void;
    handleRequestChange: (newValue: string) => void;
    handleCancelClick: () => void;
}

export default function RequestBuilder({ requestBuilderState, handleRunClick,
    handleRequestChange, handleCancelClick }: RequestBuilderComponentProps) {
    return (
        <ReactMD.Card className={sharedStyles.card} >
            <div className={sharedStyles['card-title-container']}>
                <ReactMD.CardActions
                >
                    {!requestBuilderState.callRequestInProgress ?
                        <ReactMD.Button
                            icon={true}
                            secondary={true}
                            swapTheming={true}
                            onClick={handleRunClick}
                            tooltipLabel='Send Request'
                            tooltipPosition='bottom'
                            children='play_arrow'
                        />
                        :
                        <ReactMD.Button
                            icon={true}
                            onClick={handleCancelClick}
                            className={styles['cancel-card-button']}
                            tooltipLabel='Cancel Request'
                            tooltipPosition='bottom'
                            children='clear'
                        />
                    }
                </ReactMD.CardActions>
                <ReactMD.CardTitle
                    title='Request Builder'
                    subtitle={requestBuilderState.fullMethod}
                    className={sharedStyles['card-title']}
                />
                <ReactMD.Button
                    icon={true}
                    tooltipLabel={requestBuilderState.clientStreaming !== undefined ?
                        (requestBuilderState.clientStreaming ? 'streaming request' : 'unary request')
                        : ''}
                    tooltipPosition='right'
                >
                    {requestBuilderState.clientStreaming !== undefined ?
                        (requestBuilderState.clientStreaming ? 'more_horiz' : 'lens')
                        : ''}
                </ReactMD.Button>
            </div>
            {requestBuilderState.callRequestInProgress ?
                <ReactMD.LinearProgress id='callRequestProgress' className={styles['linear-progress']}/> :
                <div className={sharedStyles['div-spacer']} />}
            <ReactMD.Card className='md-block-centered'>
                <MonacoEditor
                    language='json'
                    theme='vs'
                    height='500'
                    onChange={(val: string) => handleRequestChange(val)}
                    value={requestBuilderState.request}
                    // TODO: Remove automaticLayout option. This is not great for performance. Every 100ms
                    // the monaco-editor component will update itself. This is necessary as currently without
                    // this option the editor does not update when it's container resizes.
                    options={{ wordWrap: 'on', automaticLayout: true }}
                    requireConfig={{
                        url: (process.env.NODE_ENV === 'production') ?
                            `./dist/monaco-editor/min/vs/loader.js` :
                            './dist/monaco-editor/dev/vs/loader.js',
                    }}
                />
            </ReactMD.Card>
        </ReactMD.Card>
    );
}
