import { isActionOfType, Action } from '../actions/actions';
import * as NodeProcessActions from '../actions/nodeProcess';

export type NodeProcessState = Readonly<{
    childProcessPids: Set<number>;
}>;

export const initialNodeProcessState: NodeProcessState = {
    childProcessPids: new Set<number>(),
};

export default function nodeProcessReducer(state: NodeProcessState = initialNodeProcessState, action: Action<any>): NodeProcessState {

    if (isActionOfType(action, NodeProcessActions.addNodeProcessPid)) {
        return {
            ...state,
            childProcessPids: state.childProcessPids.add(action.payload),
        };
    }

    if (isActionOfType(action, NodeProcessActions.removeNodeProcessPid)) {
        state.childProcessPids.delete(action.payload);
        return {
            ...state,
        };
    }

    if (isActionOfType(action, NodeProcessActions.clearNodeProcessPids)) {
        state.childProcessPids.clear();
        return {
            ...state,
        };
    }

    return state;
}
