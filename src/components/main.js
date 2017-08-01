import React from 'react';

import {ServiceList} from './serviceList';
import {RequestBuilder} from './requestBuilder';
import {ResponseViewer} from './responseViewer';


export class Main extends React.Component{
    render(){
        return (
            <div>
                <ServiceList list={this.props.services} onMethodClick={this.props.onMethodClick}/>
                <div style={{display:"flex"}} className="md-navigation-drawer-content md-navigation-drawer-content--prominent-offset md-transition--decceleration md-drawer-relative md-toolbar-relative">
                    <RequestBuilder />
                    <ResponseViewer />
                </div>
            </div>
        )
    }
}