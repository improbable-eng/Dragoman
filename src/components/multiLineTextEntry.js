import React from 'react';

import TextField from 'react-md/lib/TextFields';

export class MultiLineTextEntry extends React.Component {
    render(){
        return (
            <div style={{"display":"flex", "padding":"0px 10px 0px 10px"}}>
                <TextField 
                id={this.props.id}
                label={this.props.label}
                value={this.props.value}
                placeholder={this.props.placeholder ? this.props.placeholder : ""}
                required={this.props.required}
                errorText={this.props.errorText ? this.props.errorText : ""}
                onChange={(newValue) => this.props.handleChange(this.props.id, newValue)}
                onDoubleClick={this.props.handleDoubleClick}
                rows={1}
                maxRows={-1}
                style={{"flex":"1", "margin":"0px 8px 0px 8px"}}
                lineDirection="center"
                className="md-cell md-cell--bottom"
                />
            </div>
        );
    }
}