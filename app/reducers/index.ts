
import { combineReducers } from 'redux';
import settingsReducer, { SettingsState } from './settings';
import appUIReducer, { AppUIState } from './appUI';
import requestBuilderReducer, { RequestBuilderState } from './requestBuilder';
import listServicesReducer, { ListServicesState } from './listServices';
import responseViewerReducer, { ResponseViewerState } from './responseViewer';

export interface AppState {
    listServicesState: ListServicesState;
    requestBuilderState: RequestBuilderState;
    responseViewerState: ResponseViewerState;
    settingsState: SettingsState;
    appState: AppUIState;
}


const rootReducer = combineReducers<AppState>({
  settingsState: settingsReducer,
  appState: appUIReducer,
  requestBuilderState: requestBuilderReducer,
  listServicesState: listServicesReducer,
  responseViewerState: responseViewerReducer,
});

export default rootReducer;
