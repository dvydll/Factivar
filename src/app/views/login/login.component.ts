import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { environment } from '@environments/environment.development';
import { AuthService } from '@app/services/auth/auth.service';
import { PasswordInputComponent } from '../../components/password-input/password-input.component';
import { GoogleSigninComponent } from '../../components/google-signin/google-signin.component';
import { FacebookSigninComponent } from '../../components/facebook-signin/facebook-signin.component';
import { ILoginUser } from '@app/interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    PasswordInputComponent,
    GoogleSigninComponent,
    FacebookSigninComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService, AuthService],
})
export class LoginComponent {
  infoLogin: ILoginUser = {
    email: '',
    password: '',
  };
  showPassword: boolean = false;

  showHidePassword(checked: boolean) {
    this.showPassword = checked;
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  login() {
    this.authService.login(this.infoLogin).subscribe({
      next: (data) => {
        //const user: ILoginResponse = { ...data };

        sessionStorage.setItem(environment.storage.user, JSON.stringify(data));
        this.router.navigateByUrl('clientes');
      },
      error: (err) => {
        console.warn(err);

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.msg,
        });
      },
    });
  }
}
