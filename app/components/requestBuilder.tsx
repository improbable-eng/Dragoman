import * as React from "react";
import * as ReactMD from "react-md";

import { AppUIState } from "../types/index";
import MonacoEditor from "./reactMonacoEditor";

export interface IRequestBuilderProps {
    request: string;
    serviceMethodIdentifier?: string;
    appUIState: AppUIState;
    handleRunClick: () => void;
    handleRequestChange: (newValue: string) => void;
    handleCancelClick: () => void;
}

class RequestBuilder extends React.Component<IRequestBuilderProps> {
    public render() {
        return (
            <ReactMD.Card style={{ width: "50%", padding: "20px" }} >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <ReactMD.CardActions
                    >
                        {!this.props.appUIState.callRequestInProgress ?
                            <ReactMD.Button
                                icon={true}
                                secondary={true}
                                swapTheming={true}
                                onClick={this.props.handleRunClick}
                                style={{ marginRight: "auto" }}
                                tooltipLabel="Send Request"
                                tooltipPosition="bottom"
                            >
                                play_arrow
                            </ReactMD.Button>
                            :
                            <ReactMD.Button
                                icon={true}
                                onClick={this.props.handleCancelClick}
                                style={{ marginRight: "auto", backgroundColor: "#EF9A9A" }}
                                tooltipLabel="Cancel Request"
                                tooltipPosition="bottom"
                                // className="md-red-200"
                            >
                                clear
                            </ReactMD.Button>}
                    </ReactMD.CardActions>
                    <ReactMD.CardTitle
                        title="Request Builder"
                        subtitle={this.props.serviceMethodIdentifier}
                        style={{ padding: 24 }}
                    />
                    <ReactMD.Button
                        icon={true}
                        tooltipLabel={this.props.appUIState.clientStreaming !== undefined ?
                            (this.props.appUIState.clientStreaming ? "streaming request" : "unary request")
                            : ""}
                        tooltipPosition="right"
                    >
                        {this.props.appUIState.clientStreaming !== undefined ?
                            (this.props.appUIState.clientStreaming ? "more_horiz" : "lens")
                            : ""}
                    </ReactMD.Button>
                </div>
                {this.props.appUIState.callRequestInProgress ?
                <ReactMD.LinearProgress id="callRequestProgress" style={{margin: 0}}/> :
                <div style={{height: 3}}/>}
                <ReactMD.Card className="md-block-centered">
                    <MonacoEditor
                        language="json"
                        theme="vs"
                        onChange={(val: string) => this.props.handleRequestChange(val)}
                        height="500"
                        value={this.props.request}
                        editorWillMount={this.componentWillMount}
                        options={{ wordWrap: true }}
                    />
                </ReactMD.Card>
            </ReactMD.Card>
        );
    }
}

export default RequestBuilder;
