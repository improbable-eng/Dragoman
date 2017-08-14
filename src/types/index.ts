export interface Method {
    name: string;
    request: string;
    response: string;
}

export interface Service {
    name: string;
    path: string;
    methods: Method[];
}

export class PolyglotSettings {
    protoDiscoveryRoot?: string = undefined;
    endpoint?: string = undefined;
    configSetPath?: string = undefined;
    addProtocIncludes?: string[] = undefined;
    configName?: string = undefined;
    tlsCaCertPath?: string = undefined;
    deadlineMs?: number = undefined;

    // constructor(init?: Partial<PolyglotSettings>) {
    //   Object.assign(this, init);
    // }
}

export class ListServicesOptions {
    serviceFilter?: string = undefined;
    methodFilter?: string = undefined;
}

export class CallServiceOptions {
    jsonRequest: string = '{}';

    constructor(init?: Partial<CallServiceOptions>) {
        Object.assign(this, init);
    }
}

export class PolyglotRequestOptions {
    fullMethod?: string = undefined;
}

export class SettingsUIState {
  settingsOpen: boolean = true;
  endpointRequired: boolean = false;
  endpointError: boolean = false;
}

export class AppUIState {
  errorDialogVisible: boolean = false;
  errorDialogTitle: string = '';
  errorDialogExplanation: string;
  callRequestInProgress: boolean = false;
}