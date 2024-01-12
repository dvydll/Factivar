import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { IAuth } from '../../app/interfaces/auth';

export abstract class AuthStrategy implements IAuth {
  constructor(
    protected oauthService: OAuthService,
    protected config: AuthConfig
  ) {
    this.oauthService.configure(this.config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  // Métodos comunes aquí...
  public login(): void {
    this.oauthService.initLoginFlow();
  }

  public logout(): void {
    this.oauthService.logOut();
  }

  public getProfile(): Record<string, any> {
    return this.oauthService.getIdentityClaims();
  }

  public getIdToken(): string {
    return this.oauthService.getIdToken();
  }

  public getIsLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }
}
