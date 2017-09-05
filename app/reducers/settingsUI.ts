import { isActionOfType, Action } from '../actions/actions';
import * as SettingsUIActions from '../actions/settingsUI';

export type SettingsUIState = Readonly<{
  endpointRequired: boolean;
  endpointError: boolean;
  protoDiscoveryRootError: boolean;
  configSetPathError: boolean;
  addProtocIncludesErrors: boolean[];
  oauthRefreshTokenEndpointUrlError: boolean;
  oauthRefreshTokenPathError: boolean;
  oauthAccessTokenPathError: boolean;
  tlsCaCertPathError: boolean;
  tlsClientKeyPathError: boolean;
  tlsClientCertPathError: boolean;
  tlsClientOverrideAuthorityError: boolean;
}>;

const initialSettingsUIState: SettingsUIState = {
  endpointRequired: false,
  endpointError: false,
  protoDiscoveryRootError: false,
  configSetPathError: false,
  addProtocIncludesErrors: [],
  oauthRefreshTokenEndpointUrlError: false,
  oauthRefreshTokenPathError: false,
  oauthAccessTokenPathError: false,
  tlsCaCertPathError: false,
  tlsClientKeyPathError: false,
  tlsClientCertPathError: false,
  tlsClientOverrideAuthorityError: false,
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
  if (isActionOfType(action, SettingsUIActions.setAddProtocIncludesError)) {
    return {
      ...state,
      addProtocIncludesErrors: action.payload,
    };
  }
  if (isActionOfType(action, SettingsUIActions.setOauthRefreshTokenEndpointUrlError)) {
    return {
      ...state,
      oauthRefreshTokenEndpointUrlError: action.payload,
    };
  }
  if (isActionOfType(action, SettingsUIActions.setOauthRefreshTokenPathError)) {
    return {
      ...state,
      oauthRefreshTokenPathError: action.payload,
    };
  }
  if (isActionOfType(action, SettingsUIActions.setOauthAccessTokenPathError)) {
    return {
      ...state,
      oauthAccessTokenPathError: action.payload,
    };
  }
  if (isActionOfType(action, SettingsUIActions.setTlsCaCertPathError)) {
    return {
      ...state,
      tlsCaCertPathError: action.payload,
    };
  }
  if (isActionOfType(action, SettingsUIActions.setTlsClientCertPathError)) {
    return {
      ...state,
      tlsClientCertPathError: action.payload,
    };
  }
  if (isActionOfType(action, SettingsUIActions.setTlsClientKeyPathError)) {
    return {
      ...state,
      tlsClientKeyPathError: action.payload,
    };
  }
  return state;
}
