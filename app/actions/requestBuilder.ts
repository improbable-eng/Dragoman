import * as actionHelpers from './actions';

const SET_REQUEST = 'SET_REQUEST';
const SET_FULL_METHOD = 'SET_FULL_METHOD';
const SET_CALL_REQUEST_IN_PROGRESS = 'SET_CALL_REQUEST_IN_PROGRESS';
const SET_CLIENT_STREAMING_REQUEST = 'SET_CLIENT_STREAMING_REQUEST';

export const setRequest = actionHelpers.actionCreator<string>(SET_REQUEST);
export const setFullMethod = actionHelpers.actionCreator<string>(SET_FULL_METHOD);
export const setCallRequestInProgress = actionHelpers.actionCreator<boolean>(SET_CALL_REQUEST_IN_PROGRESS);
export const setClientStreamingRequest = actionHelpers.actionCreator<boolean>(SET_CLIENT_STREAMING_REQUEST);
