import React from 'react';

import { SingleLineTextEntry } from './singleLineTextEntry';
import { MultiLineTextEntry } from './multiLineTextEntry';
import Button from 'react-md/lib/Buttons/Button';

export class Settings extends React.Component{
    render(){
        return (
            <div>
                 <SingleLineTextEntry
                id="currentProtoDiscoveryRoot"
                path={this.props.protoPath}
                handleChange={this.props.handleTextChange}
                handleBlur={this.props.handleProtoPathBlur} 
                label="Proto Root Path"
                placeholder="/path/to/protoRoot"
                errorText="Proto Root Path Required"
                required={true}/> 
                <SingleLineTextEntry 
                id="endpoint"
                label="gRPC Endpoint"
                value={this.props.endpoint}
                errorText="Endpoint Required"
                placeholder="<host>:<port>"
                handleChange={this.props.handleTextChange}
                required={this.props.endpointRequired}
                error={this.props.endpointError}/>
                <SingleLineTextEntry
                id="configSetPath"
                value={this.props.configSetPath}
                handleChange={this.props.handleTextChange}
                label="Config Path"
                placeholder="/path/to/config.pb.json"
                />
                <SingleLineTextEntry
                id="configName"
                value={this.props.configName}
                handleChange={this.props.handleTextChange}
                label="Config Name"
                placeholder="development"
                />
                <SingleLineTextEntry
                id="tlsCaCertPath"
                value={this.props.tlsCaCertPath}
                handleChange={this.props.handleTextChange}
                label="TLS CA Certificate Path"
                placeholder="/path/to/tlsCaCertificate"
                />
                <SingleLineTextEntry
                id="deadlineMs"
                value={this.props.deadlineMs}
                handleChange={this.props.handleTextChange}
                label="Deadline (milliseconds)"
                placeholder="5000"
                />
                <MultiLineTextEntry
                id="addProtocIncludes"
                value={this.props.addProtocIncludes}
                handleChange={this.props.handleTextChange}
                label="Add Protoc Includes"
                placeholder="<path1>,<path2>"/>
                {/* <div style={{"display":"flex", "padding":"0px 10px 0px 10px"}}>
                    <Button 
                    label="List Services"
                    raised
                    flat
                    style={{margin:"5px auto 5px auto", background:"md-tertiary-color"}}/>
                </div> */}
            </div>
        )
    }
}