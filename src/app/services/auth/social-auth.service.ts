import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { UserService } from '../user.service';
import { IGoogleProfile } from '@app/interfaces/google-profile';

@Injectable({
  providedIn: 'root',
})
export class SocialAuthService {
  private googleConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    clientId: environment.googleClient.id,
    redirectUri: window.location.origin + '/clientes',
    scope: 'openid profile email',
  };

  private facebookConfig: AuthConfig = {
    issuer: 'https://www.facebook.com/v18.0/dialog/oauth',
    redirectUri: window.location.origin,
    clientId: environment.facebookClient.id,
    dummyClientSecret: environment.facebookClient.secret,
    tokenEndpoint: 'https://graph.facebook.com/v18.0/oauth/access_token',
    scope: 'public_profile,email',
    oidc: false,
    requireHttps: false,
  };

  constructor(
    private oauthService: OAuthService,
    private userService: UserService
  ) {
    this.initGoogleLogin();
  }

  public login() {
    this.oauthService.initLoginFlow();

    const googleProfile = this.getProfile() as IGoogleProfile;
    console.log({ googleProfile });

    this.userService.updateUser({
      email: googleProfile.email,
      rol: 2,
      avatarUrl: googleProfile.picture,
      id: googleProfile.sub,
      nombre: googleProfile.name,
      apellidos: googleProfile.family_name,
      token: this.getIdToken(),
    });
  }

  public logout() {
    this.oauthService.logOut();
    this.userService.clearUser();
  }

  public getProfile() {
    return this.oauthService.getIdentityClaims();
  }

  public getIdToken() {
    return this.oauthService.getIdToken();
  }

  public getIsLoggedIn() {
    return this.oauthService.hasValidAccessToken();
  }

  // Google
  public initGoogleLogin() {
    this.oauthService.configure(this.googleConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  // Facebook
  public initFacebookLogin() {
    this.oauthService.configure(this.facebookConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
