import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import Settings, { ISettingsProps } from '../components/Settings';
import * as uiSettingsActions from '../actions/uiSettings';
import { AppState } from '../reducers/index';

function mapStateToProps(state: AppState): Partial<ISettingsProps> {
  return {
    polyglotSettings: state.polyglotSettings,
    settingsUIState: state.settingsUIState,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>): Partial<ISettingsProps> {
  return bindActionCreators(uiSettingsActions as any, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Settings));
