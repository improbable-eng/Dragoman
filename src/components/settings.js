import React from 'react';

import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons/Button';

import {ProtoSelector} from './protoSelector';

export class Settings extends React.Component{
    render(){
        return (
            <div>
                <ProtoSelector 
                protoPath={this.props.protoPath}
                handleProtoPathTextChange={this.props.handleProtoPathTextChange}
                handleProtoPathBlur={this.props.handleProtoPathBlur} />
                <div style={{"display":"flex", "padding":"0px 10px 0px 10px"}}>
                    <TextField
                    id="endpointInput"
                    label="gRPC Endpoint"
                    errorText="Endpoint Required"
                    lineDirection="center"
                    placeholder="0.0.0.0:8080"
                    className="md-cell md-cell--bottom"
                    style={{"flex":"1"}}
                    value={this.props.endpoint}
                    onChange={this.props.handleEndpointChange}
                    required={this.props.endpointRequired}
                    error={this.props.endpointError}
                    />
                </div>
            </div>
        )
    }
}