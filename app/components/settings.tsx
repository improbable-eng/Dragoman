import * as React from 'react';

import SingleLineTextEntry from './singleLineTextEntry';
import MultiLineTextEntry from './multiLineTextEntry';

import { SettingsDataState, SETTINGS_IDS } from '../reducers/settingsData';
import { SettingsUIState } from '../reducers/settingsUI';

export type SettingsComponentProps = SettingsComponentState & SettingsComponentMethods;

export interface SettingsComponentState {
    settingsDataState: SettingsDataState;
    settingsUIState: SettingsUIState;
}

export interface SettingsComponentMethods {
    handleEndpointChange: (newEndpoint: string) => void;
    handleProtoDiscoveryRootChange: (newProtoDiscoveryRoot: string) => void;
    handleConfigSetPathChange: (newConfigSetPath: string) => void;
    handleConfigNameChange: (newConfigName: string) => void;
    handleTlsCaCertPathChange: (newTlsCaCertPath: string) => void;
    handleDeadlineMsChange: (newDeadlineMs: number) => void;
    handleAddProtocIncludesChange: (newAddProtocIncludes: string) => void;
    handlePathDoubleClick: (settingsId: string, message: string, allowMultiSelect: boolean) => void;
    handlePathBlur: (settingsId: string) => void;
}

export default function Settings({ settingsDataState, settingsUIState,
    handleEndpointChange, handleProtoDiscoveryRootChange, handleConfigSetPathChange,
    handleConfigNameChange, handleTlsCaCertPathChange, handleDeadlineMsChange,
    handleAddProtocIncludesChange, handlePathDoubleClick,
    handlePathBlur }: SettingsComponentProps) {
    return (
        <div>
            <SingleLineTextEntry
                id={SETTINGS_IDS.ENDPOINT}
                label='gRPC Endpoint'
                value={settingsDataState.endpoint}
                errorText='Format must be host:port'
                placeholder='<host>:<port>'
                handleChange={handleEndpointChange}
                required={settingsUIState.endpointRequired}
                error={settingsUIState.endpointError}
            />
            <SingleLineTextEntry
                id={SETTINGS_IDS.PROTO_DISCOVERY_ROOT}
                value={settingsDataState.protoDiscoveryRoot}
                handleChange={handleProtoDiscoveryRootChange}
                label='Proto Root Path'
                placeholder='/path/to/protoRoot'
                errorText='Proto Root Path is invalid'
                error={settingsUIState.protoDiscoveryRootError}
                handleDoubleClick={() =>
                    handlePathDoubleClick(SETTINGS_IDS.PROTO_DISCOVERY_ROOT,
                        'Select Proto Discovery Root',
                        false)}
                handleBlur={() => handlePathBlur(SETTINGS_IDS.PROTO_DISCOVERY_ROOT)}
            />
            <SingleLineTextEntry
                id={SETTINGS_IDS.CONFIG_SET_PATH}
                value={settingsDataState.configSetPath}
                handleChange={handleConfigSetPathChange}
                label='Config Path'
                placeholder='/path/to/config.pb.json'
                errorText='Config Path is invalid'
                handleBlur={() => handlePathBlur(SETTINGS_IDS.CONFIG_SET_PATH)}
                handleDoubleClick={() =>
                    handlePathDoubleClick(SETTINGS_IDS.CONFIG_SET_PATH,
                        'Select Config Path',
                        false)}
                error={settingsUIState.configSetPathError}
            />
            <SingleLineTextEntry
                id={SETTINGS_IDS.CONFIG_NAME}
                value={settingsDataState.configName}
                handleChange={handleConfigNameChange}
                label='Config Name'
                placeholder='development'
            />
            <SingleLineTextEntry
                id={SETTINGS_IDS.TLS_CA_CERT_PATH}
                value={settingsDataState.tlsCaCertPath}
                handleChange={handleTlsCaCertPathChange}
                label='TLS CA Certificate Path'
                placeholder='/path/to/tlsCaCertificate'
                errorText='TLS CA Certificate Path is invalid'
                error={settingsUIState.tlsCaCertPathError}
                handleBlur={() => handlePathBlur(SETTINGS_IDS.TLS_CA_CERT_PATH)}
                handleDoubleClick={() =>
                    handlePathDoubleClick(SETTINGS_IDS.TLS_CA_CERT_PATH,
                        'Select TLS CA Certificate Path',
                        false)}
            />
            <SingleLineTextEntry
                id={SETTINGS_IDS.DEADLINE_MS}
                value={settingsDataState.deadlineMs <= 0 ? undefined : settingsDataState.deadlineMs}
                handleChange={handleDeadlineMsChange}
                label='Deadline (milliseconds)'
                placeholder='5000'
            />
            <MultiLineTextEntry
                id={SETTINGS_IDS.ADD_PROTOC_INCLUDES}
                value={settingsDataState.addProtocIncludes}
                handleChange={handleAddProtocIncludesChange}
                label='Add Protoc Includes'
                placeholder='<path1>, <path2>'
                // TODO: Move this logic out of the presentational component
                // Searches the array of booleans, if any of the booleans are false then the overall
                // status of the field should be an error. If none are found the index=-1 < 0
                error={settingsUIState.addProtocIncludesErrors.indexOf(true) >= 0}
                // Display helpful error message by displaying which lines are invalid
                errorText={
                    `Path(s) ${settingsUIState.addProtocIncludesErrors.map((value, index) =>
                        value ? index + 1 : '').filter(Number).join(', ')} are invalid`}
                handleDoubleClick={() =>
                    handlePathDoubleClick(SETTINGS_IDS.ADD_PROTOC_INCLUDES,
                        'Add Protoc Include Paths',
                        true)}
                handleBlur={() => handlePathBlur(SETTINGS_IDS.ADD_PROTOC_INCLUDES)}
            />
        </div>);
}
