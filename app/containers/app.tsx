/* tslint:disable:no-console */
import * as React from 'react';
import * as ReactMD from 'react-md';
import * as ReactGA from 'react-ga';

import { Dispatch, connect } from 'react-redux';
import { exec } from 'child_process';

import RequestBuilder from '../containers/requestBuilder';
import ResponseViewer from '../components/responseViewer';
import ModalDialog from '../components/modalDialog';
import ServiceList from '../containers/serviceList';
import Settings from '../containers/settings';

import * as AppUIActions from '../actions/appUI';

import { AppState } from '../reducers/index';
import { ErrorDialogState } from '../reducers/appUI';

export const checkConsoleErrorMessage = 'Check console for full log (Console can be reached from View' +
  ' -> Toggle Developer Tools -> Console)';

type AppProps = AppState & { dispatch: Dispatch<{}> };

class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    this.checkRuntimeJavaVersion();
    this.handleAnalyticsConsent();
    this.sendAnalyticsEvent('Lifecycle', 'App Loaded', true);
  }

  public sendAnalyticsEvent = (category: string, action: string, nonInteraction?: boolean, label?: string) => {
    // ReactGA is only initialized after consent has been given for analytics to be gathered. If ReactGA has not
    // been initialised then this event does nothing.
    ReactGA.event({
      category: category,
      action: action,
      nonInteraction: nonInteraction,
      label: label,
    });
  }

  public closeDialog = () => {
    if (this.props.appUIState.errorDialogQueue.length <= 1) {
      this.props.dispatch(AppUIActions.setErrorDialogVisible(false));
    }
    this.props.dispatch(AppUIActions.dequeueErrorDialogState());
  }

  public openDialog = (title: string, explanation: string, cancelButtonAvailable?: boolean,
    onAccept?: () => void, onCancel?: () => void) => {

    const dialogState: ErrorDialogState = {
      errorDialogTitle: title,
      errorDialogExplanation: explanation,
      onAccept: onAccept,
      cancelButtonAvailable: cancelButtonAvailable,
      onCancel: onCancel,
    };

    const myNotifcation = new Notification('Title', {
      body: 'Lorem Ipsum Dolor Sit Amet',
    });
    console.log(myNotifcation);

    this.props.dispatch(AppUIActions.enqueueErrorDialogState(dialogState));
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
          drawerHeader={<ServiceList openDialog={this.openDialog} />}
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
                closeDialog={this.closeDialog}
                openDialog={this.openDialog}
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
          onVisibilityChange={() => {/**/}} // Suppress spurious react-md error
        />
        <ModalDialog
          appUIState={this.props.appUIState}
          defaultCloseDialog={this.closeDialog}
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
            this.openDialog('Java Runtime Version Error', 'Polyglot requires version >= 1.8');
            this.sendAnalyticsEvent('Error', 'Java Runtime Too Low', true, `Version ${parsedJavaVersion}`);
          }
        }
      }
    });
  }

  private handleAnalyticsConsent = () => {
    const gaConsent = this.getCookie('_gaConsent');
    if (gaConsent !== undefined && gaConsent === 'true') {
      this.gotAnalyticsConsent();
    } else {
      this.showAnalyticsPermissionRequest();
    }
  }

  private showAnalyticsPermissionRequest = () => {
    const explanation = `Will you allow anonymous usage statistics to be collected?
    This will be used to help development.`;
    this.openDialog('Anonymous Usage Statistics', explanation, true, this.gotAnalyticsConsent);
  }

  private gotAnalyticsConsent = () => {
    ReactGA.initialize('UA-105606228-1', { debug: true });
    const d = new Date();
    d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
    document.cookie = `_gaConsent=true; expires=${d.toUTCString()}; path=/`;
    this.closeDialog();
  }

  private getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()!.split(';').shift();
    } else {
      return;
    }
  }
}

function mapStateToProps(state: AppProps): AppProps {
  return state;
}

export default connect(mapStateToProps)(App);
