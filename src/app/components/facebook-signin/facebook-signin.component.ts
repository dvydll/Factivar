import { Component } from '@angular/core';
import { SocialAuthService } from '@app/services/auth/social-auth.service';

@Component({
  selector: 'app-facebook-signin',
  standalone: true,
  imports: [],
  templateUrl: './facebook-signin.component.html',
  styleUrl: './facebook-signin.component.css',
  providers: [SocialAuthService],
})
export class FacebookSigninComponent {
  constructor(private socialAuthService: SocialAuthService) {}
  
  loginWithFacebook() {
    this.socialAuthService.initFacebookLogin();
    this.socialAuthService.login();
  }
}
