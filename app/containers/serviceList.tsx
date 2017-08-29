/* tslint:disable:no-console */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

// const ipcConstants = require('../ipc/constants');
// import { ipcRenderer } from 'electron';
// import { PolyglotResponse } from '../ipc/index';

import * as RequestBuilderActions from '../actions/requestBuilder';
import * as ResponseViewerActions from '../actions/responseViewer';
// import * as ServiceListActions from '../actions/serviceList';

// import { ListServicesRequest, ListServicesOptions } from '../reducers/serviceList';

import ServiceList,
{ ServiceListComponentMethods, ServiceListComponentState } from '../components/serviceList';
import { AppState } from '../reducers/index';

// import { checkConsoleErrorMessage } from './App';

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
function mapDispatchToProps(dispatch: Dispatch<AppState>): ServiceListComponentMethods {
  return {
    handleMethodClick: (serviceName: string, methodName: string) => dispatch(handleMethodClick(serviceName, methodName)),
  };
}

export default (connect(mapStateToProps, mapDispatchToProps)(ServiceList));
