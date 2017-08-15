import * as React from "react";

import { IPolyglotSettings, ISettingsUIState } from "../types/index";

import SingleLineTextEntry from "./singleLineTextEntry";
import MultiLineTextEntry from "./multiLineTextEntry";

// TODO: Change to using local .scss files?

export interface ISettingsProps {
    polyglotSettings: IPolyglotSettings;
    settingsUIState: ISettingsUIState;
    handleTextFieldInputChange: (settingStateId: string, newValue: string | number) => void;
    handleListServicesClick: () => void;
    handlePathDoubleClick: (stateId: string, message: string, allowMultiSelect: boolean) => void;
}

function Settings({ polyglotSettings, settingsUIState,
    handleTextFieldInputChange, handlePathDoubleClick, handleListServicesClick }: ISettingsProps) {
    return (
        <div>
            <SingleLineTextEntry
                id="endpoint"
                label="gRPC Endpoint"
                value={polyglotSettings.endpoint}
                errorText="Endpoint Required"
                placeholder="<host>:<port>"
                handleChange={handleTextFieldInputChange}
                required={settingsUIState.endpointRequired}
                error={settingsUIState.endpointError}
            />
            <SingleLineTextEntry
                id="protoDiscoveryRoot"
                value={polyglotSettings.protoDiscoveryRoot}
                handleChange={handleTextFieldInputChange}
                label="Proto Root Path"
                placeholder="/path/to/protoRoot"
                errorText="Proto Root Path Required"
                handleDoubleClick={() =>
                    handlePathDoubleClick("protoDiscoveryRoot",
                                          "Select Proto Discovery Root",
                                          false)}
            />
            <SingleLineTextEntry
                id="configSetPath"
                value={polyglotSettings.configSetPath}
                handleChange={handleTextFieldInputChange}
                label="Config Path"
                placeholder="/path/to/config.pb.json"
                handleDoubleClick={() =>
                    handlePathDoubleClick("configSetPath",
                                          "Select Config Path",
                                          false)}
            />
            <SingleLineTextEntry
                id="configName"
                value={polyglotSettings.configName}
                handleChange={handleTextFieldInputChange}
                label="Config Name"
                placeholder="development"
            />
            <SingleLineTextEntry
                id="tlsCaCertPath"
                value={polyglotSettings.tlsCaCertPath}
                handleChange={handleTextFieldInputChange}
                label="TLS CA Certificate Path"
                placeholder="/path/to/tlsCaCertificate"
                handleDoubleClick={() =>
                    handlePathDoubleClick("tlsCaCertPath",
                                          "Select TLS CA Certificate Path",
                                          false)}
            />
            <SingleLineTextEntry
                id="deadlineMs"
                value={polyglotSettings.deadlineMs}
                handleChange={handleTextFieldInputChange}
                label="Deadline (milliseconds)"
                placeholder="5000"
            />
            <MultiLineTextEntry
                id="addProtocIncludes"
                value={polyglotSettings.addProtocIncludes}
                handleChange={handleTextFieldInputChange}
                label="Add Protoc Includes"
                placeholder="<path1>,<path2>"
                handleDoubleClick={() =>
                    handlePathDoubleClick("addProtocIncludes",
                                          "Add Protoc Include Paths",
                                          true)}
            />
        </div>);
}

export default Settings;
