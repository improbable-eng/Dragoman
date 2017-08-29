import * as React from 'react';
import * as ReactMD from 'react-md';

// import ServiceListItem from './serviceListItem';
import Settings from '../containers/settings';
import ServiceList from '../containers/ServiceList';
import { DragomanService } from '../reducers/serviceList';
import { AppUIState } from '../reducers/appUI';

export interface ISideBarProps {
    serviceMap: Map<string, DragomanService>;
    appState: AppUIState;
    handleListServicesClick: () => void;
    handleSettingsClick: () => void;
}

function SideBar({ serviceMap, appState, handleListServicesClick,
    handleSettingsClick }: ISideBarProps) {
    return (
        <div>
            <ReactMD.List
                style={{ display: 'flex', flexFlow: 'column', paddingTop: 0 }}
                className={'md-toolbar-relative md-paper md-paper--1 ' +
                    'md-drawer md-drawer--left md-drawer--fixed md-drawer--active ' +
                    'md-transition--decceleration md-background--card'}
            >
                <ReactMD.ListItem
                    key='listServicesButton'
                    primaryText=''
                    className='list-services-item-button'
                    children={
                        <ReactMD.Button
                            key='button'
                            secondary={true}
                            flat={true}
                            swapTheming={true}
                            children={'List Services'}
                            onClick={handleListServicesClick}
                            style={{ width: '100%', height: '100%', borderRadius: 0 }}
                        />}
                />
                <ServiceList />
                <ReactMD.ListItem
                    primaryText='Settings'
                    key='settings'
                    nestedItems={[<Settings />]}
                    visible={appState.settingsOpen}
                    onClick={handleSettingsClick}
                    tileClassName='list-subheader'
                />
            </ReactMD.List>
        </div>
    );
}

export default SideBar;
