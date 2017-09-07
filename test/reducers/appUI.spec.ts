import appUIReducer, { initialAppUIState, ErrorDialogState } from '../../app/reducers/appUI';
import * as appUIActions from '../../app/actions/appUI';

const errorDialog: ErrorDialogState = {
    errorDialogTitle: 'Title',
    errorDialogExplanation: 'Explanation',
    onAccept: () => { /*noop*/ },
    onCancel: () => { /*noop*/ },
};

describe('app UI reducer', () => {
    it('should handle initial state', () => {
        expect(appUIReducer(undefined, { type: 'UNKNOWN', payload: {} })).toEqual(initialAppUIState);
    });

    it('should handle SET_SETTINGS_OPEN', () => {
        expect(appUIReducer(undefined, appUIActions.setSettingsOpen(true)).settingsOpen).toEqual(true);
    });

    it('should handle SET_ERROR_DIALOG_VISIBLE', () => {
        expect(appUIReducer(undefined, appUIActions.setErrorDialogVisible(true)).errorDialogVisible).toEqual(true);
    });

    it('should handle ENQUEUE_ERROR_DIALOG_STATE', () => {
        expect(appUIReducer(undefined, appUIActions.enqueueErrorDialogState(errorDialog)).errorDialogQueue[0]).toEqual(errorDialog);
    });

    it('should handle DEQUEUE_ERROR_DIALOG_STATE', () => {
        expect(appUIReducer({ ...initialAppUIState,  errorDialogQueue: [errorDialog]}, appUIActions.dequeueErrorDialogState()).errorDialogQueue).toEqual([]);
    });
});
