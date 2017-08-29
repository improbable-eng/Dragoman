import { isActionOfType, Action } from '../actions/actions';
import * as ResponseViewerActions from '../actions/responseViewer';

export type ResponseViewerState = Readonly<{
    responseBody: string;
    serverStreamingResponse?: boolean;
}>;

const initialResponseViewerState: ResponseViewerState = {
   responseBody: '',
   serverStreamingResponse: undefined,
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

    return state;
}
