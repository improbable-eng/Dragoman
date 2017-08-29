export class PolyglotResponse {
    public error: Error;
    public response: string | ArrayBuffer;
}

export class PolyglotLog {
    public log: string | ArrayBuffer;
    public level: string;
}

export class ValidatePathsRequest {
    public paths: string[];
    public id: string;
}

export class ValidatePathsResponse {
    public validPaths: boolean[];
    public id: string;
}
