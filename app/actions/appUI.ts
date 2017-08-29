import * as actionHelpers from './actions';

const SET_SETTINGS_OPEN = 'SET_SETTINGS_OPEN';
const SET_ERROR_DIALOG_VISIBLE = 'SET_ERROR_DIALOG_VISIBLE';
const SET_ERROR_DIALOG_TITLE = 'SET_ERROR_DIALOG_TITLE';
const SET_ERROR_DIALOG_EXPLANATION = 'SET_ERROR_DIALOG_EXPLANATION';

export const setSettingsOpen = actionHelpers.actionCreator<boolean>(SET_SETTINGS_OPEN);
export const setErrorDialogVisible = actionHelpers.actionCreator<boolean>(SET_ERROR_DIALOG_VISIBLE);
export const setErrorDialogTitle = actionHelpers.actionCreator<string>(SET_ERROR_DIALOG_TITLE);
export const setErrorDialogExplanation = actionHelpers.actionCreator<string>(SET_ERROR_DIALOG_EXPLANATION);
