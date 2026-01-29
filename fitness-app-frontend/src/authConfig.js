
export const authConfig = {
    clientId: 'oauth2-pkce-client', // Replace with your actual client ID from Keycloak
    authorizationEndpoint: 'http://localhost:8181/realms/fitness_realm/protocol/openid-connect/auth',
    tokenEndpoint: 'http://localhost:8181/realms/fitness_realm/protocol/openid-connect/token',
    redirectUri: 'http://localhost:5173/',
    scope: 'openid profile email offline_access',
    extraQueryParameters: {
        prompt: 'login'
    },
    onRefreshTokenExpire: (event) => event.logIn(),
};
