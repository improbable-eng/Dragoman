import { isActionOfType, Action } from '../actions/actions';
import { toggleSettingsOpen } from '../actions/uiSettings';

export type SettingsUIState = Readonly<{
  settingsOpen: boolean;
  endpointRequired: boolean;
  endpointError: boolean;
  protoDiscoveryRootError: boolean;
  configSetPathError: boolean;
  tlsCaCertPathError: boolean;
  // There can be multiple paths for the addProtocIncludes field, we want to be able to validate each one to provide
  // hints to users as to which path is wrong.
  addProtocIncludesErrors: boolean[];
}>;

const initialSettingsUIState: SettingsUIState = {
  settingsOpen: true,
  endpointRequired: false,
  endpointError: false,
  protoDiscoveryRootError: false,
  configSetPathError: false,
  tlsCaCertPathError: false,
  addProtocIncludesErrors: [],
};

export default function uiSettings(state: SettingsUIState = initialSettingsUIState, action: Action<any>) {
  let partialState: Partial<SettingsUIState> | undefined;
  console.log(action); // tslint:disable-line
  if (isActionOfType(action, toggleSettingsOpen)) {
    partialState = {
      settingsOpen: !state.settingsOpen,
    };
  }
  return partialState !== undefined ? {...state, ...partialState} : state;
}
