import responseViewerReducer, { initialResponseViewerState } from '../../app/reducers/responseViewer';
import * as responseViewerActions from '../../app/actions/responseViewer';

describe('request builder reducer', () => {
    it('should handle initial state', () => {
        expect(responseViewerReducer(undefined, { type: 'UNKNOWN', payload: {} })).toEqual(initialResponseViewerState);
    });

    it('should handle SET_RESPONSE', () => {
        expect(responseViewerReducer(undefined, responseViewerActions.setResponse('response')).response).toEqual('response');
    });

    it('should handle SET_SERVER_STREAMING_RESPONSE', () => {
        expect(responseViewerReducer(undefined, responseViewerActions.setServerStreamingResponse(true)).serverStreamingResponse).toEqual(true);
    });

    it(`should handle APPEND_LOG`, () => {
        const state1Logs = responseViewerReducer(undefined, responseViewerActions.appendLog('log1')).logs;
        expect(responseViewerReducer({...initialResponseViewerState, logs: state1Logs}, responseViewerActions.appendLog('log2')).logs).toEqual(['log1', 'log2']);

    });

    it('should handle CLEAR_LOGS', () => {
        expect(responseViewerReducer({...initialResponseViewerState, logs: ['log']}, responseViewerActions.clearLogs()).logs).toEqual([]);
    });
});
