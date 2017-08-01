import React from 'react';

import Toolbar from 'react-md/lib/Toolbars';

export class Header extends React.Component{
    render(){
        return (
            // <div className="md-paper md-paper--1 md-toolbar md-background--primary md-toolbar--text-white md-toolbar--prominent md-toolbar--fixed md-toolbar--over-drawer main-toolbar">
            //     <h2 className="md-title--toolbar-prominent">Header: Dragoman</h2>
            // </div>
        <Toolbar
          themed
          title="Dragoman"
          className="md-toolbar--fixed"
        />
        )
    }
}