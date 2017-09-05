import * as React from 'react';
import * as ReactMD from 'react-md';

import { AppUIState } from '../reducers/appUI';

export interface IModalDialogProps {
    appUIState: AppUIState;
    defaultCloseDialog: () => void;
}

function ModalDialog({ appUIState, defaultCloseDialog }: IModalDialogProps) {
    return (
        <ReactMD.DialogContainer
            id='errorDialog'
            visible={appUIState.errorDialogVisible}
            modal={true}
            title={appUIState.errorDialogQueue.length > 0 ?
                appUIState.errorDialogQueue[0].errorDialogTitle : ''}
            actions={
                [{
                    secondary: true,
                    label: 'Ok',
                    onClick: appUIState.errorDialogQueue.length > 0 &&
                        appUIState.errorDialogQueue[0].onAccept ?
                        appUIState.errorDialogQueue[0].onAccept : defaultCloseDialog,
                }, {
                    secondary: true,
                    label: 'Cancel',
                    onClick: appUIState.errorDialogQueue.length > 0 &&
                        appUIState.errorDialogQueue[0].onCancel ?
                        appUIState.errorDialogQueue[0].onCancel : defaultCloseDialog,
                }]
            }
            children={appUIState.errorDialogQueue.length > 0 ?
                appUIState.errorDialogQueue[0].errorDialogExplanation : ''}
        />
    );
}

export default ModalDialog;
