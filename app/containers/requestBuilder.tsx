/* tslint:disable:no-console */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { spawn } from 'child_process';
import * as path from 'path';

const ipcConstants = require('../ipc/constants');
import { ipcRenderer } from 'electron';

import * as RequestBuilderActions from '../actions/requestBuilder';
import * as ResponseViewerActions from '../actions/responseViewer';
import * as SettingsUIActions from '../actions/settingsUI';
import * as AppUIActions from '../actions/appUI';

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

    const DEV_PATH_TO_POLYGLOT_BINARY = '/Users/peteboothroyd/Projects/polyglotGUI/GUI/dragoman/app/polyglot_deploy.jar';

    let pathToPolyglotBinary;

    if (process.env.NODE_ENV === 'development') {
        pathToPolyglotBinary = DEV_PATH_TO_POLYGLOT_BINARY;
    } else {
        pathToPolyglotBinary = path.join(__dirname, 'polyglot_deploy.jar').replace('app.asar', 'app.asar.unpacked');
    }

    const echoCommandLineArgs = [getState().requestBuilderState.request];
    const echo = spawn('echo', echoCommandLineArgs);
    // childProcesses[echo.pid] = echo;

    // Build polyglot command
    const polyglotCommand = 'java';
    const polyglotCommandLineArgs = ['-jar', pathToPolyglotBinary, '--command=call'];
    const polyglotSettings = getState().settingsState.settingsDataState;
    const callServiceOptions = getState().requestBuilderState;

    if (polyglotSettings.protoDiscoveryRoot !== '') {
        polyglotCommandLineArgs.push(`--proto_discovery_root=${polyglotSettings.protoDiscoveryRoot}`);
    }
    if (polyglotSettings.configSetPath !== '') {
        polyglotCommandLineArgs.push(`--config_set_path=${polyglotSettings.configSetPath}`);
    }
    if (polyglotSettings.configName !== '') {
        polyglotCommandLineArgs.push(`--config_name=${polyglotSettings.configName}`);
    }
    if (polyglotSettings.deadlineMs > 0) {
        polyglotCommandLineArgs.push(`--deadline_ms=${polyglotSettings.deadlineMs}`);
    }
    if (polyglotSettings.tlsCaCertPath !== '') {
        polyglotCommandLineArgs.push(`--tls_ca_certificate=${polyglotSettings.tlsCaCertPath}`);
    }
    if (polyglotSettings.endpoint !== '') {
        polyglotCommandLineArgs.push(`--endpoint=${polyglotSettings.endpoint}`);
    }
    if (callServiceOptions.fullMethod !== '') {
        polyglotCommandLineArgs.push(`--full_method=${callServiceOptions.fullMethod}`);
    }
    if (polyglotSettings.addProtocIncludes !== '') {
        polyglotCommandLineArgs.push(`--add_protoc_includes=${polyglotSettings.addProtocIncludes.split(',').map(elem => elem.trim()).join(',')}`);
    }

    console.log('Running command ', polyglotCommand, ' ', polyglotCommandLineArgs.join(' '));

    const polyglot = spawn(polyglotCommand, polyglotCommandLineArgs);
    // childProcesses[polyglot.pid] = polyglot;

    let echoStdErr = '';

    echo.stdout.on('data', (data) => {
        polyglot.stdin.write(data);
    });

    echo.stderr.on('data', (data) => {
        console.error(`echoStdErr: ${new TextDecoder('utf-8').decode(data as Buffer)}`);
        echoStdErr += data;
    });

    echo.on('close', (code) => {
        console.log(`echo closing with code: ${code}\n`);
        // delete childProcesses[echo.pid];
        if (code === 0) {
            polyglot.stdin.end();
        }
    });

    let polyglotStderr = '';
    let polyglotStdout = '';

    polyglot.stderr.on('data', (data) => {
        console.warn(new TextDecoder('utf-8').decode(data as Buffer));
        polyglotStderr += data;
        });

    polyglot.stdout.on('data', (data) => {
        polyglotStdout += data;
    });

    polyglot.on('close', (code) => {
        // delete childProcesses[polyglot.pid];
        dispatch(RequestBuilderActions.setCallRequestInProgress(false));
        if (code !== 0) {
            openErrorDialog('Error calling service', checkConsoleErrorMessage);
        } else {
            console.log(polyglotStdout);
            dispatch(ResponseViewerActions.setResponse(polyglotStdout));
        }
    });
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
