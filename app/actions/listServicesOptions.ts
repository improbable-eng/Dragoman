import * as actionHelpers from './actions';
import { ListServicesOptions } from '../reducers/listServicesOptions';

const SET_LIST_SERVICES_OPTIONS = 'ListServicesOptions';
const CHANGE_SERVICE_FILTER = 'CHANGE_JSON_BODY';
const CHANGE_METHOD_FILTER = 'CHANGE_FULL_METHOD';

export const setListServicesOptions = actionHelpers.actionCreator<ListServicesOptions>(SET_LIST_SERVICES_OPTIONS);
export const changeServiceFilter = actionHelpers.actionCreator<string>(CHANGE_SERVICE_FILTER);
export const changeMethodFilter = actionHelpers.actionCreator<string>(CHANGE_METHOD_FILTER);
