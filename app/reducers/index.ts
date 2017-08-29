
import { combineReducers } from 'redux';
import settingsReducer, { SettingsState } from './settings';
import appUIReducer, { AppUIState } from './appUI';
import requestBuilderReducer, { RequestBuilderState } from './requestBuilder';
import serviceListReducer, { ServiceListState } from './serviceList';
import responseViewerReducer, { ResponseViewerState } from './responseViewer';

export interface AppState {
    serviceListState: ServiceListState;
    requestBuilderState: RequestBuilderState;
    responseViewerState: ResponseViewerState;
    settingsState: SettingsState;
    appState: AppUIState;
}


const rootReducer = combineReducers<AppState>({
  settingsState: settingsReducer,
  appState: appUIReducer,
  requestBuilderState: requestBuilderReducer,
  serviceListState: serviceListReducer,
  responseViewerState: responseViewerReducer,
});

export default rootReducer;
