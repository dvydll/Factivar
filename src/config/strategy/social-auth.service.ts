import { Injectable } from '@angular/core';
import { UserService } from '@app/services/user.service';
import { AuthStrategy } from './auth-strategy.class';
import { GoogleAuthStrategy } from './GoogleAuthStrategy';
import { FacebookAuthStrategy } from './FacebookAuthStrategy';
import { IAuth } from '../../app/interfaces/auth';
//import { AuthStrategyEnum } from './auth-strategy.enum';
import { IGoogleProfile } from '@app/interfaces/google-profile';

@Injectable({
  providedIn: 'root',
})
export class SocialAuthService implements IAuth {
  private strategy!: AuthStrategy;

  constructor(
    private googleAuthStrategy: GoogleAuthStrategy,
    private facebookAuthStrategy: FacebookAuthStrategy,
    private userService: UserService
  ) {}

  setStrategy(strategy: string) {
    switch (strategy) {
      //   case AuthStrategyEnum.Google:
      case 'google':
        this.strategy = this.googleAuthStrategy;
        break;
      //   case AuthStrategyEnum.Facebook:
      case 'facebook':
        this.strategy = this.facebookAuthStrategy;
        break;
      default:
        throw new Error(`Strategy not supported: ${strategy}`);
    }
  }

  public login() {
    this.strategy.login();

    const googleProfile = this.getProfile() as IGoogleProfile;

    if (googleProfile && googleProfile.email)
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

  public logout(): void {
    this.strategy.logout();
    this.userService.clearUser();
  }

  public getProfile() {
    return this.strategy.getProfile();
  }

  public getIdToken(): string {
    return this.strategy.getIdToken();
  }

  public getIsLoggedIn(): boolean {
    return this.strategy.getIsLoggedIn();
  }
}
