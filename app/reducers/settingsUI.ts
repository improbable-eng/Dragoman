import { isActionOfType, Action } from '../actions/actions';
import * as UISettingsActions from '../actions/settingsUI';

export type SettingsUIState = Readonly<{
  settingsOpen: boolean;
  endpointRequired: boolean;
  endpointError: boolean;
  protoDiscoveryRootError: boolean;
  configSetPathError: boolean;
  tlsCaCertPathError: boolean;
  // There can be multiple paths for the addProtocIncludes field, we want to be able to validate each one to provide
  // hints to users as to which path is wrong.
  addProtocIncludesErrors: boolean[];
}>;

const initialSettingsUIState: SettingsUIState = {
  settingsOpen: true,
  endpointRequired: false,
  endpointError: false,
  protoDiscoveryRootError: false,
  configSetPathError: false,
  tlsCaCertPathError: false,
  addProtocIncludesErrors: [],
};

export default function uiSettings(state: SettingsUIState = initialSettingsUIState, action: Action<any>): SettingsUIState {

  if (isActionOfType(action, UISettingsActions.toggleSettingsOpen)) {
    return {
      ...state,
      settingsOpen: !state.settingsOpen,
    };
  }
  if (isActionOfType(action, UISettingsActions.setEndpointRequired)) {
    return {
      ...state,
      endpointRequired: action.payload,
    };
  }
  if (isActionOfType(action, UISettingsActions.setEndpointError)) {
    return {
      ...state,
      endpointError: action.payload,
    };
  }
  if (isActionOfType(action, UISettingsActions.setProtoDiscoveryRootError)) {
    return {
      ...state,
      protoDiscoveryRootError: action.payload,
    };
  }
  if (isActionOfType(action, UISettingsActions.setConfigSetPathError)) {
    return {
      ...state,
      configSetPathError: action.payload,
    };
  }
  if (isActionOfType(action, UISettingsActions.setTlsCaCertPathError)) {
    return {
      ...state,
      tlsCaCertPathError: action.payload,
    };
  }
  if (isActionOfType(action, UISettingsActions.setAddProtocIncludesError)) {
    return {
      ...state,
      addProtocIncludesErrors: action.payload,
    };
  }
  return state;
}
