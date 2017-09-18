/* tslint:disable:no-console */
import { remote } from 'electron';
import { Dispatch, connect } from 'react-redux';
import { exec } from 'child_process';
import * as path from 'path';

import * as AppUIActions from '../actions/appUI';
import * as ResponseViewerActions from '../actions/responseViewer';

import { AppState } from '../reducers/index';
import { ErrorDialogState } from '../reducers/appUI';

import AppComponent, { AppComponentMethods, AppComponentState } from '../components/app';

export const checkConsoleErrorMessage = 'Check the logs.';
export const DEV_PATH_TO_POLYGLOT_BINARY = `${process.cwd()}/app/polyglot_deploy.jar`;
export const PROD_PATH_TO_POLYGLOT_BINARY = path.join(remote.app.getAppPath(), 'polyglot_deploy.jar').replace('app.asar', 'app.asar.unpacked');


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
  };
}

/** Displays a notification with title and body to the user. If permission is not granted the notification is logged to the console.
 * @returns {void}
  */
function showNotification(title: string, body: string) {
  const notification = new Notification(title, {
    body: body,
  });
  console.log(`Showing notification ${notification}`);
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
          }
        }
      }
    });
  };
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
    checkRuntimeJavaVersion: () => dispatch(checkRuntimeJavaVersion()),
    showNotification: (title: string, body: string) => showNotification(title, body),
    clearLogs: () => dispatch(ResponseViewerActions.clearLogs()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
