import React from 'react';

import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import Subheader from 'react-md/lib/Subheaders';
import Divider from 'react-md/lib/Dividers';
import { ExpansionPanel } from 'react-md/lib/ExpansionPanels';

import { Service } from './service';
import { Settings } from './settings';

export class SideBar extends React.Component {
    render(){
        const services = this.props.services.map(service =>
            <Service 
            service={service} key={service.name} 
            onMethodClick={this.props.onMethodClick} />
        )

        const settings = (
            <div>
                <Settings 
                endpoint={this.props.endpoint}
                endpointError={this.props.endpointError}
                handleEndpointChange ={this.props.handleEndpointChange}
                endpointRequired={this.props.endpointRequired}
                protoPath={this.props.protoPath}
                handleProtoPathTextChange={this.props.handleProtoPathTextChange}
                handleProtoPathBlur={this.props.handleProtoPathBlur}
                listServices={this.props.listServices} />
            </div>
        );
        return(
            <div>
                <List 
                style={{"display": "flex", "flexFlow": "column"}} 
                className={"md-toolbar-relative md-paper md-paper--1 " + 
                "md-drawer md-drawer--left md-drawer--fixed md-drawer--active " + 
                "md-transition--decceleration md-background--card"}>
                    <Subheader 
                    primaryText="Services" 
                    style={{"color":"#212121", "font-family":"Roboto", "font-weight":"400"}} />
                    <div className="md-list--drawer">
                        {services}
                    </div>
                    <ListItem 
                    primaryText="Settings"
                    nestedItems={settings}
                    isOpen={this.props.settingsOpen}
                    onClick={this.props.handleSettingsClick} />
                </List>
            </div>
        );
    }
}