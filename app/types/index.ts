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

// TODO: Change these classes to have correct default values and constructors
export class PolyglotSettings {
    protoDiscoveryRoot: string = '';
    endpoint: string = '';
    configSetPath: string = '';
    addProtocIncludes: string[] = [];
    configName: string = '';
    tlsCaCertPath: string = '';
    deadlineMs?: number = undefined;

    // constructor(){
    //     this.protoDiscoveryRoot = undefined;
    //     this.endpoint = undefined;
    //     this.configName = undefined;
    //     this.addProtocIncludes = undefined;
    //     this.tlsCaCertPath = undefined;
    //     this.deadlineMs = undefined;
    //     this.configSetPath = '';
    // }
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

export interface ListServicesRequest {
    polyglotSettings: PolyglotSettings;
    polyglotRequestOptions: PolyglotRequestOptions;
    listServicesOptions: ListServicesOptions;
    listServicesRequestCallback: (listServicesResponse: PolyglotResponse) => void;
}

export interface PolyglotResponse {
    error: Error;
    reply: string;
}

export interface CallServiceRequest {
    
}