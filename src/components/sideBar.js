import React from 'react';

import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';

import Button from 'react-md/lib/Buttons/Button';

import { Service } from './service';
import { Settings } from './settings';

export class SideBar extends React.Component {
    render(){
        const services = this.props.services.map(service =>
            <Service 
            service={service} key={service.name} 
            onMethodClick={this.props.onMethodClick} />
        );

        const settings = (
            <div>
                <Settings 
                endpoint={this.props.endpoint}
                endpointError={this.props.endpointError}
                handleEndpointChange ={this.props.handleEndpointChange}
                endpointRequired={this.props.endpointRequired}
                protoPath={this.props.protoPath}
                handleTextChange={this.props.handleTextChange}
                listServices={this.props.listServices} 
                configSetPath={this.props.configSetPath}
                addProtocIncludes={this.props.addProtocIncludes}
                configName={this.props.configName}
                tlsCaCertPath={this.props.tlsCaCertPath}
                deadlineMs={this.props.deadlineMs}
                handlePathDoubleClick={this.props.handlePathDoubleClick}/>
            </div>
        );
        return(
            <div>
                <List 
                style={{"display": "flex", "flexFlow": "column", "padding-top":0}} 
                className={"md-toolbar-relative md-paper md-paper--1 " + 
                "md-drawer md-drawer--left md-drawer--fixed md-drawer--active " + 
                "md-transition--decceleration md-background--card"}>
                    <ListItem
                    className="listServicesItemButton"
                    children={
                        <Button
                        flat
                        secondary
                        raised
                        label="List Services" 
                        onClick={this.props.handleListServicesClick}
                        tileStyle={{padding:0}}
                        style={{"width":"100%", "height":"100%", borderRadius:0 }}/>}
                    /> 
                    <div className="md-list--drawer">
                        {services}
                    </div>
                    <ListItem 
                    primaryText="Settings"
                    nestedItems={settings}
                    isOpen={this.props.settingsOpen}
                    onClick={this.props.handleSettingsClick}
                    tileClassName="list-subheader"
                    />
                </List>
            </div>
        );
    }
}