/* tslint:disable:no-console */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as path from 'path';
import { spawn } from 'child_process';

import * as RequestBuilderActions from '../actions/requestBuilder';
import * as ResponseViewerActions from '../actions/responseViewer';
import * as ServiceListActions from '../actions/serviceList';
import * as NodeProcessActions from '../actions/nodeProcess';

import { AppState } from '../reducers/index';
import { PolyglotService } from '../reducers/serviceList';

import ServiceList,
{ ServiceListComponentMethods, ServiceListComponentState } from '../components/serviceList';

import { checkConsoleErrorMessage, DEV_PATH_TO_POLYGLOT_BINARY } from './app';

export interface ServiceListContainerProps {
  showNotification: (title: string, explanation: string) => void;
}

function handleMethodClick(serviceName: string, methodName: string) {
  return (dispatch: Dispatch<AppState>, getState: () => AppState) => {
    try {
      const clickedService = getState().serviceListState.serviceMap.get(serviceName);

      if (clickedService === undefined) {
        throw new Error(`Cannot find service ${serviceName}`);
      }

      const clickedMethod = clickedService.methodMap.get(methodName);

      if (clickedMethod === undefined) {
        throw new Error(`Cannot find method ${methodName} on service ${serviceName}`);
      }

      // Initially pretty print the templates to make it easy for users to vew the templates.
      // Store and display as simple strings to make subsequent editing easier.
      const prettyPrintedRequestTemplate = JSON.stringify(clickedMethod.request, null, 2);
      const prettyPrintedResponseTemplate = JSON.stringify(clickedMethod.response, null, 2);

      dispatch(RequestBuilderActions.setClientStreamingRequest(clickedMethod.clientStreaming));
      dispatch(RequestBuilderActions.setFullMethod(`${serviceName}/${methodName}`));
      dispatch(RequestBuilderActions.setRequest(prettyPrintedRequestTemplate));
      dispatch(ResponseViewerActions.setResponse(prettyPrintedResponseTemplate));
      dispatch(ResponseViewerActions.setServerStreamingResponse(clickedMethod.serverStreaming));
    } catch (e) {
      console.error(`Error when method was clicked ${e}`);
    }
  };
}


function listServices(showNotification: (title: string, explanation: string) => void) {
  return (dispatch: Dispatch<AppState>, getState: () => AppState) => {
    // Resetting state
    dispatch(ResponseViewerActions.clearLogs());
    dispatch(RequestBuilderActions.setFullMethod(''));
    dispatch(RequestBuilderActions.setRequest(''));
    dispatch(ServiceListActions.importServices([]));
    dispatch(ResponseViewerActions.setResponse(''));

    let pathToPolyglotBinary;

    if (process.env.NODE_ENV === 'development') {
      pathToPolyglotBinary = DEV_PATH_TO_POLYGLOT_BINARY;
    } else {
      pathToPolyglotBinary = path.join(__dirname, 'polyglot_deploy.jar').replace('app.asar', 'app.asar.unpacked');
    }

    // Build polyglot command
    const polyglotCommand = 'java';
    const polyglotCommandLineArgs = ['-jar', pathToPolyglotBinary, '--command=list_services', '--with_message=true', '--list_output_format=json'];

    if (getState().settingsState.settingsDataState.protoDiscoveryRoot !== '') {
      polyglotCommandLineArgs.push(`--proto_discovery_root=${getState().settingsState.settingsDataState.protoDiscoveryRoot}`);
    }
    if (getState().serviceListState.serviceFilter !== '') {
      polyglotCommandLineArgs.push(`--service_filter=${getState().serviceListState.serviceFilter}`);
    }
    if (getState().serviceListState.methodFilter !== '') {
      polyglotCommandLineArgs.push(`--method_filter=${getState().serviceListState.methodFilter}`);
    }
    if (getState().settingsState.settingsDataState.deadlineMs > 0) {
      polyglotCommandLineArgs.push(`--deadline_ms=${getState().settingsState.settingsDataState.deadlineMs}`);
    }
    if (getState().settingsState.settingsDataState.addProtocIncludes !== '') {
      polyglotCommandLineArgs.push(`--add_protoc_includes=${getState().settingsState.settingsDataState.addProtocIncludes.split(',').map((elem: string) => elem.trim()).join(',')}`);
    }

    const polyglot = spawn(polyglotCommand, polyglotCommandLineArgs);
    dispatch(NodeProcessActions.addNodeProcessPid(polyglot.pid));

    let polyglotStderr = '';
    let polyglotStdout = '';

    polyglot.stderr.on('data', (data) => {
      const log = new TextDecoder('utf-8').decode(data as Buffer);
      polyglotStderr += log;
      dispatch(ResponseViewerActions.appendLog(log));
    });

    polyglot.stdout.on('data', (data) => {
      polyglotStdout += data;
    });

    polyglot.on('exit', (code) => {
      dispatch(NodeProcessActions.removeNodeProcessPid(polyglot.pid));
      if (code === 0) {
        try {
          const parsedResponse = JSON.parse(polyglotStdout as string) as PolyglotService[];
          dispatch(ServiceListActions.importServices(parsedResponse));
        } catch (e) {
          showNotification('Error parsing list-services response:', checkConsoleErrorMessage);
        }
      } else {
        showNotification('Error listing services: ', checkConsoleErrorMessage);
      }
    });
  };
}

/** Function required by react-redux connect, maps from the main state in the redux store to the props required
* for the settings component.
* @param {AppState} state - The state of the redux store
* @returns {RequestBuilderComponentState} - The slice of @param state required for the service list component
 */
function mapStateToProps(state: AppState): ServiceListComponentState {
  return {
    serviceMap: state.serviceListState.serviceMap,
  };
}

/** Function required by react-redux connect, provides the dispatch method to any prop functions that require the ability to
 * update the store.
 * @param {Dispatch<AppState>} dispatch - The dispatch method to send actions to the reducers for the store.
 * @returns {RequestBuilderComponentMethods} - The methods required by the service list component
  */
function mapDispatchToProps(dispatch: Dispatch<AppState>, ownProps: ServiceListContainerProps): ServiceListComponentMethods {
  return {
    handleMethodClick: (serviceName: string, methodName: string) => dispatch(handleMethodClick(serviceName, methodName)),
    handleListServicesClick: () => dispatch(listServices(ownProps.showNotification)),
  };
}

export default (connect(mapStateToProps, mapDispatchToProps)(ServiceList));
