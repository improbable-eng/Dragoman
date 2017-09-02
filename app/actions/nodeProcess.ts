import * as actionHelpers from './actions';

const ADD_NODE_PROCESS_PID = 'ADD_NODE_PROCESS_PID';
const REMOVE_NODE_PROCESS_PID = 'REMOVE_NODE_PROCESS_BY_PID';
const CLEAR_NODE_PROCESSES_PIDS = 'CLEAR_NODE_PROCESSES_PIDS';

export const addNodeProcessPid = actionHelpers.actionCreator<number>(ADD_NODE_PROCESS_PID);
export const removeNodeProcessPid = actionHelpers.actionCreator<number>(REMOVE_NODE_PROCESS_PID);
export const clearNodeProcessPids = actionHelpers.emptyActionCreator(CLEAR_NODE_PROCESSES_PIDS);
