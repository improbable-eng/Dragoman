import * as actionHelpers from './actions';
import { ErrorDialogState } from '../reducers/appUI';

const SET_SETTINGS_OPEN = 'SET_SETTINGS_OPEN';
const SET_ERROR_DIALOG_VISIBLE = 'SET_ERROR_DIALOG_VISIBLE';
const ENQUEUE_ERROR_DIALOG_STATE = 'ENQUEUE_ERROR_DIALOG_STATE';
const DEQUEUE_ERROR_DIALOG_STATE = 'DEQUEUE_ERROR_DIALOG_STATE';

export const setSettingsOpen = actionHelpers.actionCreator<boolean>(SET_SETTINGS_OPEN);
export const setErrorDialogVisible = actionHelpers.actionCreator<boolean>(SET_ERROR_DIALOG_VISIBLE);
export const enqueueErrorDialogState = actionHelpers.actionCreator<ErrorDialogState>(ENQUEUE_ERROR_DIALOG_STATE);
export const dequeueErrorDialogState = actionHelpers.emptyActionCreator(DEQUEUE_ERROR_DIALOG_STATE);
