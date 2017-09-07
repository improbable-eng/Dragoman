import { isActionOfType, Action } from '../actions/actions';
import * as ResponseViewerActions from '../actions/responseViewer';

export type ResponseViewerState = Readonly<{
    response: string;
    serverStreamingResponse?: boolean;
    logs: string[];
}>;

export const initialResponseViewerState: ResponseViewerState = {
   response: '',
   serverStreamingResponse: undefined,
   logs: [],
};

export default function responseViewerReducer(state: ResponseViewerState = initialResponseViewerState, action: Action<any>): ResponseViewerState {

    if (isActionOfType(action, ResponseViewerActions.setResponse)) {
        return {
            ...state,
            response: action.payload,
        };
    }

    if (isActionOfType(action, ResponseViewerActions.setServerStreamingResponse)) {
        return {
            ...state,
            serverStreamingResponse: action.payload,
        };
    }

    if (isActionOfType(action, ResponseViewerActions.appendLog)) {
        return {
            ...state,
            logs: [...state.logs, action.payload],
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
