import React from 'react';

import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import Button from 'react-md/lib/Buttons/Button';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/xcode';

export class RequestBuilder extends React.Component{
    //Checking that we aren't needlessly updating the editor. TODO: Is this necessary?
    shouldComponentUpdate(nextProps, nextState){
        const propsAreSame = (this.props.request === nextProps.request 
            && this.props.serviceMethodIdentifier === nextProps.serviceMethodIdentifier
            && this.props.callRequestInProgress === nextProps.callRequestInProgress);
        return !propsAreSame;
    }

    render(){
        return (
            <Card style={{width:"50%", padding:"20px"}} >
                <div style={{"display":"flex"}}>
                    <CardTitle
                    title="Request Builder"
                    subtitle={this.props.serviceMethodIdentifier}
                    />
                    <CardActions 
                    style={{"flexGrow":1}}>
                        {!this.props.callRequestInProgress ? 
                        <Button
                        floating
                        secondary
                        onClick={this.props.handleRunClick} 
                        style={{marginRight:"auto"}}
                        tooltipLabel="Make Request"
                        tooltipPosition="bottom">
                            play_arrow
                        </Button>
                        :
                        <CircularProgress
                        style={{marginLeft:10}}/>}
                    </CardActions>
                </div>
                
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
            </Card>
        );
    }
}