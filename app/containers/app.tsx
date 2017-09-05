/* tslint:disable:no-console */
import * as ReactGA from 'react-ga';

import { Dispatch, connect } from 'react-redux';
import { exec } from 'child_process';

import * as AppUIActions from '../actions/appUI';

import { AppState } from '../reducers/index';
import { ErrorDialogState } from '../reducers/appUI';

import AppComponent,
{ AppComponentMethods, AppComponentState } from '../components/app';

export const checkConsoleErrorMessage = 'Check console for full log (Console can be reached from View' +
  ' -> Toggle Developer Tools -> Console)';

function sendAnalyticsEvent(category: string, action: string, nonInteraction?: boolean, label?: string) {
  // ReactGA is only initialized after consent has been given for analytics to be gathered. If ReactGA has not
  // been initialised then this event does nothing.
  ReactGA.event({
    category: category,
    action: action,
    nonInteraction: nonInteraction,
    label: label,
  });
}

function closeDialog() {
  return (dispatch: Dispatch<AppState>, getState: () => AppState) => {
    console.log('closeDialog');
    if (getState().appUIState.errorDialogQueue.length <= 1) {
      dispatch(AppUIActions.setErrorDialogVisible(false));
    }
    dispatch(AppUIActions.dequeueErrorDialogState());
  };
}

function openDialog(title: string, explanation: string,
  onAccept?: () => void, onCancel?: () => void) {
  return (dispatch: Dispatch<AppState>) => {
    const dialogState: ErrorDialogState = {
      errorDialogTitle: title,
      errorDialogExplanation: explanation,
      onAccept: onAccept,
      onCancel: onCancel,
    };

    dispatch(AppUIActions.enqueueErrorDialogState(dialogState));
    dispatch(AppUIActions.setErrorDialogVisible(true));
    sendAnalyticsEvent('Error', 'Error Dialog Shown', true);
  };
}

function showNotification(title: string, body: string) {
  console.log('showNotificaiton');
  const notify = new Notification(title, {
    body: body,
  });

  notify.onerror = (e: Event) => {
    console.error(`Notification error ${e}`);
  };
}

function handleSettingsClick() {
  return (dispatch: Dispatch<AppState>, getState: () => AppState) => {
    dispatch(AppUIActions.setSettingsOpen(!getState().appUIState.settingsOpen));
  };
}

function checkRuntimeJavaVersion() {
  return (dispatch: Dispatch<AppState>) => {
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
            dispatch(openDialog('Java Runtime Version Error', 'Polyglot requires version >= 1.8'));
            sendAnalyticsEvent('Error', 'Java Runtime Too Low', true, `Version ${parsedJavaVersion}`);
          }
        }
      }
    });
  };
}

function handleAnalyticsConsent(dispatch: Dispatch<AppState>) {
  const gaConsent = getCookie('_gaConsent');
  console.log('gaConsent', gaConsent);
  if (gaConsent !== undefined && gaConsent === 'true') {
    gotAnalyticsConsent(dispatch);
  } else {
    showAnalyticsPermissionRequest(dispatch);
  }
}

function showAnalyticsPermissionRequest(dispatch: Dispatch<AppState>) {
  const explanation = `Will you allow anonymous usage statistics to be collected?
    This will be used to help development.`;
  dispatch(openDialog('Anonymous Usage Statistics', explanation, () => gotAnalyticsConsent(dispatch)));
}

function gotAnalyticsConsent(dispatch: Dispatch<AppState>) {
  console.log('gotAnalyticsConsent');
  ReactGA.initialize('UA-105606228-1', { debug: true });
  const d = new Date();
  d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
  console.log(document.cookie);
  document.cookie = `_gaConsent=true; expires=${d.toUTCString()}; path=/`;
  console.log(document.cookie);
  dispatch(closeDialog());
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()!.split(';').shift();
  } else {
    return;
  }
}

function mapStateToProps(state: AppState): AppComponentState {
  return {
    appState: state,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>): AppComponentMethods {
  return {
    closeDialog: () => dispatch(closeDialog()),
    openDialog: (title: string, explanation: string, onAccept?: () => void, onCancel?: () => void) => dispatch(openDialog(title, explanation, onAccept, onCancel)),
    handleSettingsClick: () => dispatch(handleSettingsClick()),
    handleAnalyticsConsent: () => handleAnalyticsConsent(dispatch),
    sendAnalyticsEvent: (category: string, action: string, nonInteraction?: boolean, label?: string) => sendAnalyticsEvent(category, action, nonInteraction, label),
    checkRuntimeJavaVersion: () => dispatch(checkRuntimeJavaVersion()),
    showNotification: (title: string, body: string) => showNotification(title, body),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
