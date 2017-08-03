import React from 'react';

import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons/Button';

export class ProtoSelector extends React.Component {
    render(){
        return (
            <div style={{"display":"flex", "padding":"0px 10px 0px 10px"}}>
                <TextField 
                id="protoFileTextInput"
                label="Proto Root Path"
                lineDirection="center"
                placeholder="/path/to/protoRoot"
                className="md-cell md-cell--bottom"
                value={this.props.protoPath}
                onChange={this.props.handleProtoPathTextChange}
                onBlur={this.props.handleProtoPathBlur}
                required={true}
                style={{"flex":"1", "margin":"0px 8px 0px 8px"}}
                errorText="Proto Root Path Required"/>
            </div>
        );
    }
}