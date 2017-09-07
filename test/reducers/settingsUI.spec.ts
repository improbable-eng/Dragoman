// import settingsUI,  {initialSettingsUIState} from '../../app/reducers/settingsUI';
// import * as settingsUIActions from '../../app/actions/settingsUI';

// describe('settings UI reducer', () => {
//   describe('endpoint error', () => {
//     it('should handle initial state', () => {
//       expect(settingsUI(undefined, { type: 'UNKNOWN', payload: {} })).toEqual(initialSettingsUIState);
//     });

//     it('should handle SET_ENDPOINT_ERROR', () => {
//       expect(settingsUI(undefined, settingsUIActions.setEndpointError(true)).endpointError).toEqual(true);
//     });

//     it('should handle SET_ENDPOINT_REQUIRED', () => {
//       expect(settingsUI(undefined, settingsUIActions.setEndpointRequired(true)).endpointRequired).toEqual(true);
//     });

//     it('should handle SET_CONFIG_SET_PATH_ERROR', () => {
//       expect(settingsUI(undefined, settingsUIActions.setConfigSetPathError(true)).configSetPathError).toEqual(true);
//     });

//     it('should handle SET_ADD_PROTOC_INCLUDES_ERRORS', () => {
//       expect(settingsUI(undefined, settingsUIActions.setAddProtocIncludesError([true, false])).addProtocIncludesErrors).toEqual([true, false]);
//     });

//     it('should handle SET_OAUTH_REFRESH_TOKEN_ENDPOINT_URL_ERROR', () => {
//       expect(settingsUI(undefined, settingsUIActions.setOauthRefreshTokenEndpointUrlError(true)).oauthRefreshTokenEndpointUrlError).toEqual(true);
//     });

//     it('should handle SET_OAUTH_REFRESH_TOKEN_PATH_ERROR', () => {
//       expect(settingsUI(undefined, settingsUIActions.setOauthRefreshTokenPathError(true)).oauthRefreshTokenPathError).toEqual(true);
//     });

//     it('should handle SET_OAUTH_ACCESS_TOKEN_PATH_ERROR', () => {
//       expect(settingsUI(undefined, settingsUIActions.setOauthAccessTokenPathError(true)).oauthAccessTokenPathError).toEqual(true);
//     });

//     it('should handle SET_TLS_CA_CERT_PATH_ERROR', () => {
//       expect(settingsUI(undefined, settingsUIActions.setTlsCaCertPathError(true)).tlsCaCertPathError).toEqual(true);
//     });

//     it('should handle SET_TLS_CLIENT_KEY_PATH_ERROR', () => {
//       expect(settingsUI(undefined, settingsUIActions.setTlsClientKeyPathError(true)).tlsClientKeyPathError).toEqual(true);
//     });

//     it('should handle SET_TLS_CLIENT_CERT_PATH_ERROR', () => {
//       expect(settingsUI(undefined, settingsUIActions.setTlsClientCertPathError(true)).tlsClientCertPathError).toEqual(true);
//     });
//   });
// });
