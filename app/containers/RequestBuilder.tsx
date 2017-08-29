// /* tslint:disable:no-console */
// import { connect } from 'react-redux';
// import { Dispatch } from 'redux';

// const ipcConstants = require('../ipc/constants');
// import { ipcRenderer } from 'electron';
// import { PolyglotResponse } from '.../ipc/index';

// import * as RequestBuilderActions from '../actions/requestBuilder';
// import { RequestBuilderState, CallServiceRequest, CallServiceOptions } from '../reducers/requestBuilder';
// import { AppState } from '../reducers/index';

// import RequestBuilder,
// { RequestBuilderComponentMethods, RequestBuilderComponentState } from '../components/requestBuilder';

// function callService(requestBuilderState: RequestBuilderState) {
//     return (dispatch: Dispatch<AppState>, getState: () => AppState) => {
//         const requestJson = requestBuilderState.request;

//         // Remove the annotations [<optioal> <repeated>] from the request.
//         // Note (Edge Case): If the actual JSON body contains these strings they will be removed.
//         const redactedJsonInput = requestJson.replace(/\[<(optional|required)> <(single|repeated)>\]/g, '');

//         // Testing whether it is valid JSON. This will not work when constructing streaming responses
//         // TODO: Change this to deal with streaming requests
//         try {
//             JSON.parse(redactedJsonInput);
//         } catch (e) {
//             dispatch(RequestBuilderActions.setCallRequestInProgress(false));
//             openJsonParseErrorDialog();
//         }

//         const callServiceRequest = new CallServiceRequest({
//             polyglotSettings: getState().settingsState.settingsDataState,
//             callServiceOptions: new CallServiceOptions({
//                 jsonBody: redactedJsonInput,
//                 fullMethod: getState().requestBuilderState.fullMethod,
//             }),
//         });

//         console.log('Calling service with request', callServiceRequest);

//         ipcRenderer.once(ipcConstants.CALL_SERVICE_RESPONSE,
//             (event: Event, response: Call) => validateSystemPathResponse(response, dispatch));
//         ipcRenderer.send(ipcConstants.CALL_SERVICE_REQUEST, callServiceRequest);
//     };
// }

// function callServiceResponse(event: Event, res: PolyglotResponse) {
//     this.props.dispatch(RequestBuilderActions.setCallRequestInProgress(false));

//     console.log(`Received call service response \n${res}`);

//     if (!res.error) {
//         // The response can be an array encoded in utf-8
//         if (typeof res.response !== 'string') {
//             res.response = new TextDecoder('utf-8').decode(res.response as ArrayBuffer).trim();
//         }
//         this.props.dispatch(ResponseViewerActions.setResponse(res.response));
//     } else {
//         this.openErrorDialog('Error calling service: ', checkConsoleErrorMessage);
//         console.error(`Error ${res.error} \n${res.response}`);
//     }
// }
// }

// function handleRequestChange(newRequest: string) {
//     this.props.dispatch(RequestBuilderActions.setRequest(newRequest));
// }

// function handleRunClick() {
//     // Up until this point the endpoint did not need to be filled in.
//     this.props.dispatch(SettingsUIActions.setEndpointRequired(true));
//     if (this.props.settingsState.settingsDataState.endpoint === '') {
//         this.props.dispatch(SettingsUIActions.setEndpointRequired(true));
//         this.props.dispatch(AppActions.setSettingsOpen(true));
//         this.props.dispatch(SettingsUIActions.setEndpointError(true));
//     } else {
//         this.props.dispatch(RequestBuilderActions.setCallRequestInProgress(true));
//         this.callService();
//     }
// }

// function handleCancelClick() {
//     console.warn('Cancelling request');
//     ipcRenderer.send(ipcConstants.CANCEL_REQUEST);
// }

// function cancelRequestResponse(success: boolean) {
//     this.props.dispatch(RequestBuilderActions.setCallRequestInProgress(!success));
// }

// function openJsonParseErrorDialog() {
//     this.openErrorDialog('Error parsing request', 'Ensure that the request is valid JSON');
// }

// /** Function required by react-redux connect, maps from the main state in the redux store to the props required
//  * for the settings component.
//  * @param {AppState} state - The state of the redux store
//  * @returns {RequestBuilderComponentState} - The slice of @param state required for the request builder component
//   */
// function mapStateToProps(state: AppState): RequestBuilderComponentState {
//     return {
//         requestBuilderState: state.requestBuilderState,
//     };
// }

// /** Function required by react-redux connect, provides the dispatch method to any prop functions that require the ability to
//  * update the store.
//  * @param {Dispatch<AppState>} dispatch - The dispatch method to send actions to the reducers for the store.
//  * @returns {RequestBuilderComponentMethods} - The methods required by the request builder component
//   */
// function mapDispatchToProps(dispatch: Dispatch<AppState>): RequestBuilderComponentMethods {
//     return {
//         handleRunClick: () => dispatch(handleRunClick());
//         handleRequestChange: (newValue: string) => dispatch(handleRequestChange());
//         handleCancelClick: () => dispatch(handleCancelClick());
//     };
// }

// export default (connect(mapStateToProps, mapDispatchToProps)(RequestBuilder));
