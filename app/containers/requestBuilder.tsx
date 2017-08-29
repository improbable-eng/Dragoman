/* tslint:disable:no-console */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const ipcConstants = require('../ipc/constants');
import { ipcRenderer } from 'electron';
import { PolyglotResponse } from '../ipc/index';

import * as RequestBuilderActions from '../actions/requestBuilder';
import * as ResponseViewerActions from '../actions/responseViewer';
import * as SettingsUIActions from '../actions/settingsUI';
import * as AppUIActions from '../actions/appUI';

import { CallServiceRequest, CallServiceOptions } from '../reducers/requestBuilder';
import { AppState } from '../reducers/index';

import RequestBuilder,
{ RequestBuilderComponentMethods, RequestBuilderComponentState } from '../components/requestBuilder';

import { checkConsoleErrorMessage } from './app';

export interface RequestBuilderProps {
    openErrorDialog: (title: string, explanation: string) => void;
    closeErrorDialog: () => void;
}

function callService(dispatch: Dispatch<AppState>, getState: () => AppState,
    openErrorDialog: (title: string, explanation: string) => void) {
    const requestJson = getState().requestBuilderState.request;

    // Remove the annotations [<optioal> <repeated>] from the request.
    // Note (Edge Case): If the actual JSON body contains these strings they will be removed.
    const redactedJsonInput = requestJson.replace(/\[<(optional|required)> <(single|repeated)>\]/g, '');

    // Testing whether it is valid JSON. This will not work when constructing streaming responses
    // TODO: Change this to deal with streaming requests
    try {
        JSON.parse(redactedJsonInput);
    } catch (e) {
        dispatch(RequestBuilderActions.setCallRequestInProgress(false));
        openErrorDialog('Error parsing request', 'Ensure that the request is valid JSON');
    }

    const callServiceRequest = new CallServiceRequest({
        polyglotSettings: getState().settingsState.settingsDataState,
        callServiceOptions: new CallServiceOptions({
            jsonBody: redactedJsonInput,
            fullMethod: getState().requestBuilderState.fullMethod,
        }),
    });

    console.log('Calling service with request', callServiceRequest);

    ipcRenderer.once(ipcConstants.CALL_SERVICE_RESPONSE,
        (event: Event, response: PolyglotResponse) => callServiceResponse(response, dispatch, openErrorDialog));
    ipcRenderer.send(ipcConstants.CALL_SERVICE_REQUEST, callServiceRequest);
}

function callServiceResponse(res: PolyglotResponse, dispatch: Dispatch<AppState>,
    openErrorDialog: (title: string, explanation: string) => void) {
    dispatch(RequestBuilderActions.setCallRequestInProgress(false));

    console.log(`Received call service response \n${res}`);

    if (!res.error) {
        // The response can be an array encoded in utf-8
        if (typeof res.response !== 'string') {
            res.response = new TextDecoder('utf-8').decode(res.response as ArrayBuffer).trim();
        }
        dispatch(ResponseViewerActions.setResponse(res.response));
    } else {
        openErrorDialog('Error calling service: ', checkConsoleErrorMessage);
        console.error(`Error ${res.error} \n${res.response}`);
    }
}

function handleRunClick(openErrorDialog: (title: string, explanation: string) => void) {
    return (dispatch: Dispatch<AppState>, getState: () => AppState) => {
        // Up until this point the endpoint did not need to be filled in.
        dispatch(SettingsUIActions.setEndpointRequired(true));
        if (getState().settingsState.settingsDataState.endpoint === '') {
            dispatch(SettingsUIActions.setEndpointRequired(true));
            dispatch(AppUIActions.setSettingsOpen(true));
            dispatch(SettingsUIActions.setEndpointError(true));
        } else {
            dispatch(RequestBuilderActions.setCallRequestInProgress(true));
            callService(dispatch, getState, openErrorDialog);
        }
    };
}

function handleCancelClick() {
    return (dispatch: Dispatch<AppState>, getState: () => AppState) => {
        console.warn('Cancelling request');
        ipcRenderer.once(ipcConstants.CANCEL_REQUEST_RESPONSE,
            (event: Event, success: boolean) => cancelRequestResponse(success, dispatch));
        ipcRenderer.send(ipcConstants.CANCEL_REQUEST);
    };
}

function cancelRequestResponse(success: boolean, dispatch: Dispatch<AppState>) {
    dispatch(RequestBuilderActions.setCallRequestInProgress(!success));
}

/** Function required by react-redux connect, maps from the main state in the redux store to the props required
 * for the settings component.
 * @param {AppState} state - The state of the redux store
 * @returns {RequestBuilderComponentState} - The slice of @param state required for the request builder component
  */
function mapStateToProps(state: AppState): RequestBuilderComponentState {
    return {
        requestBuilderState: state.requestBuilderState,
    };
}

/** Function required by react-redux connect, provides the dispatch method to any prop functions that require the ability to
 * update the store.
 * @param {Dispatch<AppState>} dispatch - The dispatch method to send actions to the reducers for the store.
 * @returns {RequestBuilderComponentMethods} - The methods required by the request builder component
  */
function mapDispatchToProps(dispatch: Dispatch<AppState>, ownProps: RequestBuilderProps): RequestBuilderComponentMethods {
    return {
        handleRunClick: () => dispatch(handleRunClick(ownProps.openErrorDialog)),
        handleRequestChange: (newRequest: string) => dispatch(RequestBuilderActions.setRequest(newRequest)),
        handleCancelClick: () => dispatch(handleCancelClick()),
    };
}

export default (connect(mapStateToProps, mapDispatchToProps)(RequestBuilder));
