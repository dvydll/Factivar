import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { ILogin, ILoginResponse, Email, IRegister, IUser } from '@app/interfaces/login.interface';
import { environment } from '@environments/environment.development';
import { Observable, tap } from 'rxjs';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ILoginUser, IRegisterUser, IUserPayload } from '@app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlAPI: string;

  public constructor(private http: HttpClient, private userService: UserService, private router: Router) {
    this.urlAPI = environment.urlAPI + 'auth';
  }

  public login(credenciales?: ILoginUser): Observable<string> {
    return this.http
      .post<string>(`${this.urlAPI}/login`, credenciales)
      .pipe(
        tap((data) => {

          const helper = new JwtHelperService;
          const payload = helper.decodeToken(data) as IUserPayload

          this.userService.updateUser({
            id: payload.id,
            email: payload.email,
            token: payload.token,
            rol: payload.rol,
            nombre:payload.nombre,
            apellidos:payload.apellidos,
            avatarUrl:payload.avatarUrl,
          });
        })
      );
  }

  public logout({ email }: { email: string }) {
    return this.http.post(`${this.urlAPI}/logout`, { email }).pipe(
      tap(() => {
        this.userService.clearUser();
      })
    );
  }

  public register(registro: IRegisterUser): Observable<IRegisterUser> {
    const formData = new FormData();

    formData.append('nombre', registro.nombre);
    formData.append('apellidos', registro.apellidos);
    formData.append('email', registro.email);
    formData.append('password', registro.password);

    if (registro.telefono) {
      formData.append('telefono', registro.telefono.toString());
    }

    if (registro.avatar && registro.avatar instanceof File) {
      formData.append('avatar', registro.avatar, registro.avatar.name);
    }

    return this.http.post<IRegisterUser>(`${this.urlAPI}/register`, formData);
  }

  public refreshToken(): Observable<IUserPayload> {
    const currentUser = this.userService.userValue;
    //const token = currentUser.refreshToken;  ARREGLAR ESTO
    const token = currentUser.token; 
  
    return this.http
      .post<IUserPayload>(`${this.urlAPI}/auth/refreshtoken`, { token })
      .pipe(
        tap((user) => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.userService.updateUser(user);
          }
        })
      );
  }
  
  public clearStorage() {
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }
}
