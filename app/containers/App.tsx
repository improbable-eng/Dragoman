/* tslint:disable:no-console */
import * as React from 'react';
import * as ReactMD from 'react-md';
import { Dispatch, connect } from 'react-redux';

import SideBar from '../components/sideBar';
import RequestBuilder from '../components/requestBuilder';
import ResponseViewer from '../components/responseViewer';

import * as SettingsUIActions from '../actions/settingsUI';
import * as RequestBuilderActions from '../actions/requestBuilder';
import * as ResponseViewerActions from '../actions/responseViewer';
import * as ListServicesActions from '../actions/listServices';
import * as AppUIActions from '../actions/appUI';

import { PolyglotService, ListServicesOptions, ListServicesRequest } from '../reducers/listServices';
import { CallServiceOptions, CallServiceRequest } from '../reducers/requestBuilder';

import {
  PolyglotResponse, PolyglotLog,
} from '../ipc/index';

import { AppState } from '../reducers/index';

const ipcConstants = require('../ipc/constants'); // tslint:disable-line

import { ipcRenderer } from 'electron';

// TODO: Add option to get information about service, eg whether it is streaming or unary, display in UI
const checkConsoleErrorMessage = 'Check console for full log (Console can be reached from View' +
  ' -> Toggle Developer Tools -> Console)';

type AppProps = AppState & { dispatch: Dispatch<{}> };

// ********************************** APP START ************************************** //

class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super();
    this.registerIpcListeners();
  }


  public closeErrorDialog = () => {
    this.props.dispatch(AppUIActions.setErrorDialogVisible(false));
  }

  public openErrorDialog = (title: string, explanation: string) => {
    this.props.dispatch(AppUIActions.setErrorDialogVisible(true));
    this.props.dispatch(AppUIActions.setErrorDialogTitle(title));
    this.props.dispatch(AppUIActions.setErrorDialogExplanation(explanation));
  }

  public handleSettingsClick = () => {
    this.props.dispatch(AppUIActions.setSettingsOpen(!this.props.appState.settingsOpen));
  }

  // ********************************** APP END ***************************************** //

  // ************************** LIST SERVICES START ************************************* //

  public listServices() {
    this.props.dispatch(RequestBuilderActions.setFullMethod(''));
    this.props.dispatch(RequestBuilderActions.setRequest(''));
    this.props.dispatch(ListServicesActions.importServices([]));
    this.props.dispatch(ResponseViewerActions.setResponse(''));

    const listServicesRequest: ListServicesRequest = {
      polyglotSettings: this.props.settingsState.settingsDataState,
      listServicesOptions: new ListServicesOptions({
        methodFilter: this.props.listServicesState.methodFilter,
        serviceFilter: this.props.listServicesState.serviceFilter,
      }),
    };

    console.log('Sending request to list services with options: ', listServicesRequest);
    ipcRenderer.send(ipcConstants.LIST_SERVICES_REQUEST, listServicesRequest);
  }

  public listServicesResponse = (event: Event, res: PolyglotResponse) => {
    console.log('Received list service response: ', res);

    if (!res.error) {
      try {
        const parsedResponse = JSON.parse(res.response as string) as PolyglotService[];
        this.props.dispatch(ListServicesActions.importServices(parsedResponse));
      } catch (e) {
        this.openErrorDialog('Error parsing list-services response:', checkConsoleErrorMessage);
        console.error(`Error ${e}\n${res.response}`);
      }
    } else {
      this.openErrorDialog('Error listing services: ', checkConsoleErrorMessage);
      console.error(`Error ${res.error}\n${res.response}`);
    }
  }

  public handleListServicesClick = () => {
    this.listServices();
  }

  public handleMethodClick = (serviceName: string, methodName: string) => {
    try {
      const clickedService = this.props.listServicesState.serviceMap.get(serviceName);

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

      this.props.dispatch(RequestBuilderActions.setClientStreamingRequest(clickedMethod.clientStreaming));
      this.props.dispatch(RequestBuilderActions.setFullMethod(`${serviceName}/${methodName}`));
      this.props.dispatch(RequestBuilderActions.setRequest(prettyPrintedRequestTemplate));
      this.props.dispatch(ResponseViewerActions.setResponse(prettyPrintedResponseTemplate));
      this.props.dispatch(ResponseViewerActions.setServerStreamingResponse(clickedMethod.serverStreaming));
    } catch (e) {
      console.error(`Error when method was clicked ${e}`);
    }
  }

  // ************************** LIST SERVICES END ************************************* //

  // ************************** REQUEST BUILDER START *********************************** //

  public callService = () => {
    const requestJson = this.props.requestBuilderState.request;

    // Remove the annotations [<optioal> <repeated>] from the request.
    // Note (Edge Case): If the actual JSON body contains these strings they will be removed.
    const redactedJsonInput = requestJson.replace(/\[<(optional|required)> <(single|repeated)>\]/g, '');

    // Testing whether it is valid JSON. This will not work when constructing streaming responses
    // TODO: Change this to deal with streaming requests
    try {
      JSON.parse(redactedJsonInput);
    } catch (e) {
      this.props.dispatch(RequestBuilderActions.setCallRequestInProgress(false));
      this.openJsonParseErrorDialog();
    }

    const callServiceRequest = new CallServiceRequest({
      polyglotSettings: this.props.settingsState.settingsDataState,
      callServiceOptions: new CallServiceOptions({
        jsonBody: redactedJsonInput,
        fullMethod: this.props.requestBuilderState.fullMethod,
      }),
    });

    console.log('Calling service with request', callServiceRequest);
    ipcRenderer.send(ipcConstants.CALL_SERVICE_REQUEST, callServiceRequest);
  }

  public callServiceResponse = (event: Event, res: PolyglotResponse) => {
    this.props.dispatch(RequestBuilderActions.setCallRequestInProgress(false));

    console.log(`Received call service response \n${res}`);

    if (!res.error) {
      // The response can be an array encoded in utf-8
      if (typeof res.response !== 'string') {
        res.response = new TextDecoder('utf-8').decode(res.response as ArrayBuffer).trim();
      }
      this.props.dispatch(ResponseViewerActions.setResponse(res.response));
    } else {
      this.openErrorDialog('Error calling service: ', checkConsoleErrorMessage);
      console.error(`Error ${res.error} \n${res.response}`);
    }
  }

  public handleRequestChange = (newRequest: string) => {
    this.props.dispatch(RequestBuilderActions.setRequest(newRequest));
  }

  public handleRunClick = () => {
    // Up until this point the endpoint did not need to be filled in.
    this.props.dispatch(SettingsUIActions.setEndpointRequired(true));
    if (this.props.settingsState.settingsDataState.endpoint === '') {
      this.props.dispatch(SettingsUIActions.setEndpointRequired(true));
      this.props.dispatch(AppUIActions.setSettingsOpen(true));
      this.props.dispatch(SettingsUIActions.setEndpointError(true));
    } else {
      this.props.dispatch(RequestBuilderActions.setCallRequestInProgress(true));
      this.callService();
    }
  }

  public handleCancelClick = () => {
    console.warn('Cancelling request');
    ipcRenderer.send(ipcConstants.CANCEL_REQUEST);
  }

  public cancelRequestResponse = (success: boolean) => {
    this.props.dispatch(RequestBuilderActions.setCallRequestInProgress(!success));
  }

  public openJsonParseErrorDialog = () => {
    this.openErrorDialog('Error parsing request', 'Ensure that the request is valid JSON');
  }

  // ************************** REQUEST BUILDER END *********************************** //

  public render() {
    return (
      <div>
        <ReactMD.Toolbar
          title='Dragoman'
          className='md-toolbar--fixed'
          colored={true}
        />
        <div>
          <SideBar
            serviceMap={this.props.listServicesState.serviceMap}
            appState={this.props.appState}
            handleMethodClick={this.handleMethodClick}
            handleSettingsClick={this.handleSettingsClick}
            handleListServicesClick={this.handleListServicesClick}
          />
          <div
            style={{ display: 'flex' }}
            className={
              'md-navigation-drawer-content md-navigation-drawer-content--prominent-offset' +
              'md-transition--decceleration md-drawer-relative md-toolbar-relative'
            }
          >
            <RequestBuilder
              requestBuilderState={this.props.requestBuilderState}
              handleRunClick={this.handleRunClick}
              handleRequestChange={this.handleRequestChange}
              handleCancelClick={this.handleCancelClick}
            />
            <ResponseViewer
              responseViewerState={this.props.responseViewerState}
              fullMethod={this.props.requestBuilderState.fullMethod}
            />
          </div>
        </div>
        <ReactMD.DialogContainer
          id='errorDialog'
          // visible and modal are not defined by default in the current alpha version of react-md, if there is
          // an error paste visible?: boolean; modal?: boolean; into DialogProps in the Dialog.d.ts file
          // this should be fixed in future versions of react-md
          visible={this.props.appState.errorDialogVisible}
          modal={true}
          title={this.props.appState.errorDialogTitle}
          actions={
            [{
              onClick: this.closeErrorDialog,
              secondary: true,
              label: 'Ok',
            }]
          }
          children={this.props.appState.errorDialogExplanation}
        />
      </div>);
  }

  // Adding event listeners to allow callback from the main process
  private registerIpcListeners(): void {
    ipcRenderer.on(ipcConstants.LIST_SERVICES_RESPONSE, this.listServicesResponse);
    ipcRenderer.on(ipcConstants.CALL_SERVICE_RESPONSE, this.callServiceResponse);
    // ipcRenderer.on(ipcConstants.VALIDATE_PATHS_RESPONSE, this.validateSystemPathResponse);
    ipcRenderer.on(ipcConstants.POST_LOGS, this.processPolyglotLog);
    ipcRenderer.on(ipcConstants.CANCEL_REQUEST_RESPONSE, this.cancelRequestResponse);
  }

  private processPolyglotLog = (event: Event, polyglotLog: PolyglotLog) => {
    if (typeof polyglotLog.log !== 'string') {
      polyglotLog.log = new TextDecoder('utf-8').decode(polyglotLog.log as ArrayBuffer).trim();
    }
    if (polyglotLog.log !== '') {
      switch (polyglotLog.level) {
        case 'warn':
          console.warn(polyglotLog.log);
          break;
        default:
          console.log(polyglotLog.log);
          break;
      }
    }
  }
}

function mapStateToProps(state: AppProps): AppProps {
  return state;
}

export default connect(mapStateToProps)(App);
