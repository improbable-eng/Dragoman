import * as React from "react";
import * as ReactMD from "react-md";

import ServiceListItem from "./serviceListItem";
import Settings from "./settings";
import { IService, IPolyglotSettings, ISettingsUIState } from "../types/index";

export interface ISideBarProps {
    services?: IService[];
    polyglotSettings: IPolyglotSettings;
    settingsUIState: ISettingsUIState;
    handleMethodClick: (serviceName: string, methodName: string) => void;
    handleListServicesClick: () => void;
    handleSettingsClick: () => void;
    handleTextFieldInputChange: (settingStateId: string, newValue: string | number) => void;
    handlePathDoubleClick: (stateId: string, message: string, allowMultiSelect: boolean) => void;
    handleEndpointChange: (newValue: string) => void;
}

function SideBar({ services, polyglotSettings, settingsUIState, handleMethodClick, handleListServicesClick,
                   handleSettingsClick, handlePathDoubleClick, handleTextFieldInputChange,
                   handleEndpointChange}: ISideBarProps) {
    const serviceList = services && services.map((service) =>
        (<ServiceListItem
            service={service}
            key={service.name}
            onMethodClick={handleMethodClick}
        />));

    const settings = (
        <div>
            <Settings
                polyglotSettings={polyglotSettings}
                settingsUIState={settingsUIState}
                handleTextFieldInputChange={handleTextFieldInputChange}
                handleListServicesClick={handleListServicesClick}
                handlePathDoubleClick={handlePathDoubleClick}
            />
        </div>
    );
    return (
        <div>
            <ReactMD.List
                style={{ display: "flex", flexFlow: "column", paddingTop: 0 }}
                className={"md-toolbar-relative md-paper md-paper--1 " +
                    "md-drawer md-drawer--left md-drawer--fixed md-drawer--active " +
                    "md-transition--decceleration md-background--card"}
            >
                <ReactMD.ListItem
                    key="listServicesButton"
                    primaryText=""
                    className="list-services-item-button"
                    children={
                        <ReactMD.Button
                            key="button"
                            secondary={true}
                            flat={true}
                            swapTheming={true}
                            children={"List Services"}
                            onClick={handleListServicesClick}
                            style={{ width: "100%", height: "100%" }}
                        />}
                />
                <div className="md-list--drawer" key="services">
                    {serviceList}
                </div>
                <ReactMD.ListItem
                    primaryText="Settings"
                    key="settings"
                    nestedItems={[settings]}
                    visible={settingsUIState.settingsOpen}
                    onClick={handleSettingsClick}
                    tileClassName="list-subheader"
                />
            </ReactMD.List>
        </div>
    );
}

export default SideBar;
