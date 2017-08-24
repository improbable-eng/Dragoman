import { isActionOfType, Action } from '../actions/actions';
import { changeProtoDiscoveryRoot } from '../actions/polyglotSettings';

export type PolyglotSettings = Readonly<{
    protoDiscoveryRoot: string;
    endpoint: string;
    configSetPath: string;
    addProtocIncludes: string[];
    configName: string;
    tlsCaCertPath: string;
    deadlineMs: number;
    [key: string]: string | number | string[];
}>;

const initialPolyglotSettings: PolyglotSettings = {
    protoDiscoveryRoot: '',
    endpoint: '',
    configSetPath: '',
    addProtocIncludes: [],
    configName: '',
    tlsCaCertPath: '',
    deadlineMs: -1,
};

export default function polyglotSettings(state: PolyglotSettings = initialPolyglotSettings, action: Action<any>) {
  let partialState: Partial<PolyglotSettings> | undefined;

  if (isActionOfType(action, changeProtoDiscoveryRoot)) {
    partialState = {
      protoDiscoveryRoot: action.payload,
    };
  }
  return partialState !== undefined ? {...state, ...partialState} : state;
}
