/* tslint:disable:no-console */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { remote } from 'electron';
import { accessSync } from 'fs';
import * as validUrl from 'valid-url';
import * as fs from 'fs';

import Settings, { SettingsComponentMethods, SettingsComponentState } from '../components/settings';

import { AppState } from '../reducers/index';
import { SETTINGS_IDS } from '../reducers/settingsData';

import * as SettingsDataActions from '../actions/settingsData';
import * as SettingsUIActions from '../actions/settingsUI';

import { polyglot as polyglotConfig } from '../proto/config';

function handleChangeAndError(newValue: string | boolean, stateId: string, dispatch: Dispatch<AppState>) {
  switch (stateId) {
    case SETTINGS_IDS.ENDPOINT:
      const endpoint = newValue as string;
      const endpointError = (endpoint === '') ? false : !validateEndpoint(endpoint);
      dispatch(SettingsDataActions.setEndpoint(endpoint));
      dispatch(SettingsUIActions.setEndpointError(endpointError));
      break;
    case SETTINGS_IDS.PROTO_DISCOVERY_ROOT:
      const protoDiscoveryRoot = newValue as string;
      const protoDiscoveryRootError = (protoDiscoveryRoot === '') ? false : !validatePath(protoDiscoveryRoot);
      dispatch(SettingsDataActions.setProtoDiscoveryRoot(protoDiscoveryRoot));
      dispatch(SettingsUIActions.setProtoDiscoveryRootError(protoDiscoveryRootError));
      break;
    case SETTINGS_IDS.ADD_PROTOC_INCLUDES:
      const addProtocIncludes = newValue as string;
      const pathArray = addProtocIncludes.split(',').map(elem => elem.trim());
      const addProtocIncludesErrors = (addProtocIncludes === '') ? [] : validatePaths(pathArray).map(elem => !elem);
      dispatch(SettingsDataActions.setAddProtocIncludes(addProtocIncludes));
      dispatch(SettingsUIActions.setAddProtocIncludesError(addProtocIncludesErrors));
      break;
    case SETTINGS_IDS.DEADLINE_MS:
      const deadlineMs = newValue as string;
      const parsedDeadline = parseInt(deadlineMs, 10);
      if (!isNaN(parsedDeadline)) {
        dispatch(SettingsDataActions.setDeadlineMs(parsedDeadline));
      } else {
        // A negative deadline is a placeholder for being unset
        dispatch(SettingsDataActions.setDeadlineMs(-1));
      }
      break;
    case SETTINGS_IDS.CONFIG_NAME:
      const configName = newValue as string;
      dispatch(SettingsDataActions.setConfigName(configName));
      break;
    case SETTINGS_IDS.OAUTH_REFRESH_TOKEN_ENDPOINT_URL:
      const oauthRefreshTokenEndpointUrl = newValue as string;
      const oauthRefreshTokenEndpointUrlError = (oauthRefreshTokenEndpointUrl === '') ? false : !validateUri(oauthRefreshTokenEndpointUrl);
      dispatch(SettingsDataActions.setOauthRefreshTokenEndpointUrl(oauthRefreshTokenEndpointUrl));
      dispatch(SettingsUIActions.setOauthRefreshTokenEndpointUrlError(oauthRefreshTokenEndpointUrlError));
      break;
    case SETTINGS_IDS.OAUTH_CLIENT_ID:
      const oauthClientId = newValue as string;
      dispatch(SettingsDataActions.setOauthClientId(oauthClientId));
      break;
    case SETTINGS_IDS.OAUTH_CLIENT_SECRET:
      const oauthClientSecret = newValue as string;
      dispatch(SettingsDataActions.setOauthClientSecret(oauthClientSecret));
      break;
    case SETTINGS_IDS.OAUTH_REFRESH_TOKEN_PATH:
      const oauthRefreshTokenPath = newValue as string;
      const oauthRefreshTokenPathError = (oauthRefreshTokenPath === '') ? false : !validatePath(oauthRefreshTokenPath);
      dispatch(SettingsDataActions.setOauthRefreshTokenPath(oauthRefreshTokenPath));
      dispatch(SettingsUIActions.setOauthRefreshTokenPathError(oauthRefreshTokenPathError));
      break;
    case SETTINGS_IDS.OAUTH_ACCESS_TOKEN_PATH:
      const oauthAccessTokenPath = newValue as string;
      const oauthAccessTokenPathError = (oauthAccessTokenPath === '') ? false : !validatePath(oauthAccessTokenPath);
      dispatch(SettingsDataActions.setOauthAccessTokenPath(oauthAccessTokenPath));
      dispatch(SettingsUIActions.setOauthAccessTokenPathError(oauthAccessTokenPathError));
      break;
    case SETTINGS_IDS.USE_TLS:
      const useTls = newValue as boolean;
      dispatch(SettingsDataActions.setUseTls(useTls));
      break;
    case SETTINGS_IDS.TLS_CA_CERT_PATH:
      const tlsCaCertPath = newValue as string;
      const tlsCaCertPathError = (tlsCaCertPath === '') ? false : !validatePath(tlsCaCertPath);
      dispatch(SettingsDataActions.setTlsCaCertPath(tlsCaCertPath));
      dispatch(SettingsUIActions.setTlsCaCertPathError(tlsCaCertPathError));
      break;
    // TODO: ADD CHANGE TLS cases
    case SETTINGS_IDS.TLS_CLIENT_CERT_PATH:
      const tlsClientCertPath = newValue as string;
      const tlsClientCertPathError = (tlsClientCertPath === '') ? false : !validatePath(tlsClientCertPath);
      dispatch(SettingsDataActions.setTlsClientCertPath(tlsClientCertPath));
      dispatch(SettingsUIActions.setTlsClientCertPathError(tlsClientCertPathError));
      break;
    case SETTINGS_IDS.TLS_CLIENT_KEY_PATH:
      const tlsClientKeyPath = newValue as string;
      const tlsClientKeyPathError = (tlsClientKeyPath === '') ? false : !validatePath(tlsClientKeyPath);
      dispatch(SettingsDataActions.setTlsClientKeyPath(tlsClientKeyPath));
      dispatch(SettingsUIActions.setTlsClientKeyPathError(tlsClientKeyPathError));
      break;
    case SETTINGS_IDS.TLS_CLIENT_OVERRIDE_AUTHORITY:
      // TODO?: Find out what format this is supposed to adhere to and validate the input.
      const tlsClientOverrideAuthority = newValue as string;
      dispatch(SettingsDataActions.setTlsClientOverrideAuthority(tlsClientOverrideAuthority));
      break;
    default:
      console.error(`Unknown settings state id ${stateId} passed to handlePathBlur`);
      break;
  }
}

function validateUri(uri: string): boolean {
  const validatedUri = validUrl.isUri(uri);
  return validatedUri !== undefined;
}

function validatePath(path: string): boolean {
  return validatePaths([path])[0];
}

/* A method for checking if local paths are valid, takes a list of strings and returns a list of booleans.
   The id is passed straight back to allow the renderer to identify which component sent the request */
function validatePaths(paths: string[]): boolean[] {
  const validPathList = [];
  for (const path of paths) {
    try {
      accessSync(path);
      validPathList.push(true);
    } catch (err) {
      console.warn(path, ' does not exist');
      validPathList.push(false);
    }
  }
  return validPathList;
}

/** Validates that the endpoint is entered in the valid host:port format required by polyglot.
 * @param {string} newEndpoint - The endpoint to test for validity
 * @returns {boolean} - The validitiy of endpoint
  */
function validateEndpoint(newEndpoint: string) {
  return /[^\:]+:[0-9]+/.test(newEndpoint);
}

/** Shows the native directory dialog to allow users to input a file or directory path.
 * @param {string} id - The ID of the text field: one of the IDs defined in '../reducers/settingsData'
 * @param {string} macMessage - The description to show with the dialog explaining what needs to be selected
 * @param {boolean} multiSelection - Whether multiple paths can be selected or not.
 * @returns {void}
  */
function showDirectoryDialog(id: string, macMessage: string = '', multiSelection: boolean = false, dispatch: Dispatch<AppState>) {
  const customProperties = ['openDirectory', 'openFile', 'showHiddenFiles'];

  if (multiSelection) { customProperties.push('multiSelections'); }

  const pathList = remote.dialog.showOpenDialog({
    properties: customProperties,
    message: macMessage,
  } as Electron.OpenDialogOptions);

  // Pressed cancel
  if (pathList === undefined) {
    return;
  }

  if (multiSelection) {
    handleChangeAndError(pathList.join(', '), id, dispatch);
  } else {
    const path = (pathList.length >= 1) ? pathList[0] : '';
    handleChangeAndError(path, id, dispatch);
  }
}

function handleDrop(event: React.DragEvent<HTMLElement>, id: string, multiSelection = false, dispatch: Dispatch<AppState>) {
  if (multiSelection) {
    const pathList = Array.from(event.dataTransfer.files).map(elem => elem.path).join(', ');
    handleChangeAndError(pathList, id, dispatch);
  } else {
    const path = (event.dataTransfer.files.length >= 1) ? event.dataTransfer.files[0].path : '';
    handleChangeAndError(path, id, dispatch);
  }
}

function importConfig(dispatch: Dispatch<AppState>) {
    const customProperties = ['openFile', 'showHiddenFiles'];

    const pathList = remote.dialog.showOpenDialog({
      properties: customProperties,
      message: 'Open polyglot config file',
    } as Electron.OpenDialogOptions);

    if (pathList === undefined || pathList.length === 0) {
      return;
    }

    const rawFile = fs.readFileSync(pathList[0]);
    const decodedFile = new TextDecoder('utf-8').decode(rawFile);
    const parsedJson = JSON.parse(decodedFile);
    const fromJson = polyglotConfig.ConfigurationSet.fromObject(parsedJson);
    dispatch(SettingsDataActions.importPolyglotConfigs(fromJson));

    // By default should load the first configuration settings as polyglot does
    if (fromJson.configurations.length > 0 && fromJson.configurations[0].name !== undefined) {
      dispatch(handleConfigAutoComplete(fromJson.configurations[0].name as string));
    }
}

function handleConfigAutoComplete(suggestion: string) {
  return (dispatch: Dispatch<AppState>, getState: () => AppState) => {
    dispatch(SettingsDataActions.setConfigName(suggestion));
    const selectedConfig = getState().settingsState.settingsDataState.polyglotConfigs.get(suggestion);

    if (selectedConfig != null) {
      dispatch(SettingsDataActions.setSettingsDataStateFromPolyglotConfig(selectedConfig));
    }
  };
}

function saveConfig() {
  return (dispatch: Dispatch<AppState>, getState: () => AppState) => {
    dispatch(SettingsDataActions.addPolyglotConfigFromCurrentFields());

    const pathList = remote.dialog.showSaveDialog({
      message: 'Save polyglot config to file',
    } as Electron.OpenDialogOptions);

    const polyglotConfigSet = polyglotConfig.ConfigurationSet.create({
      configurations: Array.from(getState().settingsState.settingsDataState.polyglotConfigs, ([key, val]) => {
        return val;
      }),
    });

    fs.writeFileSync(pathList, JSON.stringify(polyglotConfigSet.toJSON()), (error: NodeJS.ErrnoException) => {
      console.error(error);
    });
  };
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
    handleChange: (newEndpoint: string, stateId: string) => handleChangeAndError(newEndpoint, stateId, dispatch),
    handlePathDoubleClick: (id: string, macMessage?: string, multiSelection?: boolean) => showDirectoryDialog(id, macMessage, multiSelection, dispatch),
    handleDrop: (event: React.DragEvent<HTMLElement>, id: string, multiSelection?: boolean) => handleDrop(event, id, multiSelection, dispatch),
    importConfigFile: () => importConfig(dispatch),
    saveConfigFile: () => dispatch(saveConfig()),
    handleConfigAutoComplete: (suggestion: string) => dispatch(handleConfigAutoComplete(suggestion)),
  };
}

export default (connect(mapStateToProps, mapDispatchToProps)(Settings));
