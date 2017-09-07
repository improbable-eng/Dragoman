import requestBuilderReducer, { initialRequestBuilderState } from '../../app/reducers/requestBuilder';
import * as requestBuilderActions from '../../app/actions/requestBuilder';

describe('request builder reducer', () => {
    it('should handle initial state', () => {
        expect(requestBuilderReducer(undefined, { type: 'UNKNOWN', payload: {} })).toEqual(initialRequestBuilderState);
    });

    it('should handle SET_REQUEST', () => {
        expect(requestBuilderReducer(undefined, requestBuilderActions.setRequest('request')).request).toEqual('request');
    });

    it('should handle SET_CALL_REQUEST_IN_PROGRESS', () => {
        expect(requestBuilderReducer(undefined, requestBuilderActions.setCallRequestInProgress(true)).callRequestInProgress).toEqual(true);
    });

    it(`should handle SET_FULL_METHOD`, () => {
        expect(requestBuilderReducer(undefined, requestBuilderActions.setFullMethod('service/method')).fullMethod).toEqual('service/method');
    });

    it('should handle SET_CLIENT_STREAMING_REQUEST', () => {
        expect(requestBuilderReducer(undefined, requestBuilderActions.setClientStreamingRequest(true)).clientStreaming).toEqual(true);
    });
});
