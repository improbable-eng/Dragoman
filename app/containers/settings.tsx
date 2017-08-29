/* tslint:disable:no-console */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Settings, { SettingsComponentMethods, SettingsComponentState } from '../components/settings';

import { AppState } from '../reducers/index';
import { SETTINGS_IDS } from '../reducers/settingsData';

import {
  ValidatePathsRequest, ValidatePathsResponse,
} from '../ipc/index';

const ipcConstants = require('../ipc/constants');
import { ipcRenderer, dialog } from 'electron';

import * as SettingsDataActions from '../actions/settingsData';
import * as SettingsUIActions from '../actions/settingsUI';

/** Validates that the endpoint is entered in the valid host:port format required by polyglot.
 * @param {string} newEndpoint - The endpoint to test for validity
 * @returns {boolean} - The validitiy of endpoint
  */
function validateEndpoint(newEndpoint: string) {
  return /[^\:]+:[0-9]+/.test(newEndpoint);
}

function handleEndpointChangeAndError(newEndpoint: string) {
  return (dispatch: Dispatch<AppState>) => {
    dispatch(SettingsDataActions.setEndpoint(newEndpoint));
    dispatch(SettingsUIActions.setEndpointError(!validateEndpoint(newEndpoint)));
  };
}

/** Handles when a text input field corresponding to a path has fired  the onBlur event. The path(s) will be validated
 * to check that they exist. This must be done by the main process. An event is passed to ipcMain which will check validity
 * and then return the result asynchronously.
 * @param {string} stateId - The ID of the text field: one of the IDs defined in '../reducers/settingsData'
 * @returns {void}
  */
function handlePathBlur(stateId: string) {
  return (dispatch: Dispatch<AppState>, getState: () => AppState) => {
    console.log(`Handling path blur from ${stateId}`);

    let pathArray: string[];

    switch (stateId) {
      case SETTINGS_IDS.PROTO_DISCOVERY_ROOT:
        if (getState().settingsState.settingsDataState.protoDiscoveryRoot === '') {
          dispatch(SettingsUIActions.setProtoDiscoveryRootError(false));
          return;
        } else {
          pathArray = [getState().settingsState.settingsDataState.protoDiscoveryRoot];
        }
        break;
      case SETTINGS_IDS.CONFIG_SET_PATH:
        if (getState().settingsState.settingsDataState.configSetPath === '') {
          dispatch(SettingsUIActions.setConfigSetPathError(false));
          return;
        } else {
          pathArray = [getState().settingsState.settingsDataState.configSetPath];
        }
        break;
      case SETTINGS_IDS.ADD_PROTOC_INCLUDES:
        if (getState().settingsState.settingsDataState.addProtocIncludes === '') {
          dispatch(SettingsUIActions.setAddProtocIncludesError([]));
          return;
        } else {
          pathArray = getState().settingsState.settingsDataState.addProtocIncludes
            .split(',')
            .map(elem => elem.trim());
        }
        break;
      case SETTINGS_IDS.TLS_CA_CERT_PATH:
        if (getState().settingsState.settingsDataState.tlsCaCertPath === '') {
          dispatch(SettingsUIActions.setTlsCaCertPathError(false));
          return;
        } else {
          pathArray = [getState().settingsState.settingsDataState.tlsCaCertPath];
        }
        break;
      default:
        console.error(`Unknown settings state id ${stateId} passed to handlePathBlur`);
        return;
    }

    console.log(`Validating paths ${pathArray} from  ${stateId}`);

    const validatePathsRequest: ValidatePathsRequest = {
      paths: pathArray,
      id: stateId,
    };

    ipcRenderer.once(ipcConstants.VALIDATE_PATHS_RESPONSE,
      (event: Event, response: ValidatePathsResponse) => validateSystemPathResponse(response, dispatch));
    ipcRenderer.send(ipcConstants.VALIDATE_PATHS_REQUEST, validatePathsRequest);
  };
}

/** Handles the response from the validate system path request.
 * @param {ValidatePathsResponsestring} res - The response from the main process containing the validity of the paths, and the settings ID.
 * @param {Dispatch<AppState>} dispatch - The dispatch method to alter the store.
 * @returns {void}
  */
function validateSystemPathResponse(res: ValidatePathsResponse, dispatch: Dispatch<AppState>) {
  console.log('Received validate paths response: ', res);

  switch (res.id) {
    case SETTINGS_IDS.PROTO_DISCOVERY_ROOT:
      dispatch(SettingsUIActions.setProtoDiscoveryRootError(!res.validPaths[0]));
      return;
    case SETTINGS_IDS.CONFIG_SET_PATH:
      dispatch(SettingsUIActions.setConfigSetPathError(!res.validPaths[0]));
      return;
    case SETTINGS_IDS.ADD_PROTOC_INCLUDES:
      dispatch(SettingsUIActions.setAddProtocIncludesError(res.validPaths.map(elem => !elem)));
      return;
    case SETTINGS_IDS.TLS_CA_CERT_PATH:
      dispatch(SettingsUIActions.setTlsCaCertPathError(!res.validPaths[0]));
      return;
    default:
      console.error(`Unknown settings state id ${res.id} passed to validateSystemPathResponse`);
      return;
  }
}

/** Shows the native directory dialog to allow users to input a file or directory path.
 * @param {string} id - The ID of the text field: one of the IDs defined in '../reducers/settingsData'
 * @param {string} macMessage - The description to show with the dialog explaining what needs to be selected
 * @param {boolean} multiSelection - Whether multiple paths can be selected or not.
 * @returns {void}
  */
function showDirectoryDialog(id: string, macMessage: string = '', multiSelection: boolean = false, dispatch: Dispatch<AppState>) {
  console.log('showingDirectoryDialog');
  const customProperties = ['openDirectory', 'openFile', 'showHiddenFiles'];

  if (multiSelection) { customProperties.push('multiSelections'); }

  const pathList = dialog.showOpenDialog({
    properties: customProperties,
    message: macMessage,
  } as Electron.OpenDialogOptions);

  console.log('Paths ', pathList, ' selected using path finder dialog');

  if (multiSelection) {
    switch (id) {
      case SETTINGS_IDS.ADD_PROTOC_INCLUDES:
        dispatch(SettingsDataActions.setAddProtocIncludes(pathList.join(', ')));
        return;
      default:
        console.error(`Unknown settings state id ${id} passed to showDirectoryDialog`);
        return;
    }
  } else {
    const path = (pathList.length >= 1) ? pathList[0] : '';
    switch (id) {
      case SETTINGS_IDS.PROTO_DISCOVERY_ROOT:
        dispatch(SettingsDataActions.setProtoDiscoveryRoot(path));
        return;
      case SETTINGS_IDS.CONFIG_SET_PATH:
        dispatch(SettingsDataActions.setConfigSetPath(path));
        return;
      case SETTINGS_IDS.TLS_CA_CERT_PATH:
        dispatch(SettingsDataActions.setTlsCaCertPath(path));
        return;
      default:
        console.error(`Unknown settings state id ${id} passed to showDirectoryDialog`);
        return;
    }
  }
}

/** Function required by react-redux connect, maps from the main state in the redux store to the props required
 * for the settings component.
 * @param {AppState} state - The state of the redux store
 * @returns {SettingsComponentState} - The slice of @param state required for the settings component
  */
function mapStateToProps(state: AppState): SettingsComponentState {
  return {
    settingsDataState: state.settingsState.settingsDataState,
    settingsUIState: state.settingsState.settingsUIState,
  };
}

/** Function required by react-redux connect, provides the dispatch method to any prop functions that require the ability to
 * update the store.
 * @param {Dispatch<AppState>} dispatch - The dispatch method to send actions to the reducers for the store.
 * @returns {SettingsComponentMethods} - The methods required by the settings component
  */
function mapDispatchToProps(dispatch: Dispatch<AppState>): SettingsComponentMethods {
  return {
    handleEndpointChange: (newEndpoint: string) => dispatch(handleEndpointChangeAndError(newEndpoint)), // onEndpointChange(dispatch, newEndpoint),
    handleProtoDiscoveryRootChange: (newProtoDiscoveryRoot: string) => dispatch(SettingsDataActions.setProtoDiscoveryRoot(newProtoDiscoveryRoot)),
    handleConfigSetPathChange: (newConfigSetPath: string) => dispatch(SettingsDataActions.setConfigSetPath(newConfigSetPath)),
    handleConfigNameChange: (newConfigName: string) => dispatch(SettingsDataActions.setConfigName(newConfigName)),
    handleTlsCaCertPathChange: (newTlsCaCertPath: string) => dispatch(SettingsDataActions.setTlsCaCertPath(newTlsCaCertPath)),
    handleDeadlineMsChange: (newDeadlineMs: number) => dispatch(SettingsDataActions.setDeadlineMs(newDeadlineMs)),
    handleAddProtocIncludesChange: (newAddProtocIncludes: string) => dispatch(SettingsDataActions.setAddProtocIncludes(newAddProtocIncludes)),
    handlePathDoubleClick: (id: string, macMessage?: string, multiSelection?: boolean) => showDirectoryDialog(id, macMessage, multiSelection, dispatch),
    handlePathBlur: (id: string) => dispatch(handlePathBlur(id)), // Dummy will be overwritten in mergeProps
  };
}

export default (connect(mapStateToProps, mapDispatchToProps)(Settings));
