import { isActionOfType, Action } from '../actions/actions';
import * as SettingsDataActions from '../actions/settingsData';

export const SETTINGS_IDS = {
  PROTO_DISCOVERY_ROOT: 'PROTO_DISCOVERY_ROOT',
  ENDPOINT: 'ENDPOINT',
  CONFIG_SET_PATH: 'CONFIG_SET_PATH',
  ADD_PROTOC_INCLUDES: 'ADD_PROTOC_INCLUDES',
  CONFIG_NAME: 'CONFIG_NAME',
  TLS_CA_CERT_PATH: 'TLS_CA_CERT_PATH',
  DEADLINE_MS: 'DEADLINE_MS',
  OAUTH_REFRESH_TOKEN_ENDPOINT_URL: 'OAUTH_REFRESH_TOKEN_ENDPOINT_URL',
  OAUTH_CLIENT_ID: 'OAUTH_CLIENT_ID',
  OAUTH_CLIENT_SECRET: 'OAUTH_CLIENT_SECRET',
  OAUTH_REFRESH_TOKEN_PATH: 'OAUTH_REFRESH_TOKEN_PATH',
  OAUTH_ACCESS_TOKEN_PATH: 'OAUTH_ACCESS_TOKEN_PATH',
};

export type SettingsDataState = Readonly<{
  protoDiscoveryRoot: string;
  endpoint: string;
  configSetPath: string;
  addProtocIncludes: string;
  configName: string;
  tlsCaCertPath: string;
  deadlineMs: number;
  oauthRefreshTokenEndpointUrl: string;
  oauthClientId: string;
  oauthClientSecret: string;
  oauthRefreshTokenPath: string;
  oauthAccessTokenPath: string;
}>;

export const initialSettingsDataState: SettingsDataState = {
  protoDiscoveryRoot: '',
  endpoint: '',
  configSetPath: '',
  addProtocIncludes: '',
  configName: '',
  tlsCaCertPath: '',
  deadlineMs: -1,
  oauthRefreshTokenEndpointUrl: '',
  oauthClientId: '',
  oauthClientSecret: '',
  oauthRefreshTokenPath: '',
  oauthAccessTokenPath: '',
};

export default function settingsDataReducer(state: SettingsDataState = initialSettingsDataState, action: Action<any>): SettingsDataState {

  if (isActionOfType(action, SettingsDataActions.setProtoDiscoveryRoot)) {
    return {
      ...state,
      protoDiscoveryRoot: action.payload,
    };
  }

  if (isActionOfType(action, SettingsDataActions.setEndpoint)) {
    return {
      ...state,
      endpoint: action.payload,
    };
  }

  if (isActionOfType(action, SettingsDataActions.setConfigSetPath)) {
    return {
      ...state,
      configSetPath: action.payload,
    };
  }

  if (isActionOfType(action, SettingsDataActions.setAddProtocIncludes)) {
    return {
      ...state,
      addProtocIncludes: action.payload,
    };
  }

  if (isActionOfType(action, SettingsDataActions.setConfigName)) {
    return {
      ...state,
      configName: action.payload,
    };
  }

  if (isActionOfType(action, SettingsDataActions.setTlsCaCertPath)) {
    return {
      ...state,
      tlsCaCertPath: action.payload,
    };
  }

  if (isActionOfType(action, SettingsDataActions.setDeadlineMs)) {
    return {
      ...state,
      deadlineMs: action.payload,
    };
  }

  if (isActionOfType(action, SettingsDataActions.setOauthRefreshTokenEndpointUrl)) {
    return {
      ...state,
      oauthRefreshTokenEndpointUrl: action.payload,
    };
  }

  if (isActionOfType(action, SettingsDataActions.setOauthClientId)) {
    return {
      ...state,
      oauthClientId: action.payload,
    };
  }

  if (isActionOfType(action, SettingsDataActions.setOauthClientSecret)) {
    return {
      ...state,
      oauthClientSecret: action.payload,
    };
  }

  if (isActionOfType(action, SettingsDataActions.setOauthRefreshTokenPath)) {
    return {
      ...state,
      oauthRefreshTokenPath: action.payload,
    };
  }

  if (isActionOfType(action, SettingsDataActions.setOauthAccessTokenPath)) {
    return {
      ...state,
      oauthAccessTokenPath: action.payload,
    };
  }

  return state;
}
