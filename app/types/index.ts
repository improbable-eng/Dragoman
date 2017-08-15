export interface IMethod {
    name: string;
    request: string;
    response: string;
}

export interface IService {
    name: string;
    path: string;
    methods: IMethod[];
}

// TODO: Change these classes to have correct default values and constructors
export interface IPolyglotSettings {
    protoDiscoveryRoot?: string;
    endpoint?: string;
    configSetPath?: string;
    addProtocIncludes?: string[];
    configName?: string;
    tlsCaCertPath?: string;
    deadlineMs?: number;

    // constructor(){
    //     this.protoDiscoveryRoot = undefined;
    //     this.endpoint = undefined;
    //     this.configName = undefined;
    //     this.addProtocIncludes = undefined;
    //     this.tlsCaCertPath = undefined;
    //     this.deadlineMs = undefined;
    //     this.configSetPath = "";
    // }
    // constructor(init?: Partial<PolyglotSettings>) {
    //   Object.assign(this, init);
    // }
}

export interface IListServicesOptions {
    serviceFilter?: string;
    methodFilter?: string;
}

export interface ICallServiceOptions {
    jsonRequest?: string;
}

export interface IPolyglotRequestOptions {
    fullMethod?: string;
}

export interface ISettingsUIState {
    settingsOpen: boolean;
    endpointRequired: boolean;
    endpointError: boolean;
}

export interface IAppUIState {
    errorDialogVisible: boolean;
    errorDialogTitle?: string;
    errorDialogExplanation?: string;
    callRequestInProgress: boolean;
}

export interface IListServicesRequest {
    polyglotSettings: IPolyglotSettings;
    polyglotRequestOptions: IPolyglotRequestOptions;
    listServicesOptions: IListServicesOptions;
    listServicesRequestCallback: (listServicesResponse: IPolyglotResponse) => void;
}

export interface IPolyglotResponse {
    error: Error;
    reply: string;
}

// export interface ICallServiceRequest {
// }
