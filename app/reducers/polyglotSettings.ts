import { isActionOfType, Action } from '../actions/actions';
import * as polyglotSettingsActions from '../actions/polyglotSettings';

export type PolyglotSettings = Readonly<{
    protoDiscoveryRoot: string;
    endpoint: string;
    configSetPath: string;
    addProtocIncludes: string;
    configName: string;
    tlsCaCertPath: string;
    deadlineMs: number;
}>;

const initialPolyglotSettings: PolyglotSettings = {
    protoDiscoveryRoot: '',
    endpoint: '',
    configSetPath: '',
    addProtocIncludes: '',
    configName: '',
    tlsCaCertPath: '',
    deadlineMs: -1,
};

export default function polyglotSettings(state: PolyglotSettings = initialPolyglotSettings, action: Action<any>): PolyglotSettings {

  if (isActionOfType(action, polyglotSettingsActions.changeProtoDiscoveryRoot)) {
    return {
      ...state,
      protoDiscoveryRoot: action.payload,
    };
  }

  if (isActionOfType(action, polyglotSettingsActions.changeEndpoint)) {
    return {
      ...state,
      endpoint: action.payload,
    };
  }

  if (isActionOfType(action, polyglotSettingsActions.changeConfigSetPath)) {
    return {
      ...state,
      configSetPath: action.payload,
    };
  }

  if (isActionOfType(action, polyglotSettingsActions.changeAddProtocIncludes)) {
    return {
      ...state,
      addProtocIncludes: action.payload,
    };
  }

  if (isActionOfType(action, polyglotSettingsActions.changeConfigName)) {
    return {
      ...state,
      configName: action.payload,
    };
  }

  if (isActionOfType(action, polyglotSettingsActions.changeTlsCaCertPath)) {
    return {
      ...state,
      tlsCaCertPath: action.payload,
    };
  }

  if (isActionOfType(action, polyglotSettingsActions.changeDeadlineMs)) {
    // TODO: Deal with the case where the input is not a number
    return {
      ...state,
      deadlineMs: action.payload,
    };
  }

  return  state;
}
