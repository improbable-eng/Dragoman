import * as actionHelpers from './actions';
import { Service } from '../types/index';

const IMPORT_SERVICES = 'IMPORT_SERVICES';

export const importServices = actionHelpers.actionCreator<Service[]>(IMPORT_SERVICES);

