/* tslint:disable:no-console */
import * as ReactGA from 'react-ga';
import { Dispatch, connect } from 'react-redux';
import { exec } from 'child_process';

import * as AppUIActions from '../actions/appUI';
import * as ResponseViewerActions from '../actions/responseViewer';

import { AppState } from '../reducers/index';
import { ErrorDialogState } from '../reducers/appUI';

import AppComponent, { AppComponentMethods, AppComponentState } from '../components/app';

export const checkConsoleErrorMessage = 'Check the logs.';
export const DEV_PATH_TO_POLYGLOT_BINARY = `${process.cwd()}/app/polyglot_deploy.jar`;

/** Sends an event to google analytics.
 * @param {string} category - The analytics category
 * @param {string} action - The analytics action
 * @param {boolean?} nonInteraction - Whether the event was triggered directly by a user action
 * @param {string} label - The analytics label
 * @returns {(dispatch: Dispatch<AppState>, getState: () => AppState) => void} - The function to be run by redux-thunk.
  */
function sendAnalyticsEvent(category: string, action: string, nonInteraction?: boolean, label?: string) {
  // ReactGA is only initialized after consent has been given for analytics to be gathered. If ReactGA has not
  // been initialised then this event does nothing.

  // TODO: This does not currently work. Either remove or fix.
  ReactGA.event({
    category: category,
    action: action,
    nonInteraction: nonInteraction,
    label: label,
  });
}

/** Closes the currently displayed modal dialog. If there is another dialog in the queue the dialog contents
 * are changed, or if the queue is then empty the dialog will be hidden. Returns a redux-thunk action which must be
 * dispatched.
 * @returns {(dispatch: Dispatch<AppState>, getState: () => AppState) => void} - The function to be run by redux-thunk.
  */
function closeDialog() {
  return (dispatch: Dispatch<AppState>, getState: () => AppState) => {
    console.log('closeDialog');
    if (getState().appUIState.errorDialogQueue.length <= 1) {
      dispatch(AppUIActions.setErrorDialogVisible(false));
    }
    dispatch(AppUIActions.dequeueErrorDialogState());
  };
}

/** Opens the modal dialog to allow simple confirm/deny functionality from the user. Attaches callback functions to
 * the buttons and assigns title and explanation text. Returns a redux-thunk which must be dispatched.
 * @returns {(dispatch: Dispatch<AppState>, getState: () => AppState) => void} - The function to be run by redux-thunk.
  */
function openDialog(title: string, explanation: string, onAccept?: () => void, onCancel?: () => void) {
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

/** Displays a notification with title and body to the user. If permission is not granted the notification is logged to the console.
 * @returns {void}
  */
function showNotification(title: string, body: string) {
  const notification = new Notification(title, {
    body: body,
  });

  if (notification.permission !== 'granted') {
    console.error(`Failed to show notification: Title: ${title} Body:${body}`);
  }
}

/** Toggles the settings open state. Returns a redux-thunk which must be dispatched.
 * @returns {(dispatch: Dispatch<AppState>, getState: () => AppState) => void} - The function to be run by redux-thunk.
  */
function handleSettingsClick() {
  return (dispatch: Dispatch<AppState>, getState: () => AppState) => {
    dispatch(AppUIActions.setSettingsOpen(!getState().appUIState.settingsOpen));
  };
}

/** Checks that the runtime version of java meets the minimu required for polyglot. Returns a redux-thunk which must be dispatched.
 * @returns {(dispatch: Dispatch<AppState>, getState: () => AppState) => void} - The function to be run by redux-thunk.
  */
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
            showNotification('Java Runtime Version Error', 'Polyglot requires version >= 1.8');
            sendAnalyticsEvent('Error', 'Java Runtime Too Low', true, `Version ${parsedJavaVersion}`);
          }
        }
      }
    });
  };
}

/** Handles getting consent from users for analytics. Checks whether a google analytics consent cookie exists and is true,
 * otherwise opens a modal dialog. Returns a redux-thunk which must be dispatched.
 * @returns {(dispatch: Dispatch<AppState>, getState: () => AppState) => void} - The function to be run by redux-thunk.
  */
function handleAnalyticsConsent() {
  return (dispatch: Dispatch<AppState>) => {
    const gaConsent = getCookie('_gaConsent');
    console.log('gaConsent', gaConsent);
    if (gaConsent !== undefined && gaConsent === 'true') {
      dispatch(gotAnalyticsConsent());
    } else {
      const explanation = `Will you allow anonymous usage statistics to be collected?
      This will be used to help development.`;
      dispatch(openDialog('Anonymous Usage Statistics', explanation, () => dispatch(gotAnalyticsConsent())));
    }
  };
}


function gotAnalyticsConsent() {
  return (dispatch: Dispatch<AppState>) => {
    ReactGA.initialize('UA-105606228-1', { debug: true });
    const d = new Date();
    d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
    console.log(document.cookie);
    document.cookie = `_gaConsent=true; expires=${d.toUTCString()}; path=/`;
    console.log(document.cookie);
    dispatch(closeDialog());
  };
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
    handleAnalyticsConsent: () => dispatch(handleAnalyticsConsent()),
    sendAnalyticsEvent: (category: string, action: string, nonInteraction?: boolean, label?: string) => sendAnalyticsEvent(category, action, nonInteraction, label),
    checkRuntimeJavaVersion: () => dispatch(checkRuntimeJavaVersion()),
    showNotification: (title: string, body: string) => showNotification(title, body),
    clearLogs: () => dispatch(ResponseViewerActions.clearLogs()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
