import * as React from 'react';
import { Autocomplete, Button } from 'react-md';

import TextEntry from './textEntry';

import { SettingsDataState, SETTINGS_IDS } from '../reducers/settingsData';
import { SettingsUIState } from '../reducers/settingsUI';

export type SettingsComponentProps = SettingsComponentState & SettingsComponentMethods;

export interface SettingsComponentState {
    settingsDataState: SettingsDataState;
    settingsUIState: SettingsUIState;
}

export interface SettingsComponentMethods {
    handleChange: (newValue: string | number, stateId: string) => void;
    handlePathDoubleClick: (settingsId: string, message: string, allowMultiSelect?: boolean) => void;
    handleDrop: (event: React.DragEvent<HTMLElement>, id: string, multiSelection?: boolean) => void;
    importConfigFile: () => void;
    saveConfigFile: () => void;
    handleConfigAutoComplete: (suggestion: string | number, suggestionIndex: number) => void;
}

export default function Settings({ settingsDataState, settingsUIState,
    handlePathDoubleClick, handleChange, handleDrop, importConfigFile,
    saveConfigFile, handleConfigAutoComplete }: SettingsComponentProps) {
    return (
        <div style={{height: '100%'}}>
            <div style={{ display: 'flex' }}>
                <Button
                    key='loadConfig'
                    secondary={true}
                    flat={true}
                    swapTheming={true}
                    children='Load Config'
                    onClick={importConfigFile}
                    style={{ width: '100%', height: 40, borderRadius: 0 }}
                />
                <Button
                    key='saveConfig'
                    secondary={true}
                    flat={true}
                    swapTheming={true}
                    children='Save Config'
                    onClick={saveConfigFile}
                    style={{ width: '100%', height: 40, borderRadius: 0 }}
                />
            </div>
            <div className='md-list--drawer'>
                <Autocomplete
                    style={{ padding: '0px 10px 0px 10px' }}
                    data={Array.from(settingsDataState.polyglotConfigs.keys())}
                    label='Config Name'
                    placeholder='development'
                    /* belowAnchor={{x: 'left', y: 'top'}} */
                    value={settingsDataState.configName}
                    onChange={(newValue: string) => handleChange(newValue, SETTINGS_IDS.CONFIG_NAME)}
                    onAutocomplete={handleConfigAutoComplete}
                />
                <TextEntry
                    id={SETTINGS_IDS.ENDPOINT}
                    label='gRPC Endpoint'
                    value={settingsDataState.endpoint}
                    errorText='Format must be host:port'
                    placeholder='<host>:<port>'
                    handleChange={handleChange}
                    required={settingsUIState.endpointRequired}
                    error={settingsUIState.endpointError}
                />
                <TextEntry
                    id={SETTINGS_IDS.PROTO_DISCOVERY_ROOT}
                    value={settingsDataState.protoDiscoveryRoot}
                    handleChange={handleChange}
                    label='Proto Root Path'
                    placeholder='/path/to/protoRoot'
                    errorText='Proto Root Path is invalid'
                    error={settingsUIState.protoDiscoveryRootError}
                    handleDoubleClick={() => handlePathDoubleClick(SETTINGS_IDS.PROTO_DISCOVERY_ROOT, 'Select Proto Discovery Root')}
                    handleDrop={handleDrop}
                />
                <TextEntry
                    id={SETTINGS_IDS.CONFIG_SET_PATH}
                    value={settingsDataState.configSetPath}
                    handleChange={handleChange}
                    label='Config Path'
                    placeholder='/path/to/config.pb.json'
                    errorText='Config Path is invalid'
                    handleDoubleClick={() => handlePathDoubleClick(SETTINGS_IDS.CONFIG_SET_PATH, 'Select Config Path')}
                    error={settingsUIState.configSetPathError}
                    handleDrop={handleDrop}
                />
                <TextEntry
                    id={SETTINGS_IDS.TLS_CA_CERT_PATH}
                    multiline={false}
                    value={settingsDataState.tlsCaCertPath}
                    handleChange={handleChange}
                    label='TLS CA Certificate Path'
                    placeholder='/path/to/tlsCaCertificate'
                    errorText='TLS CA Certificate Path is invalid'
                    error={settingsUIState.tlsCaCertPathError}
                    handleDoubleClick={() => handlePathDoubleClick(SETTINGS_IDS.TLS_CA_CERT_PATH, 'Select TLS CA Certificate Path')}
                    handleDrop={handleDrop}
                />
                <TextEntry
                    id={SETTINGS_IDS.DEADLINE_MS}
                    value={settingsDataState.deadlineMs <= 0 ? '' : settingsDataState.deadlineMs}
                    handleChange={handleChange}
                    label='Deadline (milliseconds)'
                    placeholder='5000'
                />
                <TextEntry
                    id={SETTINGS_IDS.ADD_PROTOC_INCLUDES}
                    multiline={true}
                    value={settingsDataState.addProtocIncludes}
                    handleChange={handleChange}
                    label='Add Protoc Includes'
                    placeholder='<path1>, <path2>'
                    // TODO: Move this logic out of the presentational component??
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
                    handleDrop={(event, id) => handleDrop(event, id, true)}
                />
                <TextEntry
                    id={SETTINGS_IDS.OAUTH_REFRESH_TOKEN_ENDPOINT_URL}
                    value={settingsDataState.oauthRefreshTokenEndpointUrl}
                    handleChange={handleChange}
                    label='Oauth refresh token endpoint url'
                    placeholder='https://example.com/oauth/endpoint'
                    errorText='Not a valid url'
                    error={settingsUIState.oauthRefreshTokenEndpointUrlError}
                />
                <TextEntry
                    id={SETTINGS_IDS.OAUTH_CLIENT_ID}
                    value={settingsDataState.oauthClientId}
                    handleChange={handleChange}
                    label='Oauth client id'
                    placeholder='id'
                />
                <TextEntry
                    id={SETTINGS_IDS.OAUTH_CLIENT_SECRET}
                    type={'password'}
                    value={settingsDataState.oauthClientSecret}
                    handleChange={handleChange}
                    label='Oauth Client Secret'
                    placeholder='secret'
                />
                <TextEntry
                    id={SETTINGS_IDS.OAUTH_REFRESH_TOKEN_PATH}
                    value={settingsDataState.oauthRefreshTokenPath}
                    handleChange={handleChange}
                    label='Oauth refresh token path'
                    placeholder='path/to/refresh_token'
                    error={settingsUIState.oauthRefreshTokenPathError}
                    errorText='Oaut Refresh Token Path is invalid'
                    handleDoubleClick={() => handlePathDoubleClick(SETTINGS_IDS.OAUTH_REFRESH_TOKEN_PATH, 'Add Oauth Refresh Token Path')}
                    handleDrop={handleDrop}
                />
                <TextEntry
                    id={SETTINGS_IDS.OAUTH_ACCESS_TOKEN_PATH}
                    value={settingsDataState.oauthAccessTokenPath}
                    handleChange={handleChange}
                    label='Oauth access token path'
                    placeholder='path/to/access_token'
                    error={settingsUIState.oauthAccessTokenPathError}
                    errorText='Oauth Access Token Path is invalid'
                    handleDoubleClick={() => handlePathDoubleClick(SETTINGS_IDS.OAUTH_ACCESS_TOKEN_PATH, 'Add Oauth Access Token Path')}
                    handleDrop={handleDrop}
                />
            </div>
        </div>);
}
