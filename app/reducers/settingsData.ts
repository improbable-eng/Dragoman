import { isActionOfType, Action } from '../actions/actions';
import * as SettingsDataActions from '../actions/settingsData';
import { polyglot as polyglotConfig } from '../proto/config';

export const SETTINGS_IDS = {
  PROTO_DISCOVERY_ROOT: 'PROTO_DISCOVERY_ROOT',
  ENDPOINT: 'ENDPOINT',
  CONFIG_SET_PATH: 'CONFIG_SET_PATH',
  ADD_PROTOC_INCLUDES: 'ADD_PROTOC_INCLUDES',
  CONFIG_NAME: 'CONFIG_NAME',
  USE_TLS: 'USE_TLS',
  TLS_CLIENT_KEY_PATH: 'TLS_CLIENT_KEY_PATH',
  TLS_CLIENT_CERT_PATH: 'TLS_CLIENT_CERT_PATH',
  TLS_CLIENT_OVERRIDE_AUTHORITY: 'TLS_CLIENT_OVERRIDE_AUTHORITY',
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
  deadlineMs: number;
  oauthRefreshTokenEndpointUrl: string;
  oauthClientId: string;
  oauthClientSecret: string;
  oauthRefreshTokenPath: string;
  oauthAccessTokenPath: string;
  useTls: boolean;
  tlsClientKeyPath: string;
  tlsCaCertPath: string;
  tlsClientCertPath: string;
  tlsClientOverrideAuthority: string;
  polyglotConfigs: Map<string, polyglotConfig.IConfiguration>;
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
  useTls: false,
  tlsClientKeyPath: '',
  tlsClientCertPath: '',
  tlsClientOverrideAuthority: '',
  polyglotConfigs: new Map<string, polyglotConfig.IConfiguration>(),
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

  if (isActionOfType(action, SettingsDataActions.setUseTls)) {
    return {
      ...state,
      useTls: action.payload,
    };
  }

  if (isActionOfType(action, SettingsDataActions.setTlsCaCertPath)) {
    return {
      ...state,
      tlsCaCertPath: action.payload,
    };
  }

  if (isActionOfType(action, SettingsDataActions.setTlsClientKeyPath)) {
    return {
      ...state,
      tlsClientKeyPath: action.payload,
    };
  }

  if (isActionOfType(action, SettingsDataActions.setTlsClientCertPath)) {
    return {
      ...state,
      tlsClientCertPath: action.payload,
    };
  }

  if (isActionOfType(action, SettingsDataActions.setTlsClientOverrideAuthority)) {
    return {
      ...state,
      tlsClientOverrideAuthority: action.payload,
    };
  }

  if (isActionOfType(action, SettingsDataActions.importPolyglotConfigs)) {
    return {
      ...state,
      polyglotConfigs: new Map(action.payload.configurations.map(
        (config: polyglotConfig.IConfiguration) => {
          return [config.name, config] as [string, polyglotConfig.IConfiguration];
        })),
    };
  }

  if (isActionOfType(action, SettingsDataActions.setSettingsDataStateFromPolyglotConfig)) {
    // We only want to override certain settings with the imported config
    const stateToMutate = {
      ...initialSettingsDataState,
      configName: state.configName,
      configSetPath: state.configSetPath,
      polyglotConfigs: state.polyglotConfigs,
      endpoint: state.endpoint,
    };
    const config = action.payload;

    // TODO: All this null checking is horrific, swift style optional unwrapping is not yet implemented in TypeScript,
    // see https://github.com/Microsoft/TypeScript/issues/16 for progress.
    if (config != null) {
      if (config.call_config != null) {
        if (config.call_config.deadline_ms != null) {
          stateToMutate.deadlineMs = config.call_config.deadline_ms;
        }
        if (config.call_config.oauth_config != null) {
          if (config.call_config.oauth_config.refresh_token_credentials != null) {
            if (config.call_config.oauth_config.refresh_token_credentials.client != null) {
              if (config.call_config.oauth_config.refresh_token_credentials.client.id != null) {
                stateToMutate.oauthClientId = config.call_config.oauth_config.refresh_token_credentials.client.id;
              }
              if (config.call_config.oauth_config.refresh_token_credentials.client.secret != null) {
                stateToMutate.oauthClientSecret = config.call_config.oauth_config.refresh_token_credentials.client.secret;
              }
            }
            if (config.call_config.oauth_config.refresh_token_credentials.refresh_token_path != null) {
              stateToMutate.oauthRefreshTokenPath = config.call_config.oauth_config.refresh_token_credentials.refresh_token_path;
            }
            if (config.call_config.oauth_config.refresh_token_credentials.token_endpoint_url != null) {
              stateToMutate.oauthRefreshTokenEndpointUrl = config.call_config.oauth_config.refresh_token_credentials.token_endpoint_url;
            }
          }
          if (config.call_config.oauth_config.access_token_credentials != null) {
            if (config.call_config.oauth_config.access_token_credentials.access_token_path != null) {
              stateToMutate.oauthAccessTokenPath = config.call_config.oauth_config.access_token_credentials.access_token_path;
            }
          }
        }
        if (config.call_config.use_tls != null) {
          stateToMutate.useTls = config.call_config.use_tls;
        }
        if (config.call_config.tls_ca_cert_path != null) {
          stateToMutate.tlsCaCertPath = config.call_config.tls_ca_cert_path;
        }
        if (config.call_config.tls_client_key_path != null) {
          stateToMutate.tlsClientKeyPath = config.call_config.tls_client_key_path;
        }
        if (config.call_config.tls_client_override_authority != null) {
          stateToMutate.tlsClientOverrideAuthority = config.call_config.tls_client_override_authority;
        }
        if (config.call_config.tls_client_cert_path != null) {
          stateToMutate.tlsClientCertPath = config.call_config.tls_client_cert_path;
        }
      }
      if (config.proto_config != null) {
        if (config.proto_config.proto_discovery_root !== undefined) {
          stateToMutate.protoDiscoveryRoot = config.proto_config.proto_discovery_root;
        }
        if (config.proto_config.include_paths !== undefined) {
          stateToMutate.addProtocIncludes = config.proto_config.include_paths.join(', ');
        }
      }
      return stateToMutate;
    }
  }

  if (isActionOfType(action, SettingsDataActions.addPolyglotConfig)) {
    state.polyglotConfigs.set(state.configName, action.payload);
    return {
      ...state,
    };
  }

  return state;
}
