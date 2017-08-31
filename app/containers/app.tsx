/* tslint:disable:no-console */
import * as React from 'react';
import * as ReactMD from 'react-md';
import { Dispatch, connect } from 'react-redux';

import SideBar from '../components/sideBar';
import RequestBuilder from '../containers/requestBuilder';
import ResponseViewer from '../components/responseViewer';
import * as RequestBuilderActions from '../actions/requestBuilder';
import * as ResponseViewerActions from '../actions/responseViewer';
import * as ServiceListActions from '../actions/serviceList';

import { ListServicesRequest, ListServicesOptions } from '../reducers/serviceList';

import * as AppUIActions from '../actions/appUI';

import { PolyglotLog, PolyglotResponse } from '../ipc/index';
import { AppState } from '../reducers/index';
import { PolyglotService } from '../reducers/serviceList';

const ipcConstants = require('../ipc/constants'); // tslint:disable-line

import { ipcRenderer } from 'electron';

// TODO: Add option to get information about service, eg whether it is streaming or unary, display in UI
export const checkConsoleErrorMessage = 'Check console for full log (Console can be reached from View' +
  ' -> Toggle Developer Tools -> Console)';

type AppProps = AppState & { dispatch: Dispatch<{}> };

// ********************************** APP START ************************************** //

// import { Visitor } from 'universal-analytics';
// const visitor = new Visitor('UA-105606228-1');

class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    this.registerIpcListeners();
    // visitor.event('appContainer', 'lifecycle', 'constructor').send();
  }

  public closeErrorDialog = () => {
    this.props.dispatch(AppUIActions.setErrorDialogVisible(false));
  }

  public openErrorDialog = (title: string, explanation: string) => {
    this.props.dispatch(AppUIActions.setErrorDialogTitle(title));
    this.props.dispatch(AppUIActions.setErrorDialogExplanation(explanation));
    this.props.dispatch(AppUIActions.setErrorDialogVisible(true));
    // visitor.event('appContainer', 'error', 'errorDialogOpened').send();
  }

  public handleSettingsClick = () => {
    this.props.dispatch(AppUIActions.setSettingsOpen(!this.props.appState.settingsOpen));
    // visitor.event('appContainer', 'interaction', 'settingsClicked').send();
  }

  // ********************************** APP END ***************************************** //

  // ************************** LIST SERVICES START ************************************* //

  public listServices() {
    this.props.dispatch(RequestBuilderActions.setFullMethod(''));
    this.props.dispatch(RequestBuilderActions.setRequest(''));
    this.props.dispatch(ServiceListActions.importServices([]));
    this.props.dispatch(ResponseViewerActions.setResponse(''));

    const listServicesRequest: ListServicesRequest = {
      polyglotSettings: this.props.settingsState.settingsDataState,
      listServicesOptions: new ListServicesOptions({
        methodFilter: this.props.serviceListState.methodFilter,
        serviceFilter: this.props.serviceListState.serviceFilter,
      }),
    };

    console.log('Sending request to list services with options: ', listServicesRequest);
    // visitor.event('appContainer', 'interaction', 'listServicesRequest').send();
    ipcRenderer.send(ipcConstants.LIST_SERVICES_REQUEST, listServicesRequest);
  }

  public listServicesResponse = (event: Event, res: PolyglotResponse) => {
    console.log('Received list service response: ', res);

    if (!res.error) {
      try {
        const parsedResponse = JSON.parse(res.response as string) as PolyglotService[];
        this.props.dispatch(ServiceListActions.importServices(parsedResponse));
      } catch (e) {
        this.openErrorDialog('Error parsing list-services response:', checkConsoleErrorMessage);
        console.error(`Error ${e}\n${res.response}`);
      }
    } else {
      this.openErrorDialog('Error listing services: ', checkConsoleErrorMessage);
      console.error(`Error ${res.error}\n${res.response}`);
    }
    // visitor.event('appContainer', 'interaction', 'listServicesResponse').send();
  }

  public handleListServicesClick = () => {
    this.listServices();
  }

  // ************************** LIST SERVICES END ************************************* //

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
            serviceMap={this.props.serviceListState.serviceMap}
            appState={this.props.appState}
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
              closeErrorDialog={this.closeErrorDialog}
              openErrorDialog={this.openErrorDialog}
            />
            <ResponseViewer
              responseViewerState={this.props.responseViewerState}
              fullMethod={this.props.requestBuilderState.fullMethod}
            />
          </div>
        </div>
        <ReactMD.DialogContainer
          id='errorDialog'
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
    ipcRenderer.on(ipcConstants.POST_LOGS, this.processPolyglotLog);
  }

  private processPolyglotLog = (event: Event, polyglotLog: PolyglotLog) => {
    if (typeof polyglotLog.log !== 'string') {
      polyglotLog.log = new TextDecoder('utf-8').decode(polyglotLog.log as ArrayBuffer).trim();
    }
    if (polyglotLog.log !== '') {
      switch (polyglotLog.level) {
        case ipcConstants.LOG_LEVELS.WARN:
          console.warn(polyglotLog.log);
          break;
        case ipcConstants.LOG_LEVELS.INFO:
          console.info(polyglotLog.log);
          break;
        case ipcConstants.LOG_LEVELS.DEBUG:
          console.debug(polyglotLog.log);
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
