import serviceListReducer, { initialServiceListState } from '../../app/reducers/serviceList';
import * as serviceListActions from '../../app/actions/serviceList';

describe('service list reducer', () => {
    it('should handle initial state', () => {
        expect(serviceListReducer(undefined, { type: 'UNKNOWN', payload: {} })).toEqual(initialServiceListState);
    });

    it('should handle CHANGE_SERVICE_FILTER', () => {
        expect(serviceListReducer(undefined, serviceListActions.changeServiceFilter('service')).serviceFilter).toEqual('service');
    });

    it('should handle CHANGE_METHOD_FILTER', () => {
        expect(serviceListReducer(undefined, serviceListActions.changeMethodFilter('method')).methodFilter).toEqual('method');
    });

    // TODO: Update this test for when the polyglot JSON PR is finalised.
    // it(`should handle IMPORT_SERVICES`, () => {
    //     expect(serviceListReducer({...initialserviceListState, logs: state1Logs}, serviceListActions.appendLog('log2')).logs).toEqual(['log1', 'log2']);
    // });
});
