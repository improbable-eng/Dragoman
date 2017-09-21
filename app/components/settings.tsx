import * as React from 'react';
import { Autocomplete, Button, List, Subheader, ListItemControl, Switch } from 'react-md';

import TextEntry from './textEntry';

import { SettingsDataState, SETTINGS_IDS } from '../reducers/settingsData';
import { SettingsUIState } from '../reducers/settingsUI';

const styles = require('./settings.scss');

export type SettingsComponentProps = SettingsComponentState & SettingsComponentMethods;

export interface SettingsComponentState {
    settingsDataState: SettingsDataState;
    settingsUIState: SettingsUIState;
}

export interface SettingsComponentMethods {
    handleChange: (newValue: string | boolean, settingsId: SETTINGS_IDS) => void;
    handlePathDoubleClick: (settingsId: SETTINGS_IDS, message: string, allowMultiSelect?: boolean) => void;
    handleDrop: (event: React.DragEvent<HTMLElement>, settingsId: SETTINGS_IDS, multiSelection?: boolean) => void;
    importConfigFile: () => void;
    saveConfigFile: () => void;
    handleConfigAutoComplete: (suggestion: string | number) => void;
}

export default function Settings({ settingsDataState, settingsUIState,
    handlePathDoubleClick, handleChange, handleDrop, importConfigFile,
    saveConfigFile, handleConfigAutoComplete }: SettingsComponentProps) {
    return (
        <div className={styles.drawer} id='settingsDrawer'>
            <div className={styles['buttons-container']}>
                <Button
                    key='loadConfig'
                    secondary={true}
                    flat={true}
                    swapTheming={true}
                    children='Load'
                    onClick={importConfigFile}
                    className={styles.button}
                />
                <Button
                    key='saveConfig'
                    secondary={true}
                    flat={true}
                    swapTheming={true}
                    children='Save'
                    onClick={saveConfigFile}
                    className={styles.button}
                />
            </div>
            <List className='md-list--drawer'>
                <Autocomplete
                    className={styles['auto-complete']}
                    data={Array.from(settingsDataState.polyglotConfigs.keys())}
                    label='Config Name'
                    placeholder='development'
                    closeOnOutsideClick={true}
                    onMenuOpen={() => { console.log('menu open'); }}// tslint:disable-line
                    id={SETTINGS_IDS.CONFIG_NAME}
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
                <Subheader
                    primaryText='OAuth'
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
                <Subheader
                    primaryText='TLS'
                />
                <ListItemControl
                    secondaryAction={
                        <Switch
                            id='toggle-use-tls'
                            name='Use TLS'
                            label='Use TLS'
                            checked={settingsDataState.useTls}
                            onChange={(checked: boolean) => handleChange(checked, SETTINGS_IDS.USE_TLS)}
                            labelBefore
                            defaultChecked
                        />
                    }
                />
                <TextEntry
                    id={SETTINGS_IDS.TLS_CA_CERT_PATH}
                    value={settingsDataState.tlsCaCertPath}
                    handleChange={handleChange}
                    label='TLS CA Certificate Path'
                    placeholder='/path/to/tlsCaCertificate'
                    errorText='TLS CA Certificate Path is invalid'
                    error={settingsUIState.tlsCaCertPathError}
                    handleDoubleClick={handlePathDoubleClick}
                    handleDrop={handleDrop}
                />
                <TextEntry
                    id={SETTINGS_IDS.TLS_CLIENT_CERT_PATH}
                    value={settingsDataState.tlsClientCertPath}
                    handleChange={handleChange}
                    label='TLS Client Certificate Path'
                    placeholder='/path/to/tlsClientCertificate'
                    errorText='TLS Client Certificate Path is invalid'
                    error={settingsUIState.tlsClientCertPathError}
                    handleDoubleClick={handlePathDoubleClick}
                    handleDrop={handleDrop}
                />
                <TextEntry
                    id={SETTINGS_IDS.TLS_CLIENT_KEY_PATH}
                    value={settingsDataState.tlsClientKeyPath}
                    handleChange={handleChange}
                    label='TLS Client Key Path'
                    placeholder='/path/to/tlsClientKey'
                    errorText='TLS Client Key Path is invalid'
                    error={settingsUIState.tlsClientKeyPathError}
                    handleDoubleClick={handlePathDoubleClick}
                    handleDrop={handleDrop}
                />
                <TextEntry
                    id={SETTINGS_IDS.TLS_CLIENT_OVERRIDE_AUTHORITY}
                    value={settingsDataState.tlsClientOverrideAuthority}
                    handleChange={handleChange}
                    label='TLS Client Override Authority'
                    placeholder='host'
                />
            </List>
        </div>);
}
