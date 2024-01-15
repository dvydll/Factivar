import { InjectionToken } from '@angular/core';
import { environment } from '@environments/environment.development';
import { AuthConfig } from 'angular-oauth2-oidc';

// Configurar los parámetros de conexión para cada proveedor
export const googleOAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin,
  strictDiscoveryDocumentValidation: false,
  clientId: environment.googleClient.id,
  scope: 'openid profile email',
  responseType: 'token',
  showDebugInformation: true,
};

export const facebookOAuthConfig: AuthConfig = {
  issuer: 'https://www.facebook.com/v18.0/dialog/oauth',
  redirectUri: window.location.origin,
  clientId: environment.facebookClient.id,
  dummyClientSecret: environment.facebookClient.secret,
  tokenEndpoint: 'https://graph.facebook.com/v18.0/oauth/access_token',
  scope: 'public_profile,email',
  responseType: 'token',
  showDebugInformation: true,
  oidc: false,
  requireHttps: false,
};

// Crear tokens para inyectar los servicios
export const GOOGLE_OAUTH_CONFIG = new InjectionToken<AuthConfig>(
  'google-oauth-config'
);

export const FACEBOOK_OAUTH_CONFIG = new InjectionToken<AuthConfig>(
  'facebook-oauth-config'
);
