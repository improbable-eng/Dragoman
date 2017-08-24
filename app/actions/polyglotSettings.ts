import * as actionHelpers from './actions';
const CHANGE_PROTO_DISCOVERY_ROOT = 'CHANGE_PROTO_DISCOVERY_ROOT';

export const changeProtoDiscoveryRoot = actionHelpers.actionCreator<string>(CHANGE_PROTO_DISCOVERY_ROOT);
