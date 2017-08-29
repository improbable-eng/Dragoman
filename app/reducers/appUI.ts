import { isActionOfType, Action } from '../actions/actions';
import * as AppUIActions from '../actions/appUI';

export type AppUIState = Readonly<{
    settingsOpen: boolean;
    errorDialogVisible: boolean;
    errorDialogTitle: string;
    errorDialogExplanation: string;
    serverStreaming?: boolean;
}>;

const initialAppState: AppUIState = {
    settingsOpen: true,
    errorDialogVisible: false,
    errorDialogTitle: '',
    errorDialogExplanation: '',
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

    return state;
}
