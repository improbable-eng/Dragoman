export class PolyglotResponse {
    public error: Error;
    public response: string | ArrayBuffer;
}

export class PolyglotLog {
    public log: string | ArrayBuffer;
    public level: string;
}
