
import { combineReducers } from 'redux';
import settingsReducer, { SettingsState } from './settings';
import appUIReducer, { AppUIState } from './appUI';
import requestBuilderReducer, { RequestBuilderState } from './requestBuilder';
import serviceListReducer, { ServiceListState } from './serviceList';
import responseViewerReducer, { ResponseViewerState } from './responseViewer';
import nodeProcessReducer, { NodeProcessState } from './nodeProcess';

export interface AppState {
    serviceListState: ServiceListState;
    requestBuilderState: RequestBuilderState;
    responseViewerState: ResponseViewerState;
    settingsState: SettingsState;
    appUIState: AppUIState;
    nodeProcessState: NodeProcessState;
}


const rootReducer = combineReducers<AppState>({
  settingsState: settingsReducer,
  appUIState: appUIReducer,
  requestBuilderState: requestBuilderReducer,
  serviceListState: serviceListReducer,
  responseViewerState: responseViewerReducer,
  nodeProcessState: nodeProcessReducer,
});

export default rootReducer;
