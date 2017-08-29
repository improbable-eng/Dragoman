import * as actionHelpers from './actions';
import { PolyglotService } from '../reducers/serviceList';

const CHANGE_SERVICE_FILTER = 'CHANGE_SERVICE_FILTER';
const CHANGE_METHOD_FILTER = 'CHANGE_METHOD_FILTER';
const IMPORT_SERVICES = 'IMPORT_SERVICES';

export const changeServiceFilter = actionHelpers.actionCreator<string>(CHANGE_SERVICE_FILTER);
export const changeMethodFilter = actionHelpers.actionCreator<string>(CHANGE_METHOD_FILTER);
export const importServices = actionHelpers.actionCreator<PolyglotService[]>(IMPORT_SERVICES);
