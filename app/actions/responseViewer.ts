import * as actionHelpers from './actions';

const SET_RESPONSE = 'SET_RESPONSE';
const SET_SERVER_STREAMING_RESPONSE = 'SET_SERVER_STREAMING_RESPONSE';
const APPEND_LOG = 'APPEND_LOG';
const CLEAR_LOGS = 'CLEAR_LOGS';

export const setResponse = actionHelpers.actionCreator<string>(SET_RESPONSE);
export const setServerStreamingResponse = actionHelpers.actionCreator<boolean>(SET_SERVER_STREAMING_RESPONSE);
export const appendLogs = actionHelpers.actionCreator<string>(APPEND_LOG);
export const clearLogs = actionHelpers.emptyActionCreator(CLEAR_LOGS);
