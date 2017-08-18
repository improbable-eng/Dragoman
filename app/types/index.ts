// ***** Interfacing with Polyglot ******* //

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

export interface IPolyglotSettings {
    protoDiscoveryRoot: string;
    endpoint: string;
    configSetPath: string;
    addProtocIncludes: string;
    configName: string;
    tlsCaCertPath: string;
    deadlineMs: number;
}

export interface IListServicesOptions {
    serviceFilter: string;
    methodFilter: string;
}

export interface ICallServiceOptions {
    jsonBody: string;
    fullMethod: string;
}

interface IPolyglotRequestOptions {
    polyglotSettings: IPolyglotSettings;
}

export interface IListServicesRequest extends IPolyglotRequestOptions {
    listServicesOptions: IListServicesOptions;
}

export interface ICallServiceRequest extends IPolyglotRequestOptions {
    callServiceOptions: ICallServiceOptions;
}

export interface IPolyglotResponse {
    error: Error;
    response: string | ArrayBuffer;
}

// ************************************** //

// ************ App UI State ************ //

export interface ISettingsUIState {
    settingsOpen: boolean;
    endpointRequired: boolean;
    endpointError: boolean;
}

export interface IAppUIState {
    errorDialogVisible: boolean;
    errorDialogTitle: string;
    errorDialogExplanation: string;
    callRequestInProgress: boolean;
}

// ************************************** //
