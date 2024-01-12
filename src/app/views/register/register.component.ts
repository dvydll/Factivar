import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegisterUser } from '@app/interfaces/user';
import { AuthService } from '@app/services/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [MessageService, AuthService],
})
export class RegisterComponent  {
  @ViewChild('fRegister') fRegister!: NgForm;
  infoRegister: IRegisterUser = {
    nombre: '',
    apellidos: '',
    avatar: undefined,
    email: '',
    telefono: '',
    password: '',
  };
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    
    if (file) {
      this.infoRegister.avatar = file;
    }
  }

  register() {
    console.log(this.infoRegister);
    
   this.authService.register(this.infoRegister).subscribe({
      next: (data) => {
        console.log({register: data});

        this.router.navigateByUrl('login');
      },
      error: (err: Error) => {
        console.error(err);

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message,
        });
      },
    });
  }

  validPass() {
    if (this.infoRegister.password !== this.password) {
      console.log('Las contraseñas no coinciden');
    }
  }
}
