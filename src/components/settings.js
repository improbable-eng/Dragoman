import React from 'react';

import { SingleLineTextEntry } from './singleLineTextEntry';
import { MultiLineTextEntry } from './multiLineTextEntry';

export class Settings extends React.Component{
    render(){
        return (
            <div>
                <SingleLineTextEntry 
                id="endpoint"
                label="gRPC Endpoint"
                value={this.props.endpoint}
                errorText="Endpoint Required"
                placeholder="<host>:<port>"
                handleChange={this.props.handleTextChange}
                required={this.props.endpointRequired}
                error={this.props.endpointError} />
                 <SingleLineTextEntry
                id="protoDiscoveryRoot"
                value={this.props.protoPath}
                handleChange={this.props.handleTextChange}
                label="Proto Root Path"
                placeholder="/path/to/protoRoot"
                errorText="Proto Root Path Required"
                handleDoubleClick={() => {
                this.props.handlePathDoubleClick("protoDiiscoveryRoot", 
                "Select Proto Discovery Root", false)}
                } /> 
                <SingleLineTextEntry
                id="configSetPath"
                value={this.props.configSetPath}
                handleChange={this.props.handleTextChange}
                label="Config Path"
                placeholder="/path/to/config.pb.json"
                handleDoubleClick={() => {
                this.props.handlePathDoubleClick("configSetPath", 
                "Select Config Path", false)}
                } />
                <SingleLineTextEntry
                id="configName"
                value={this.props.configName}
                handleChange={this.props.handleTextChange}
                label="Config Name"
                placeholder="development" />
                <SingleLineTextEntry
                id="tlsCaCertPath"
                value={this.props.tlsCaCertPath}
                handleChange={this.props.handleTextChange}
                label="TLS CA Certificate Path"
                placeholder="/path/to/tlsCaCertificate"
                handleDoubleClick={() => {
                this.props.handlePathDoubleClick("tlsCaCertPath", 
                "Select TLS CA Certificate Path", false)}
                } />
                <SingleLineTextEntry
                id="deadlineMs"
                value={this.props.deadlineMs}
                handleChange={this.props.handleTextChange}
                label="Deadline (milliseconds)"
                placeholder="5000" />
                <MultiLineTextEntry
                id="addProtocIncludes"
                value={this.props.addProtocIncludes}
                handleChange={this.props.handleTextChange}
                label="Add Protoc Includes"
                placeholder="<path1>,<path2>"
                handleDoubleClick={() => {
                this.props.handlePathDoubleClick("addProtocIncludes", 
                "Add Protoc Include Paths", true)}
                } />
            </div>
        )
    }
}