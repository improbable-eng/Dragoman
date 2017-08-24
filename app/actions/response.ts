import * as actionHelpers from './actions';

const CHANGE_RESPONSE = 'CHANGE_RESPONSE';

export const changeResponse = actionHelpers.actionCreator<string>(CHANGE_RESPONSE);

