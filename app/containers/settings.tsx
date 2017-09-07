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

/** Handles the change of the value of one of the settings inputs.
 * @param {string | boolean} newValue - The new value of the field.
 * @param {SETTINGS_IDS} settingsID - The id of the state to change. Should be one
 * @returns {(dispatch: Dispatch<AppState>, getState: () => AppState) => void} - The function to be run by redux-thunk.
  */
function handleChangeAndError(newValue: string | boolean, settingsID: SETTINGS_IDS) {
  return (dispatch: Dispatch<AppState>, getState: () => AppState) => {
    switch (settingsID) {
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
        // TODO: Find out what format this is supposed to adhere to and validate the input.
        const tlsClientOverrideAuthority = newValue as string;
        dispatch(SettingsDataActions.setTlsClientOverrideAuthority(tlsClientOverrideAuthority));
        break;
      default:
        assertUnreachable(settingsID);
        console.error(`Unknown settings state id ${settingsID} passed to handlePathBlur`);
        break;
    }
  };
}

/** Compile time checking that the switch is exhaustive.
 * @param {never} x - The switch variable to check
 * @returns {never}
  */
function assertUnreachable(x: never): never {
  throw new Error(`Didn't expect to get here`);
}

/** Validates a URI
 * @param {string} - The uri to test for validity
 * @returns {boolean} - The validity of the uri
  */
function validateUri(uri: string): boolean {
  const validatedUri = validUrl.isUri(uri);
  return validatedUri !== undefined;
}

/** Checks the existence of a single local path.
 * @param {string} path - The path to test for validity
 * @returns {boolean} - The validity of the path
  */
function validatePath(path: string): boolean {
  return validatePaths([path])[0];
}

/** Checks that local paths exist
* @param {string[]} paths - The paths to test for validity
* @returns {boolean[]} - The respective validities of the paths
 */
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
 * @returns {boolean} - The validity of the endpoint
  */
function validateEndpoint(newEndpoint: string) {
  return /[^\:]+:[0-9]+/.test(newEndpoint);
}

/** Shows the native directory dialog to allow users to input a file or directory path.
 * @param {string} settingsId - The ID of the text field: one of the IDs defined in '../reducers/settingsData'
 * @param {string} macMessage - The description to show with the dialog explaining what needs to be selected
 * @param {boolean} multiSelection - Whether multiple paths can be selected or not.
 * @returns {(dispatch: Dispatch<AppState>, getState: () => AppState) => void} - The function to be run by redux-thunk.
  */
function handlePathDoubleClick(settingsId: SETTINGS_IDS, macMessage: string = '', multiSelection: boolean = false) {
  return (dispatch: Dispatch<AppState>, getState: () => AppState) => {
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
      dispatch(handleChangeAndError(pathList.join(', '), settingsId));
    } else {
      const path = (pathList.length >= 1) ? pathList[0] : '';
      dispatch(handleChangeAndError(path, settingsId));
    }
  };
}

/** Handles the event where a file is dropped onto the text field.  Returns a redux-thunk which must be dispatched.
 * @param {React.DragEvent<HTMLElement>} event - The drag event fired by the text entry
 * @param {SETTINGS_IDS} settingsId - The id of the input
 * @param {boolean} multiSelection - Whether multiple paths can be selected or not.
 * @returns {(dispatch: Dispatch<AppState>, getState: () => AppState) => void} - The function to be run by redux-thunk.
  */
function handleFileDrop(event: React.DragEvent<HTMLElement>, settingsId: SETTINGS_IDS, multiSelection = false) {
  return (dispatch: Dispatch<AppState>, getState: () => AppState) => {
    if (multiSelection) {
      const pathList = Array.from(event.dataTransfer.files).map(elem => elem.path).join(', ');
      dispatch(handleChangeAndError(pathList, settingsId));
    } else {
      const path = (event.dataTransfer.files.length >= 1) ? event.dataTransfer.files[0].path : '';
      dispatch(handleChangeAndError(path, settingsId));
    }
  };
}

/** Imports a polyglot configuration file from disk.  Returns a redux-thunk which must be dispatched.
 * @returns {(dispatch: Dispatch<AppState>, getState: () => AppState) => void}
  */
function importConfig() {
  return (dispatch: Dispatch<AppState>, getState: () => AppState) => {
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
    const polyglotConfigSet = polyglotConfig.ConfigurationSet.fromObject(parsedJson);
    dispatch(SettingsDataActions.importPolyglotConfigs(polyglotConfigSet));

    // By default should load the first configuration settings as polyglot does
    if (polyglotConfigSet.configurations.length > 0 && polyglotConfigSet.configurations[0].name !== undefined) {
      dispatch(handleConfigAutoComplete(polyglotConfigSet.configurations[0].name as string));
    }
  };
}

/** Searches the polyglotConfigs map in the redux store for the associated config, then populates the UI fields from the
 * found configuration. Returns a redux-thunk which must be dispatched.
 * * @param {string} suggestion - The config name returned by the autocomplete component
 * @returns {(dispatch: Dispatch<AppState>, getState: () => AppState) => void} - The function to be run by redux-thunk.
  */
function handleConfigAutoComplete(suggestion: string) {
  return (dispatch: Dispatch<AppState>, getState: () => AppState) => {
    dispatch(SettingsDataActions.setConfigName(suggestion));
    const selectedConfig = getState().settingsState.settingsDataState.polyglotConfigs.get(suggestion);

    if (selectedConfig != null) {
      dispatch(SettingsDataActions.setSettingsDataStateFromPolyglotConfig(selectedConfig));
    }
  };
}

/** Adds the current settings from the UI input fields to the polyglotConfigs Map in the SettingsDataState of the redux store.
 *  Returns a redux-thunk which must be dispatched.
 * @returns {(dispatch: Dispatch<AppState>, getState: () => AppState) => void} - The function to be run by redux-thunk.
  */
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
    handleChange: (newEndpoint: string, settingsID: SETTINGS_IDS) => dispatch(handleChangeAndError(newEndpoint, settingsID)),
    handlePathDoubleClick: (settingsID: SETTINGS_IDS, macMessage?: string, multiSelection?: boolean) => dispatch(handlePathDoubleClick(settingsID, macMessage, multiSelection)),
    handleDrop: (event: React.DragEvent<HTMLElement>, settingsID: SETTINGS_IDS, multiSelection?: boolean) => dispatch(handleFileDrop(event, settingsID, multiSelection)),
    importConfigFile: () => dispatch(importConfig()),
    saveConfigFile: () => dispatch(saveConfig()),
    handleConfigAutoComplete: (suggestion: string) => dispatch(handleConfigAutoComplete(suggestion)),
  };
}

export default (connect(mapStateToProps, mapDispatchToProps)(Settings));
