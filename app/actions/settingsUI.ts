import * as actionHelpers from './actions';

const SET_ENDPOINT_REQUIRED = 'SET_ENDPOINT_REQUIRED';
const SET_ENDPOINT_ERROR = 'SET_ENDPOINT_ERROR';
const SET_PROTO_DISCOVERY_ROOT_ERROR = 'SET_PROTO_DISCOVERY_ROOT_ERROR';
const SET_CONFIG_SET_PATH_ERROR = 'SET_CONFIG_SET_PATH_ERROR';
const SET_TLS_CA_CERT_PATH_ERROR = 'SET_TLS_CA_CERT_PATH_ERROR';
const SET_ADD_PROTOC_INCLUDES_ERRORS = 'SET_ADD_PROTOC_INCLUDES_ERRORS';
const SET_OAUTH_REFRESH_TOKEN_ENDPOINT_URL_ERROR = 'SET_OAUTH_REFRESH_TOKEN_ENDPOINT_URL_ERROR';
const SET_OAUTH_REFRESH_TOKEN_PATH_ERROR = 'SET_OAUTH_REFRESH_TOKEN_PATH_ERROR';
const SET_OAUTH_ACCESS_TOKEN_PATH_ERROR = 'SET_OAUTH_ACCESS_TOKEN_PATH_ERROR';

export const setEndpointRequired = actionHelpers.actionCreator<boolean>(SET_ENDPOINT_REQUIRED);
export const setEndpointError = actionHelpers.actionCreator<boolean>(SET_ENDPOINT_ERROR);
export const setProtoDiscoveryRootError = actionHelpers.actionCreator<boolean>(SET_PROTO_DISCOVERY_ROOT_ERROR);
export const setConfigSetPathError = actionHelpers.actionCreator<boolean>(SET_CONFIG_SET_PATH_ERROR);
export const setTlsCaCertPathError = actionHelpers.actionCreator<boolean>(SET_TLS_CA_CERT_PATH_ERROR);
export const setAddProtocIncludesError = actionHelpers.actionCreator<boolean[]>(SET_ADD_PROTOC_INCLUDES_ERRORS);
export const setOauthRefreshTokenEndpointUrlError = actionHelpers.actionCreator<boolean>(SET_OAUTH_REFRESH_TOKEN_ENDPOINT_URL_ERROR);
export const setOauthRefreshTokenPathError = actionHelpers.actionCreator<boolean>(SET_OAUTH_REFRESH_TOKEN_PATH_ERROR);
export const setOauthAccessTokenPathError = actionHelpers.actionCreator<boolean>(SET_OAUTH_ACCESS_TOKEN_PATH_ERROR);
