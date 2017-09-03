/* tslint:disable:no-console */
import * as React from 'react';
import * as ReactMD from 'react-md';
import * as ReactGA from 'react-ga';

import { Dispatch, connect } from 'react-redux';
import { exec } from 'child_process';

import RequestBuilder from '../containers/requestBuilder';
import ResponseViewer from '../components/responseViewer';
import ServiceList from '../containers/serviceList';
import Settings from '../containers/settings';

import * as AppUIActions from '../actions/appUI';

import { AppState } from '../reducers/index';

export const checkConsoleErrorMessage = 'Check console for full log (Console can be reached from View' +
  ' -> Toggle Developer Tools -> Console)';

type AppProps = AppState & { dispatch: Dispatch<{}> };

class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    this.checkRuntimeJavaVersion();
    this.sendAnalyticsEvent('Lifecycle', 'App Loaded', true);
  }

  public sendAnalyticsEvent = (category: string, action: string, nonInteraction?: boolean, label?: string) => {
    // ReactGA.event({
    //   category: category,
    //   action: action,
    //   nonInteraction: nonInteraction,
    //   label: label,
    // });
  }

  public closeErrorDialog = () => {
    this.props.dispatch(AppUIActions.setErrorDialogVisible(false));
  }

  // TODO: Create history of errors rather than simply overwriting with most recent?
  public openErrorDialog = (title: string, explanation: string) => {
    this.props.dispatch(AppUIActions.setErrorDialogTitle(title));
    this.props.dispatch(AppUIActions.setErrorDialogExplanation(explanation));
    this.props.dispatch(AppUIActions.setErrorDialogVisible(true));
    this.sendAnalyticsEvent('Error', 'Error Dialog Shown', true);
  }

  public handleSettingsClick = () => {
    this.props.dispatch(AppUIActions.setSettingsOpen(!this.props.appUIState.settingsOpen));
  }

  public render() {
    return (
      <div>
        <ReactMD.NavigationDrawer
          desktopDrawerType='clipped'
          tabletDrawerType='clipped'
          drawerClassName='md-toolbar-relative'
          drawerHeader={<ServiceList openErrorDialog={this.openErrorDialog} />}
          toolbarTitle='Dragoman'
          toolbarActions={
            <ReactMD.Button
              icon={true}
              onClick={this.handleSettingsClick}>
              settings
          </ReactMD.Button>}
          children={
            <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
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
          visible={this.props.appUIState.settingsOpen}
          position='right'
          children={<Settings />}
        />
        <ReactMD.DialogContainer
          id='errorDialog'
          visible={this.props.appUIState.errorDialogVisible}
          modal={true}
          title={this.props.appUIState.errorDialogTitle}
          actions={
            [{
              onClick: this.closeErrorDialog,
              secondary: true,
              label: 'Ok',
            }]
          }
          children={this.props.appUIState.errorDialogExplanation}
        />
      </div>
    );
  }

  private checkRuntimeJavaVersion = () => {
    exec('java -version', (error, stdout, stderr) => {
      if (error) {
        console.error('Error checking java version');
      } else {
        const regex = /java version \"([0-9]+.[0-9]+)/g;
        const match = regex.exec(stderr);

        if (match !== null) {
          const rawJavaVersion = match[1];
          const parsedJavaVersion = parseFloat(rawJavaVersion);
          if (!isNaN(parsedJavaVersion) && parsedJavaVersion < 1.8) {
            this.openErrorDialog('Java Runtime Version Error', 'Polyglot requires version >= 1.8');
            this.sendAnalyticsEvent('Error', 'Java Runtime Too Low', true, `Version ${parsedJavaVersion}`);
          }
        }
      }
    });
  }
}

function mapStateToProps(state: AppProps): AppProps {
  return state;
}

export default connect(mapStateToProps)(App);
