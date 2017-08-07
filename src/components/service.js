import React from 'react';

import { MethodList } from './methodList'

import ListItem from 'react-md/lib/Lists/ListItem';

export class Service extends React.Component{
    constructor(props){
        super(props);
        this.onMethodClick = this.onMethodClick.bind(this);
    }

    onMethodClick(methodName){
        this.props.onMethodClick(this.props.service.name, methodName);
    }

    render(){
        const methodList = <MethodList methodlist={this.props.service.methods} onMethodClick={this.onMethodClick}/>
        return (
            <div>
                <ListItem  
                primaryText={this.props.service.name}
                active={true}
                nestedItems={methodList}
                defaultOpen={true}/>
            </div>
        )
    }
}