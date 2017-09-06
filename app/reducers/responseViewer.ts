import { isActionOfType, Action } from '../actions/actions';
import * as ResponseViewerActions from '../actions/responseViewer';

export type ResponseViewerState = Readonly<{
    responseBody: string;
    serverStreamingResponse?: boolean;
    logs: string;
}>;

const initialResponseViewerState: ResponseViewerState = {
   responseBody: '',
   serverStreamingResponse: undefined,
   logs: '',
};

export default function responseViewerReducer(state: ResponseViewerState = initialResponseViewerState, action: Action<any>): ResponseViewerState {

    if (isActionOfType(action, ResponseViewerActions.setResponse)) {
        return {
            ...state,
            responseBody: action.payload,
        };
    }

    if (isActionOfType(action, ResponseViewerActions.setServerStreamingResponse)) {
        return {
            ...state,
            serverStreamingResponse: action.payload,
        };
    }

    if (isActionOfType(action, ResponseViewerActions.appendLogs)) {
        return {
            ...state,
            logs: state.logs + action.payload,
        };
    }

    if (isActionOfType(action, ResponseViewerActions.clearLogs)) {
        return {
            ...state,
            logs: initialResponseViewerState.logs,
        };
    }

    return state;
}
