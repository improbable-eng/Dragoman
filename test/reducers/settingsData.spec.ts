import settingsData, { initialSettingsDataState } from '../../app/reducers/settingsData';
import * as settingsDataActions from '../../app/actions/settingsData';

describe('settings UI reducer', () => {
    describe('endpoint error', () => {
        it('should handle initial state', () => {
            expect(settingsData(undefined, { type: 'UNKNOWN', payload: {} })).toEqual(initialSettingsDataState);
        });

        it('should handle SET_PROTO_DISCOVERY_ROOT', () => {
            expect(settingsData(undefined, settingsDataActions.setProtoDiscoveryRoot('/Users')).protoDiscoveryRoot).toEqual('/Users');
        });

        it('should handle SET_ENDPOINT', () => {
            expect(settingsData(undefined, settingsDataActions.setEndpoint('host:50')).endpoint).toEqual('host:50');
        });

        it('should handle SET_CONFIG_SET_PATH_ERROR', () => {
            expect(settingsData(undefined, settingsDataActions.setConfigSetPath('/Users')).configSetPath).toEqual('/Users');
        });

        it('should handle SET_CONFIG_NAME', () => {
            expect(settingsData(undefined, settingsDataActions.setConfigName('staging')).configName).toEqual('staging');
        });

        it('should handle SET_DEADLINE_MS', () => {
            expect(settingsData(undefined, settingsDataActions.setDeadlineMs(50)).deadlineMs).toEqual(50);
        });

        it('should handle SET_ADD_PROTOC_INCLUDES', () => {
            expect(settingsData(undefined, settingsDataActions.setAddProtocIncludes('/Users,/Users/peteboothroyd')).addProtocIncludes).toEqual('/Users,/Users/peteboothroyd');
        });

        it('should handle SET_OAUTH_REFRESH_TOKEN_ENDPOINT_URL', () => {
            expect(settingsData(undefined, settingsDataActions.setOauthRefreshTokenEndpointUrl('https://improbable.io')).oauthRefreshTokenEndpointUrl).toEqual('https://improbable.io');
        });

        it('should handle SET_OAUTH_CLIENT_ID', () => {
            expect(settingsData(undefined, settingsDataActions.setOauthClientId('id')).oauthClientId).toEqual('id');
        });

        it('should handle SET_OAUTH_CLIENT_SECRET', () => {
            expect(settingsData(undefined, settingsDataActions.setOauthClientSecret('secret')).oauthClientSecret).toEqual('secret');
        });

        it('should handle SET_OAUTH_REFRESH_TOKEN_PATH', () => {
            expect(settingsData(undefined, settingsDataActions.setOauthRefreshTokenPath('/Users')).oauthRefreshTokenPath).toEqual('/Users');
        });

        it('should handle SET_OAUTH_ACCESS_TOKEN_PATH', () => {
            expect(settingsData(undefined, settingsDataActions.setOauthAccessTokenPath('/Users')).oauthAccessTokenPath).toEqual('/Users');
        });

        it('should handle SET_USE_TLS', () => {
            expect(settingsData(undefined, settingsDataActions.setUseTls(true)).useTls).toEqual(true);
        });

        it('should handle SET_TLS_CA_CERT_PATH', () => {
            expect(settingsData(undefined, settingsDataActions.setTlsCaCertPath('/Users')).tlsCaCertPath).toEqual('/Users');
        });

        it('should handle SET_TLS_CLIENT_KEY_PATH', () => {
            expect(settingsData(undefined, settingsDataActions.setTlsClientKeyPath('/Users')).tlsClientKeyPath).toEqual('/Users');
        });

        it('should handle SET_TLS_CLIENT_CERT_PATH', () => {
            expect(settingsData(undefined, settingsDataActions.setTlsClientCertPath('/Users')).tlsClientCertPath).toEqual('/Users');
        });

        it('should handle SET_TLS_CLIENT_OVERRRIDE_AUTHORITY', () => {
            expect(settingsData(undefined, settingsDataActions.setTlsClientOverrideAuthority('authority')).tlsClientOverrideAuthority).toEqual('authority');
        });

        // TODO: Add tests for importing polyglot configs from an example config file
    });
});
