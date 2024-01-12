import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { AuthStrategy } from './auth-strategy.class';
import { Inject, Injectable } from '@angular/core';
import { GOOGLE_OAUTH_CONFIG } from '../tokens/oauth-conection.token';

@Injectable()
export class GoogleAuthStrategy extends AuthStrategy {
  constructor(
    oauthService: OAuthService,
    @Inject(GOOGLE_OAUTH_CONFIG) config: AuthConfig
  ) {
    super(oauthService, config);
  }

  // Implementación de métodos específicos de Google aquí...
}
