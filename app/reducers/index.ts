
import { combineReducers } from 'redux';
import uiSettings, { SettingsUIState } from '../reducers/settingsUI';
import polyglotSettings, { PolyglotSettings } from '../reducers/polyglotSettings';
import appUIState, { AppUIState } from '../reducers/appUI';
import callServiceOptions, { CallServiceOptions } from '../reducers/callServiceOptions';
import listServicesOptions, { ListServicesOptions } from '../reducers/listServicesOptions';
import response, { Response } from '../reducers/response';

export interface AppState {
    // public serviceMap: Map<string, Service> = new Map();
    polyglotSettings: PolyglotSettings;
    listServicesOptions: ListServicesOptions;
    callServiceOptions: CallServiceOptions;
    response: Response;
    settingsUIState: SettingsUIState;
    appUIState: AppUIState;
}


const rootReducer = combineReducers<AppState>({
  settingsUIState: uiSettings,
  polyglotSettings: polyglotSettings,
  appUIState: appUIState,
  callServiceOptions: callServiceOptions,
  listServicesOptions: listServicesOptions,
  response: response,
});

export default rootReducer;
