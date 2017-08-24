import { isActionOfType, Action } from '../actions/actions';
import * as ListServicesOptionsActions from '../actions/listServicesOptions';

export type ListServicesOptions = Readonly<{
    serviceFilter: string;
    methodFilter: string;
}>;

const initialListServicesOptions: ListServicesOptions = {
    serviceFilter: '',
    methodFilter: '',
};

export default function uiSettings(state: ListServicesOptions = initialListServicesOptions, action: Action<any>): ListServicesOptions {

    if (isActionOfType(action, ListServicesOptionsActions.setListServicesOptions)) {
        return {
            ...state,
            ...action.payload,
        };
    }

    if (isActionOfType(action, ListServicesOptionsActions.changeServiceFilter)) {
        return {
            ...state,
            serviceFilter: action.payload,
        };
    }

    if (isActionOfType(action, ListServicesOptionsActions.changeMethodFilter)) {
        return {
            ...state,
            methodFilter: action.payload,
        };
    }

    return state;
}
