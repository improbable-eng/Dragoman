import nodeProcessReducer, { initialNodeProcessState, NodeProcessState } from '../../app/reducers/nodeProcess';
import * as nodeProcessActions from '../../app/actions/nodeProcess';

const nodeProcessState: NodeProcessState = {
    childProcessPids: new Set([0, 9999, 64890]),
};

describe('node process reducer', () => {
    it('should handle initial state', () => {
        expect(nodeProcessReducer(undefined, { type: 'UNKNOWN', payload: {} })).toEqual(initialNodeProcessState);
    });

    it('should handle ADD_NODE_PROCESS_PID', () => {
        expect(nodeProcessReducer(nodeProcessState, nodeProcessActions.addNodeProcessPid(9999)).childProcessPids).toEqual(nodeProcessState.childProcessPids);
    });

    it('should handle REMOVE_NODE_PROCESS_BY_PID', () => {
        expect(nodeProcessReducer(nodeProcessState, nodeProcessActions.removeNodeProcessPid(9999)).childProcessPids).toEqual(new Set([0, 64890]));
    });

    it(`should handle REMOVE_NODE_PROCESS_BY_PID where pid doesn't exist`, () => {
        expect(nodeProcessReducer(nodeProcessState, nodeProcessActions.removeNodeProcessPid(7)).childProcessPids).toEqual(nodeProcessState.childProcessPids);
    });

    it('should handle CLEAR_NODE_PROCESSES_PIDS', () => {
        expect(nodeProcessReducer(nodeProcessState, nodeProcessActions.clearNodeProcessPids()).childProcessPids).toEqual(new Set());
    });
});
