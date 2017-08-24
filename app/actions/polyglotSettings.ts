import * as actionHelpers from './actions';

const CHANGE_PROTO_DISCOVERY_ROOT = 'CHANGE_PROTO_DISCOVERY_ROOT';
const CHANGE_ENDPOINT = 'CHANGE_ENDPOINT';
const CHANGE_CONFIG_SET_PATH = 'CHANGE_CONFIG_SET_PATH';
const CHANGE_CONFIG_NAME = 'CHANGE_CONFIG_NAME';
const CHANGE_TLS_CA_CERT_PATH = 'CHANGE_TLS_CA_CERT_PATH';
const CHANGE_DEADLINE_MS = 'CHANGE_DEADLINE_MS';
const CHANGE_ADD_PROTOC_INCLUDES = 'CHANGE_ADD_PROTOC_INCLUDES';

export const changeProtoDiscoveryRoot = actionHelpers.actionCreator<string>(CHANGE_PROTO_DISCOVERY_ROOT);
export const changeEndpoint = actionHelpers.actionCreator<string>(CHANGE_ENDPOINT);
export const changeConfigSetPath = actionHelpers.actionCreator<string>(CHANGE_CONFIG_SET_PATH);
export const changeConfigName = actionHelpers.actionCreator<string>(CHANGE_CONFIG_NAME);
export const changeTlsCaCertPath = actionHelpers.actionCreator<string>(CHANGE_TLS_CA_CERT_PATH);
export const changeDeadlineMs = actionHelpers.actionCreator<number>(CHANGE_DEADLINE_MS);
export const changeAddProtocIncludes = actionHelpers.actionCreator<string>(CHANGE_ADD_PROTOC_INCLUDES);

