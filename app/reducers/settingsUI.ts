import { isActionOfType, Action } from '../actions/actions';
import * as SettingsUIActions from '../actions/settingsUI';

export type SettingsUIState = Readonly<{
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
  endpointRequired: false,
  endpointError: false,
  protoDiscoveryRootError: false,
  configSetPathError: false,
  tlsCaCertPathError: false,
  addProtocIncludesErrors: [],
};

export default function settingsUIReducer(state: SettingsUIState = initialSettingsUIState, action: Action<any>): SettingsUIState {

  if (isActionOfType(action, SettingsUIActions.setEndpointRequired)) {
    return {
      ...state,
      endpointRequired: action.payload,
    };
  }
  if (isActionOfType(action, SettingsUIActions.setEndpointError)) {
    return {
      ...state,
      endpointError: action.payload,
    };
  }
  if (isActionOfType(action, SettingsUIActions.setProtoDiscoveryRootError)) {
    return {
      ...state,
      protoDiscoveryRootError: action.payload,
    };
  }
  if (isActionOfType(action, SettingsUIActions.setConfigSetPathError)) {
    return {
      ...state,
      configSetPathError: action.payload,
    };
  }
  if (isActionOfType(action, SettingsUIActions.setTlsCaCertPathError)) {
    return {
      ...state,
      tlsCaCertPathError: action.payload,
    };
  }
  if (isActionOfType(action, SettingsUIActions.setAddProtocIncludesError)) {
    return {
      ...state,
      addProtocIncludesErrors: action.payload,
    };
  }
  return state;
}
