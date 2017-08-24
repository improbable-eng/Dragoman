import * as actionHelpers from './actions';
import { CallServiceOptions } from '../reducers/callServiceOptions';

const CHANGE_JSON_BODY = 'CHANGE_JSON_BODY';
const CHANGE_FULL_METHOD = 'CHANGE_FULL_METHOD';
const SET_CALL_SERVICE_OPTIONS = 'SET_CALL_SERVICE_OPTIONS';

export const setCallServiceOptions = actionHelpers.actionCreator<CallServiceOptions>(SET_CALL_SERVICE_OPTIONS);
export const changeJsonBody = actionHelpers.actionCreator<string>(CHANGE_JSON_BODY);
export const changeFullMethod = actionHelpers.actionCreator<string>(CHANGE_FULL_METHOD);
