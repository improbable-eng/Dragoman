import { isActionOfType, Action } from '../actions/actions';
import * as CallServiceOptionsActions from '../actions/callServiceOptions';

export type CallServiceOptions = Readonly<{
    jsonBody: string;
    fullMethod: string;
}>;

const initialCallServiceOptions: CallServiceOptions = {
   jsonBody: '',
   fullMethod: '',
};

export default function uiSettings(state: CallServiceOptions = initialCallServiceOptions, action: Action<any>): CallServiceOptions {

    if (isActionOfType(action, CallServiceOptionsActions.setCallServiceOptions)) {
        return {
            ...state,
            ...action.payload,
        };
    }

    if (isActionOfType(action, CallServiceOptionsActions.changeJsonBody)) {
        return {
            ...state,
            jsonBody: action.payload,
        };
    }

    if (isActionOfType(action, CallServiceOptionsActions.changeFullMethod)) {
        return {
            ...state,
            fullMethod: action.payload,
        };
    }

    return state;
}
