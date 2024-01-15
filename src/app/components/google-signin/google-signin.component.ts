import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() idToken = new EventEmitter<string>();
  
  constructor(private socialAuthService: SocialAuthService) {}

  loginWithGoogle() {
    this.socialAuthService.login();
    // window.location.reload();
    // const googleIdToken = localStorage.getItem('googleIdToken');
    const googleIdToken = this.socialAuthService.getIdToken();
    this.idToken.emit(googleIdToken);
  }
}
