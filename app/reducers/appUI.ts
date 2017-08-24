import { isActionOfType, Action } from '../actions/actions';
import * as AppUIActions from '../actions/appUI';

export type AppUIState = Readonly<{
    errorDialogVisible: boolean;
    errorDialogTitle: string;
    errorDialogExplanation: string;
    callRequestInProgress: boolean;
    clientStreaming?: boolean;
    serverStreaming?: boolean;
}>;

const initialAppUIState: AppUIState = {
    errorDialogVisible: false,
    errorDialogTitle: '',
    errorDialogExplanation: '',
    callRequestInProgress: false,
    clientStreaming: undefined,
    serverStreaming: undefined,
};

export default function uiSettings(state: AppUIState = initialAppUIState, action: Action<any>): AppUIState {

    if (isActionOfType(action, AppUIActions.setErrorDialogVisible)) {
        return {
            ...state,
            errorDialogVisible: action.payload,
        };
    }

    if (isActionOfType(action, AppUIActions.setErrorDialogTitle)) {
        return {
            ...state,
            errorDialogTitle: action.payload,
        };
    }

    if (isActionOfType(action, AppUIActions.setErrorDialogExplanation)) {
        return {
            ...state,
            errorDialogExplanation: action.payload,
        };
    }

    if (isActionOfType(action, AppUIActions.setCallRequestInProgress)) {
        return {
            ...state,
            callRequestInProgress: action.payload,
        };
    }

    if (isActionOfType(action, AppUIActions.setClientStreamingRequest)) {
        return {
            ...state,
            serverStreaming: action.payload,
        };
    }

    if (isActionOfType(action, AppUIActions.setClientStreamingRequest)) {
        return {
            ...state,
            clientStreaming: action.payload,
        };
    }

    return state;
}
