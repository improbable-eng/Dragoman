import React from 'react';

import {MethodList} from './methodList'

import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import Divider from 'react-md/lib/Dividers';
import Collapse from 'react-md/lib/Helpers/Collapse';

export class Service extends React.Component{
    constructor(props){
        super(props);
        this.onMethodClick = this.onMethodClick.bind(this);
    }

    onMethodClick(methodName){
        this.props.onMethodClick(this.props.service.name, methodName);
    }

    render(){
        return (
            <div>
                <ListItem  primaryText={this.props.service.name}/>
                <Collapse collapsed={false}>
                    <MethodList methodlist={this.props.service.methods} onMethodClick={this.onMethodClick}/>
                </Collapse>
                <Divider />
            </div>
        )
    }
}