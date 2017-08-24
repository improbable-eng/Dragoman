/* tslint:disable:no-console */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Settings, { SettingsMethods, SettingsProps } from '../components/Settings';
import { AppState } from '../reducers/index';

// const ipcConstants = require('../ipc/constants');
// import { ipcRenderer } from 'electron';

import * as polyglotSettingsActions from '../actions/polyglotSettings';



function mapStateToProps(state: AppState): Partial<SettingsProps> {
  return {
    polyglotSettings: state.polyglotSettings,
    settingsUIState: state.settingsUIState,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>, ownProps: any): Partial<SettingsProps> {
  const settingsMethods: SettingsMethods = {
    handleEndpointChange: (newEndpoint: string) => dispatch((polyglotSettingsActions.changeEndpoint(newEndpoint))),
    handleProtoDiscoveryRootChange: (newProtoDiscoveryRoot: string) => dispatch(polyglotSettingsActions.changeProtoDiscoveryRoot(newProtoDiscoveryRoot)),
    handleConfigSetPathChange: (newConfigSetPath: string) => dispatch(polyglotSettingsActions.changeConfigSetPath(newConfigSetPath)),
    handleConfigNameChange: (newConfigName: string) => dispatch(polyglotSettingsActions.changeConfigName(newConfigName)),
    handleTlsCaCertPathChange: (newTlsCaCertPath: string) => dispatch(polyglotSettingsActions.changeTlsCaCertPath(newTlsCaCertPath)),
    handleDeadlineMsChange: (newDeadlineMs: number) => dispatch(polyglotSettingsActions.changeDeadlineMs(newDeadlineMs)),
    handleAddProtocIncludesChange: (newAddProtocIncludes: string) => dispatch(polyglotSettingsActions.changeAddProtocIncludes(newAddProtocIncludes)),
    handlePathDoubleClick: ownProps.handlePathDoubleClick,
    handlePathBlur: ownProps.handlePathBlur,
  };

  // TODO: Add blur and double click methods
  return settingsMethods;
}


export default (connect(mapStateToProps, mapDispatchToProps)(Settings));
