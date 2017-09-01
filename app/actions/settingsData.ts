import * as actionHelpers from './actions';

const SET_PROTO_DISCOVERY_ROOT = 'SET_PROTO_DISCOVERY_ROOT';
const SET_ENDPOINT = 'SET_ENDPOINT';
const SET_CONFIG_SET_PATH = 'SET_CONFIG_SET_PATH';
const SET_CONFIG_NAME = 'SET_CONFIG_NAME';
const SET_TLS_CA_CERT_PATH = 'SET_TLS_CA_CERT_PATH';
const SET_DEADLINE_MS = 'SET_DEADLINE_MS';
const SET_ADD_PROTOC_INCLUDES = 'SET_ADD_PROTOC_INCLUDES';
const SET_USE_TLS = 'SET_USE_TLS';
const SET_OAUTH_REFRESH_TOKEN_ENDPOINT_URL = 'SET_OAUTH_REFRESH_TOKEN_ENDPOINT_URL';
const SET_OAUTH_CLIENT_ID = 'SET_OAUTH_CLIENT_ID';
const SET_OAUTH_CLIENT_SECRET = 'SET_OAUTH_CLIENT_SECRET';
const SET_OAUTH_REFRESH_TOKEN_PATH = 'SET_OAUTH_REFRESH_TOKEN_PATH';
const SET_OAUTH_ACCESS_TOKEN_PATH = 'SET_OAUTH_ACCESS_TOKEN_PATH';

export const setProtoDiscoveryRoot = actionHelpers.actionCreator<string>(SET_PROTO_DISCOVERY_ROOT);
export const setEndpoint = actionHelpers.actionCreator<string>(SET_ENDPOINT);
export const setConfigSetPath = actionHelpers.actionCreator<string>(SET_CONFIG_SET_PATH);
export const setConfigName = actionHelpers.actionCreator<string>(SET_CONFIG_NAME);
export const setTlsCaCertPath = actionHelpers.actionCreator<string>(SET_TLS_CA_CERT_PATH);
export const setDeadlineMs = actionHelpers.actionCreator<number>(SET_DEADLINE_MS);
export const setAddProtocIncludes = actionHelpers.actionCreator<string>(SET_ADD_PROTOC_INCLUDES);
export const setUseTls = actionHelpers.actionCreator<boolean>(SET_USE_TLS);
export const setOauthRefreshTokenEndpointUrl = actionHelpers.actionCreator<string>(SET_OAUTH_REFRESH_TOKEN_ENDPOINT_URL);
export const setOauthClientId = actionHelpers.actionCreator<string>(SET_OAUTH_CLIENT_ID);
export const setOauthClientSecret = actionHelpers.actionCreator<string>(SET_OAUTH_CLIENT_SECRET);
export const setOauthRefreshTokenPath = actionHelpers.actionCreator<string>(SET_OAUTH_REFRESH_TOKEN_PATH);
export const setOauthAccessTokenPath = actionHelpers.actionCreator<string>(SET_OAUTH_ACCESS_TOKEN_PATH);
