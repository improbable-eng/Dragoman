import React from 'react';

import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import Button from 'react-md/lib/Buttons/Button';

import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/xcode';

export class RequestBuilder extends React.Component{
    //Checking that we aren't needlessly updating the editor. TODO: Is this necessary?
    shouldComponentUpdate(nextProps, nextState){
        const propsAreSame = (this.props.request === nextProps.request 
            && this.props.serviceMethodIdentifier === nextProps.serviceMethodIdentifier);
        return !propsAreSame;
    }

    render(){
        return (
            <Card style={{width:"50%", padding:"20px"}} >
                <CardTitle
                title="Request Builder"
                subtitle={this.props.serviceMethodIdentifier}
                />
                <Card className="md-block-centered">
                    <AceEditor
                    mode="json"
                    theme="xcode"
                    onChange={this.props.handleRequestChange}
                    name="REQUEST_EDITOR"
                    editorProps={{$blockScrolling: Infinity}}
                    width="auto"
                    value={this.props.request}
                    wrapEnabled={true}
                    />
                </Card>
                <Button 
                raised 
                label="Run" 
                style={{"marginTop":20}} 
                className="md-block-centered"
                onClick={this.props.handleRunClick} />
            </Card>
        );
    }
}