import settingsUI from '../../app/reducers/settingsUI';
// import * as settingsUIActions from '../../app/actions/settingsUI';

describe('settings UI reducer', () => {
  describe('endpoint error', () => {
    it('should handle initial state', () => {
      expect(settingsUI(undefined, { type: 'unknown', payload: {} }).endpointError).toBe(false);
    });

  //   it('should handle INCREMENT_COUNTER', () => {
  //     expect(counter(1, increment())).toBe(2);
  //   });

  //   it('should handle DECREMENT_COUNTER', () => {
  //     expect(counter(1, decrement())).toBe(0);
  //   });

  //   it('should handle unknown action type', () => {
  //     expect(counter(1, { type: 'unknown' })).toBe(1);
  //   });
  });
});
