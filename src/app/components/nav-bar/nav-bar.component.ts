import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { SocialAuthService } from '@app/services/auth/social-auth.service';
import { UserService } from '@app/services/user.service';
import { IUserPayload } from '@app/interfaces/user';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
  providers: [AuthService, SocialAuthService, UserService],
})
export class NavBarComponent implements OnInit {
  user!: IUserPayload;

  constructor(
    private userService: UserService,
    private socialAuthService: SocialAuthService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Suscribirse al Observable del usuario
    this.userService.getUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => console.error(err),
    });
  }

  getToken(){
    console.log(this.socialAuthService.getIdToken())
  }

  cerrarSesion() {
    if (this.socialAuthService.getProfile()) {
      this.socialAuthService.logout();
    } else {
      this.authService.logout({ email: this.user.email });
    }
  }
}

// export class NavBarComponent implements OnInit {
//   private _googleUserProfile = signal<IGoogleProfile>(null!);
//   private _user = signal<IUser>(null!);
//   private _userAvatar = computed(
//     () => this.googleUser?.picture || this.user.avatar
//   );
//   private _userName = computed(
//     () => this.googleUser?.name || this.user.email
//   );

//   public get user() {
//     return this._user();
//   }
//   public get googleUser() {
//     return this._googleUserProfile();
//   }
//   public get avatar() {
//     return this._userAvatar();
//   }
//   public get name() {
//     return this._userName();
//   }

//   constructor(
//     private authService: AuthService,
//     private socialAuthService: SocialAuthService
//   ) {
//     this._googleUserProfile.set(
//       this.socialAuthService.getProfile() as IGoogleProfile
//     );
//   }

//   getUser() {
//     return this.authService.getUser().subscribe({
//       next: (data) => {
//         this._user.update((current) => (current === data ? current : data));
//       },
//       error: (err) => {
//         console.error(err);
//       },
//       complete: () => {
//         console.info('✅');
//       },
//     });
//   }

//   ngOnInit(): void {
//     this._googleUserProfile.update(
//       () => this.socialAuthService.getProfile() as IGoogleProfile
//     );

//     this.getUser();
//   }

//   cerrarSesion() {
//     if (this._googleUserProfile()) {
//       this.socialAuthService.logout();
//       this._googleUserProfile.update(() => null!);
//     } else {
//       const email = this.user.email;
//       this.authService.logout({ email });
//     }
//   }
// }