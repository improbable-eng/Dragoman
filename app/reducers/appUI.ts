import { isActionOfType, Action } from '../actions/actions';
import * as AppUIActions from '../actions/appUI';

export type ErrorDialogState = {
    errorDialogTitle: string;
    errorDialogExplanation: string;
    onAccept?: () => void
    cancelButtonAvailable?: boolean;
    onCancel?: () => void;
};

export type AppUIState = Readonly<{
    settingsOpen: boolean;
    errorDialogVisible: boolean;
    serverStreaming?: boolean;
    errorDialogQueue: ErrorDialogState[];
}>;

const initialAppState: AppUIState = {
    settingsOpen: true,
    errorDialogVisible: false,
    errorDialogQueue: [],
    serverStreaming: undefined,
};

export default function appReducer(state: AppUIState = initialAppState, action: Action<any>): AppUIState {

    if (isActionOfType(action, AppUIActions.setSettingsOpen)) {
        return {
            ...state,
            settingsOpen: action.payload,
        };
    }

    if (isActionOfType(action, AppUIActions.setErrorDialogVisible)) {
        return {
            ...state,
            errorDialogVisible: action.payload,
        };
    }

    if (isActionOfType(action, AppUIActions.enqueueErrorDialogState)) {

        return {
            ...state,
            errorDialogQueue: [...state.errorDialogQueue, action.payload],
        };
    }

    if (isActionOfType(action, AppUIActions.dequeueErrorDialogState)) {
        state.errorDialogQueue.shift();
        return {
            ...state,
            errorDialogQueue: state.errorDialogQueue,
        };
    }

    return state;
}
