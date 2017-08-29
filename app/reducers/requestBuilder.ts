import { isActionOfType, Action } from '../actions/actions';
import * as RequestBuilderActions from '../actions/requestBuilder';

import { SettingsDataState as PolyglotSettings,
    initialSettingsDataState as initialPolyglotSettings }
    from './settingsData';


export class CallServiceOptions {
    public jsonBody: string = '';
    public fullMethod: string = '';

    public constructor(init?: Partial<CallServiceOptions>) {
        Object.assign(this, init);
    }
}

export class CallServiceRequest {
    public polyglotSettings: PolyglotSettings = initialPolyglotSettings;
    public callServiceOptions: CallServiceOptions = new CallServiceOptions();

    public constructor(init?: Partial<CallServiceRequest>) {
        Object.assign(this, init);
    }
}


export type RequestBuilderState = Readonly<{
    request: string;
    fullMethod: string;
    callRequestInProgress: boolean;
    clientStreaming?: boolean;
}>;

const initialRequestBuilderState: RequestBuilderState = {
    request: '',
    fullMethod: '',
    callRequestInProgress: false,
    clientStreaming: undefined,
};

export default function requestBuilderReducer(state: RequestBuilderState = initialRequestBuilderState, action: Action<any>): RequestBuilderState {

    if (isActionOfType(action, RequestBuilderActions.setRequest)) {
        return {
            ...state,
            request: action.payload,
        };
    }

    if (isActionOfType(action, RequestBuilderActions.setFullMethod)) {
        return {
            ...state,
            fullMethod: action.payload,
        };
    }


    if (isActionOfType(action, RequestBuilderActions.setCallRequestInProgress)) {
        return {
            ...state,
            callRequestInProgress: action.payload,
        };
    }

    if (isActionOfType(action, RequestBuilderActions.setClientStreamingRequest)) {
        return {
            ...state,
            clientStreaming: action.payload,
        };
    }

    return state;
}
