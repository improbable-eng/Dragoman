import { isActionOfType, Action } from '../actions/actions';
import * as ResponseActions from '../actions/response';

export type Response = Readonly<{
    responseBody: string;
}>;

const initialCallServiceOptions: Response = {
   responseBody: '',
};

export default function uiSettings(state: Response = initialCallServiceOptions, action: Action<any>): Response {

    if (isActionOfType(action, ResponseActions.changeResponse)) {
        return {
            ...state,
            responseBody: action.payload,
        };
    }

    return state;
}
