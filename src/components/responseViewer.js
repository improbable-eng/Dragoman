import React from 'react';

import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';

import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/xcode';

export class ResponseViewer extends React.Component{
    render(){
        return (
            <Card style={{ width:"50%", padding:"20px" }}>
                <CardTitle
                title="Response Viewer"
                subtitle={this.props.serviceMethodIdentifier}
                />
                <Card className="md-block-centered">
                    <AceEditor
                    mode="text"
                    theme="xcode"
                    onChange={this.onChange}
                    name="RESPONSE_VIEWER"
                    editorProps={{$blockScrolling: true}}
                    width="auto"
                    readOnly={true}
                    value={this.props.response}
                    />
                </Card>
            </Card>
        )
    }
}