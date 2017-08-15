import * as React from "react";
import * as ReactMD from "react-md";

import { IAppUIState } from "../types/index";

import AceEditor from "react-ace";
import "brace/mode/json";
import "brace/theme/xcode";

export interface IRequestBuilderProps {
    request?: string;
    serviceMethodIdentifier?: string;
    appUIState: IAppUIState;
    handleRunClick: () => void;
    handleRequestChange: (newValue: string) => void;
}

class RequestBuilder extends React.Component<IRequestBuilderProps> {
    // Checking that we aren"t needlessly updating the editor. TODO: Is this necessary?
    // shouldComponentUpdate(nextProps: RequestBuilderProps, nextState: object) {
    //     const propsAreSame = (this.props.request === nextProps.request
    //         && this.props.serviceMethodIdentifier === nextProps.serviceMethodIdentifier
    //         && this.props.appUIState.callRequestInProgress === nextProps.appUIState.callRequestInProgress);
    //     return !propsAreSame;
    // }

    public render() {
        return (
            <ReactMD.Card style={{ width: "50%", padding: "20px" }} >
                <div style={{ display: "flex" }}>
                    <ReactMD.CardTitle
                        title="Request Builder"
                        subtitle={this.props.serviceMethodIdentifier}
                    />
                    <ReactMD.CardActions
                        style={{ flexGrow: 1 }}
                    >
                        {!this.props.appUIState.callRequestInProgress ?
                            <ReactMD.Button
                                icon={true}
                                secondary={true}
                                swapTheming={true}
                                onClick={this.props.handleRunClick}
                                style={{ marginRight: "auto" }}
                                tooltipLabel="Send Request"
                                tooltipPosition="right"
                            >
                                play_arrow
                            </ReactMD.Button>
                            :
                            <ReactMD.CircularProgress
                                id="requestProgress"
                                style={{ marginLeft: 10 }}
                            />}
                    </ReactMD.CardActions>
                </div>

                <ReactMD.Card className="md-block-centered">
                    <AceEditor
                        mode="json"
                        theme="xcode"
                        onChange={this.props.handleRequestChange}
                        name="REQUEST_EDITOR"
                        editorProps={{ $blockScrolling: Infinity }}
                        width="auto"
                        value={this.props.request}
                        wrapEnabled={true}
                    />
                </ReactMD.Card>
            </ReactMD.Card>
        );
    }
}

export default RequestBuilder;
