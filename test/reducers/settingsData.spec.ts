// import * as fs from 'fs';
// import * as path from 'path';

// import settingsData, { initialSettingsDataState, SettingsDataState } from '../../app/reducers/settingsData';
// import * as settingsDataActions from '../../app/actions/settingsData';
// import { polyglot as polyglotConfig } from '../../app/proto/config';

// // Meant to match the examples given in the resources/example.polyglot.config.pb.json file
// const examplePolyglotConfiguration1 = polyglotConfig.Configuration.create({
//     name: 'example1',
//     call_config: {
//         use_tls: true,
//         deadline_ms: 50,
//         oauth_config: {
//             refresh_token_credentials: {
//                 refresh_token_path: '/path/to/refresh_token',
//                 token_endpoint_url: 'https://www.example.com',
//                 client: {
//                     id: 'oauth_id',
//                     secret: 'oauth_secret',
//                 },
//             },
//             access_token_credentials: {
//                 access_token_path: '/path/to/access_token',
//             },
//         },
//     },
//     proto_config: {
//         proto_discovery_root: '/path/to/proto_discovery_root',
//         include_paths: [
//             '/path/to/proto_include_1',
//             '/path/to/proto_include_2',
//         ],
//     },
// });

// const examplePolyglotConfiguration2 = polyglotConfig.Configuration.create({
//     name: 'example2',
//     call_config: {
//         use_tls: false,
//         tls_ca_cert_path: '/path/to/tls_ca_cert',
//         tls_client_cert_path: '/path/to/tls_client_cert',
//         tls_client_key_path: '/path/to/tls_client_key',
//         tls_client_override_authority: 'tls_override_authority',
//     },
//     // proto_config: {
//         proto_discovery_root: '/path/to/proto_discovery_root',
//         include_paths: [
//             '/path/to/proto_include_1',
//             '/path/to/proto_include_2',
//         ],
//     },
// });

// // const exampleSettingsDataState: SettingsDataState = {
// //     configName: 'example2',
// //     protoDiscoveryRoot: '/path/to/proto_discovery_root',
// //     deadlineMs: 50,
// //     useTls: true,
// //     oauthAccessTokenPath: '/path/to/access_token',
// //     oauthRefreshTokenPath: '/path/to/refresh_token',
// //     oauthClientId: 'oauth_id',
// //     oauthClientSecret: 'oauth_secret',
// //     oauthRefreshTokenEndpointUrl: 'https://www.example.com',
// //     tlsCaCertPath: '/path/to/tls_ca_cert',
// //     tlsClientCertPath: '/path/to/tls_client_cert',
// //     tlsClientKeyPath: '/path/to/tls_client_key',
// //     tlsClientOverrideAuthority: 'tls_override_authority',
// //     endpoint: 'host:port',
// //     addProtocIncludes: '/path/to/proto_include_1,/path/to/proto_include_2',
// // };

// describe('settings UI reducer', () => {
//     describe('endpoint error', () => {
//         it('should handle initial state', () => {
//             expect(settingsData(undefined, { type: 'UNKNOWN', payload: {} })).toEqual(initialSettingsDataState);
//         });

//         it('should handle SET_PROTO_DISCOVERY_ROOT', () => {
//             expect(settingsData(undefined, settingsDataActions.setProtoDiscoveryRoot('/Users')).protoDiscoveryRoot).toEqual('/Users');
//         });

//         it('should handle SET_ENDPOINT', () => {
//             expect(settingsData(undefined, settingsDataActions.setEndpoint('host:50')).endpoint).toEqual('host:50');
//         });

//         it('should handle SET_CONFIG_NAME', () => {
//             expect(settingsData(undefined, settingsDataActions.setConfigName('staging')).configName).toEqual('staging');
//         });

//         it('should handle SET_DEADLINE_MS', () => {
//             expect(settingsData(undefined, settingsDataActions.setDeadlineMs(50)).deadlineMs).toEqual(50);
//         });

//         it('should handle SET_ADD_PROTOC_INCLUDES', () => {
//             expect(settingsData(undefined, settingsDataActions.setAddProtocIncludes('/Users,/Users/peteboothroyd')).addProtocIncludes).toEqual('/Users,/Users/peteboothroyd');
//         });

//         it('should handle SET_OAUTH_REFRESH_TOKEN_ENDPOINT_URL', () => {
//             expect(settingsData(undefined, settingsDataActions.setOauthRefreshTokenEndpointUrl('https://improbable.io')).oauthRefreshTokenEndpointUrl).toEqual('https://improbable.io');
//         });

//         it('should handle SET_OAUTH_CLIENT_ID', () => {
//             expect(settingsData(undefined, settingsDataActions.setOauthClientId('id')).oauthClientId).toEqual('id');
//         });

//         it('should handle SET_OAUTH_CLIENT_SECRET', () => {
//             expect(settingsData(undefined, settingsDataActions.setOauthClientSecret('secret')).oauthClientSecret).toEqual('secret');
//         });

//         it('should handle SET_OAUTH_REFRESH_TOKEN_PATH', () => {
//             expect(settingsData(undefined, settingsDataActions.setOauthRefreshTokenPath('/Users')).oauthRefreshTokenPath).toEqual('/Users');
//         });

//         it('should handle SET_OAUTH_ACCESS_TOKEN_PATH', () => {
//             expect(settingsData(undefined, settingsDataActions.setOauthAccessTokenPath('/Users')).oauthAccessTokenPath).toEqual('/Users');
//         });

//         it('should handle SET_USE_TLS', () => {
//             expect(settingsData(undefined, settingsDataActions.setUseTls(true)).useTls).toEqual(true);
//         });

//         it('should handle SET_TLS_CA_CERT_PATH', () => {
//             expect(settingsData(undefined, settingsDataActions.setTlsCaCertPath('/Users')).tlsCaCertPath).toEqual('/Users');
//         });

//         it('should handle SET_TLS_CLIENT_KEY_PATH', () => {
//             expect(settingsData(undefined, settingsDataActions.setTlsClientKeyPath('/Users')).tlsClientKeyPath).toEqual('/Users');
//         });

//         it('should handle SET_TLS_CLIENT_CERT_PATH', () => {
//             expect(settingsData(undefined, settingsDataActions.setTlsClientCertPath('/Users')).tlsClientCertPath).toEqual('/Users');
//         });

//         it('should handle SET_TLS_CLIENT_OVERRRIDE_AUTHORITY', () => {
//             expect(settingsData(undefined, settingsDataActions.setTlsClientOverrideAuthority('authority')).tlsClientOverrideAuthority).toEqual('authority');
//         });

//         // TODO: Add tests for importing polyglot configs from an example config file
//         it('should handle IMPORT_POLYGLOT_CONFIGS', () => {
//             const rawFile = fs.readFileSync(path.join(__dirname, '../resources/example.polyglot.config.pb.json'));
//             const parsedJson = JSON.parse(rawFile.toString('utf-8'));
//             const fromJson = polyglotConfig.ConfigurationSet.fromObject(parsedJson);

//             const importedPolyglotConfigs
//                 = settingsData(undefined, settingsDataActions.importPolyglotConfigs(fromJson)).polyglotConfigs;

//             expect(importedPolyglotConfigs.size).toEqual(2);
//             expect(importedPolyglotConfigs.get('example1')).toEqual(examplePolyglotConfiguration1);
//             expect(importedPolyglotConfigs.get('example2')).toEqual(examplePolyglotConfiguration2);
//         });

//         it('should handle SET_SETTINGS_DATA_STATE_FROM_POLYGLOT_CONFIG', () => {
//             const settingsDataState = settingsData(undefined, settingsDataActions.setSettingsDataStateFromPolyglotConfig(examplePolyglotConfiguration1 as polyglotConfig.IConfiguration));
//             const expectedDataState: SettingsDataState = {
//                 ...initialSettingsDataState,
//                 protoDiscoveryRoot: '/path/to/proto_discovery_root',
//                 addProtocIncludes: '/path/to/proto_include_1, /path/to/proto_include_2',
//                 oauthAccessTokenPath: '/path/to/access_token',
//                 oauthRefreshTokenPath: '/path/to/refresh_token',
//                 oauthClientId: 'oauth_id',
//                 oauthClientSecret: 'oauth_secret',
//                 deadlineMs: 50,
//                 oauthRefreshTokenEndpointUrl: 'https://www.example.com',
//                 useTls: true,
//                 configName: 'example1',
//             };
//             expect(settingsDataState).toEqual(expectedDataState);
//         });

//         it('should handle ADD_POLYGLOT_CONFIG_FROM_CURRENT_FIELDS', () => {
//             const settingsDataState = settingsData(undefined, { type: 'UNKNOWN', payload: {} } );
//             const expectedDataState: SettingsDataState = {
//                 ...initialSettingsDataState,
//                 protoDiscoveryRoot: '/path/to/proto_discovery_root',
//                 addProtocIncludes: '/path/to/proto_include_1, /path/to/proto_include_2',
//                 oauthAccessTokenPath: '/path/to/access_token',
//                 oauthRefreshTokenPath: '/path/to/refresh_token',
//                 oauthClientId: 'oauth_id',
//                 oauthClientSecret: 'oauth_secret',
//                 deadlineMs: 50,
//                 oauthRefreshTokenEndpointUrl: 'https://www.example.com',
//                 useTls: true,
//                 configName: 'example1',
//             };
//             expect(settingsDataState).toEqual(expectedDataState);
//         });
//     });
// });
