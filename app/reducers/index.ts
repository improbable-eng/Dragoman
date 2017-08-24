
import { combineReducers } from 'redux';
import uiSettings, { SettingsUIState } from '../reducers/uiSettings';
import polyglotSettings, { PolyglotSettings } from '../reducers/polyglotSettings';

export interface AppState {
    // public serviceMap: Map<string, Service> = new Map();
    polyglotSettings: PolyglotSettings;
    // public listServicesOptions: ListServicesOptions = new ListServicesOptions();
    // public callServiceOptions: CallServiceOptions = new CallServiceOptions();
    // public response: string = '';
    settingsUIState: SettingsUIState;
    // public appUIState: AppUIState = new AppUIState();
}


const rootReducer = combineReducers<AppState>({
  settingsUIState: uiSettings,
  polyglotSettings: polyglotSettings,
});

export default rootReducer;
