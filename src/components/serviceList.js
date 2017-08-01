import React from 'react';

import List from 'react-md/lib/Lists/List';
import Subheader from 'react-md/lib/Subheaders';
import Divider from 'react-md/lib/Dividers';
import {Service} from './service';

export class ServiceList extends React.Component {
    render(){
        const services = this.props.list.map(service =>
            <Service service={service} key={service.name} onMethodClick={this.props.onMethodClick}/>
        )
        return(
            <List style={{"display": "flex", "flexFlow": "column"}} className="md-toolbar-relative md-paper md-paper--1 md-drawer md-drawer--left md-drawer--fixed md-drawer--active md-transition--decceleration md-background--card">
                <Subheader primaryText="Services"/>
                <Divider />
                <div className="md-list--drawer">
                    {services}
                </div>
            </List>
        );
    }
}

ServiceList.propTypes = {
    list: React.PropTypes.array
}