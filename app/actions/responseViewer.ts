import * as actionHelpers from './actions';

const SET_RESPONSE = 'SET_RESPONSE';
const SET_SERVER_STREAMING_RESPONSE = 'SET_SERVER_STREAMING_RESPONSE';

export const setResponse = actionHelpers.actionCreator<string>(SET_RESPONSE);
export const setServerStreamingResponse = actionHelpers.actionCreator<boolean>(SET_SERVER_STREAMING_RESPONSE);
