import { Component } from '@angular/core';
import { SocialAuthService } from '@app/services/auth/social-auth.service';

@Component({
  selector: 'app-google-signin',
  standalone: true,
  imports: [],
  templateUrl: './google-signin.component.html',
  styleUrl: './google-signin.component.css',
  providers: [SocialAuthService],
})
export class GoogleSigninComponent {
  constructor(private socialAuthService: SocialAuthService) {}

  loginWithGoogle() {
    this.socialAuthService.initGoogleLogin();
    this.socialAuthService.login();
  }
}
