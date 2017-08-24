import * as React from 'react';
import * as ReactMD from 'react-md';

import ServiceListItem from './serviceListItem';
import Settings from '../containers/settings';
import { Service,  SettingsUIState } from '../types/index';

export interface ISideBarProps {
    serviceMap: Map<string, Service>;
    settingsUIState: SettingsUIState;
    handleMethodClick: (serviceName: string, methodName: string) => void;
    handleListServicesClick: () => void;
    handleSettingsClick: () => void;
    handlePathDoubleClick: (stateId: string, message: string, allowMultiSelect: boolean) => void;
    handlePathBlur: (id: string) => void;
}

function SideBar({ serviceMap, settingsUIState, handleMethodClick, handleListServicesClick,
                   handleSettingsClick, handlePathDoubleClick,
                   handlePathBlur}: ISideBarProps) {

    const serviceList: JSX.Element[] = [];

    serviceMap.forEach((service: Service, key: string) => {
        serviceList.push(
        <ServiceListItem
        service={service}
        key={service.name}
        onMethodClick={handleMethodClick}
        />);
    });

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
                <div className='md-list--drawer' key='services'>
                    {serviceList}
                </div>
                <ReactMD.ListItem
                    primaryText='Settings'
                    key='settings'
                    nestedItems={[<Settings handlePathBlur={handlePathBlur} handlePathDoubleClick={handlePathDoubleClick}/>]}
                    visible={settingsUIState.settingsOpen}
                    onClick={handleSettingsClick}
                    tileClassName='list-subheader'
                />
            </ReactMD.List>
        </div>
    );
}

export default SideBar;
