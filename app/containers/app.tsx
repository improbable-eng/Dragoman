/* tslint:disable:no-console */
import * as React from 'react';
import * as ReactMD from 'react-md';
import { Dispatch, connect } from 'react-redux';

// import SideBar from '../components/sideBar';
import RequestBuilder from '../containers/requestBuilder';
import ResponseViewer from '../components/responseViewer';
import ServiceList from '../containers/serviceList';
import Settings from '../containers/settings';

import * as AppUIActions from '../actions/appUI';

import { PolyglotLog } from '../ipc/index';
import { AppState } from '../reducers/index';


const ipcConstants = require('../ipc/constants'); // tslint:disable-line

import { ipcRenderer } from 'electron';

// TODO: Add option to get information about service, eg whether it is streaming or unary, display in UI
export const checkConsoleErrorMessage = 'Check console for full log (Console can be reached from View' +
  ' -> Toggle Developer Tools -> Console)';

type AppProps = AppState & { dispatch: Dispatch<{}> };

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

  public render() {
    return (
      <div>
        <ReactMD.NavigationDrawer
          desktopDrawerType='clipped'
          tabletDrawerType='clipped'
          // drawerTitle={<p></p>}
          drawerClassName='md-toolbar-relative'
          drawerHeader={<ServiceList openErrorDialog={this.openErrorDialog}/>}
          toolbarTitle='Dragoman'
          toolbarActions={
            <ReactMD.Button
              icon={true}
              onClick={this.handleSettingsClick}>
              settings
          </ReactMD.Button>}
          children={
            <div style={{ display: 'flex', flexFlow: 'row', flexGrow: 1 }}>
              <RequestBuilder
                closeErrorDialog={this.closeErrorDialog}
                openErrorDialog={this.openErrorDialog}
              />
              <ResponseViewer
                responseViewerState={this.props.responseViewerState}
                fullMethod={this.props.requestBuilderState.fullMethod}
              />
            </div>}
        />
        <ReactMD.Drawer
          className='md-toolbar-relative'
          defaultMedia='desktop'
          visible={this.props.appState.settingsOpen}
          position='right'
          children={<Settings/>}
        />
      </div>
      //   <ReactMD.DialogContainer
      //     id='errorDialog'
      //     visible={this.props.appState.errorDialogVisible}
      //     modal={true}
      //     title={this.props.appState.errorDialogTitle}
      //     actions={
      //       [{
      //         onClick: this.closeErrorDialog,
      //         secondary: true,
      //         label: 'Ok',
      //       }]
      //     }
      //     children={this.props.appState.errorDialogExplanation}
      //   />
      // </div>
    );
  }

  // Adding event listeners to allow callback from the main process
  private registerIpcListeners(): void {
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
