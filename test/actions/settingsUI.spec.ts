import * as settingsUIActions from '../../app/actions/settingsUI';

describe('settings UI actions', () => {
  it('setEndpointError should create set endpoint error action', () => {
    expect(settingsUIActions.setEndpointError(false)).toMatchSnapshot();
  });
});
