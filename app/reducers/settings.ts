
import { combineReducers } from 'redux';
import settingsDataReducer, { SettingsDataState } from './settingsData';
import settingsUIReducer, { SettingsUIState } from './settingsUI';

export interface SettingsState {
  settingsDataState: SettingsDataState;
  settingsUIState: SettingsUIState;
}


const rootReducer = combineReducers<SettingsState>({
  settingsUIState: settingsUIReducer,
  settingsDataState: settingsDataReducer,
});

export default rootReducer;
