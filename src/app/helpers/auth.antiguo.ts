// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, map, tap } from 'rxjs';
// import { environment } from 'src/environments/environment.development';
// import {
//   Email,
//   ILogin,
//   ILoginResponse,
//   IRegister,
//   IUser,
// } from '../interfaces/login.interface';
// import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { StorageHelper } from '@app/helpers/storage';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private currentUserSubject: BehaviorSubject<IUser>;
//   private user: Observable<IUser>;
//   private urlAPI: string;

//   public get userValue(): IUser {
//     return this.currentUserSubject.value;
//   }

//   public constructor(private http: HttpClient, private router: Router) {
//     const storedUser = sessionStorage.getItem(environment.storage.user) ?? '{}';

//     this.urlAPI = environment.urlAPI;
//     this.currentUserSubject = new BehaviorSubject<IUser>(
//       JSON.parse(storedUser)
//     );
//     this.user = this.currentUserSubject.asObservable();
//   }

//   public getUser() {
//     return this.user;
//   }

//   public getAvatar(): any {
//     const token = this.getToken() ?? '';
//     const helper = new JwtHelperService();
//     const tokenDecoded = helper.decodeToken(token);

//     return token === '' ? token : tokenDecoded['thumbprint']!;
//   }

//   public login(credenciales?: ILogin): Observable<ILoginResponse> {
//     return this.http
//       .post<ILoginResponse>(`${this.urlAPI}auth/login`, credenciales)
//       .pipe(
//         tap({
//           next: (data) => {
//             this.currentUserSubject.next({
//               email: data.email,
//               token: data.token,
//               roles_IdRol: 0,
//             });
//           },
//           error: (error) => console.error(error),
//         })
//       );
//   }

//   public logout({ email }: { email: Email }) {
//     return this.http.post(`${this.urlAPI}/auth/logout`, { email }).pipe(
//       tap(() => {
//         this.clearStorage();
//       })
//     );
//   }

//   /**
//    * Envia el registro a la API
//    * @param registro
//    * @returns
//    */
//   public register(registro: IRegister): Observable<IRegister> {
//     const formData = new FormData();

//     formData.append('nombre', registro.nombre);
//     formData.append('apellidos', registro.apellidos);
//     formData.append('email', registro.email);
//     formData.append('password', registro.password);

//     if (registro.telefono) {
//       formData.append('telefono', registro.telefono.toString());
//     }

//     return new Observable((observer) => {
//       if (registro.avatar && registro.avatar instanceof File) {
//         const reader = new FileReader();

//         reader.onloadend = () => {
//           const arrayBuffer = reader.result;
//           if (arrayBuffer instanceof ArrayBuffer) {
//             const blob = new Blob([arrayBuffer], {
//               type: registro.avatar?.type,
//             });
//             formData.append('avatar', blob, registro.avatar?.name);
//           }
//           this.http
//             .post<IRegister>(`${this.urlAPI}auth/register`, formData)
//             .subscribe({
//               next: (data) => {
//                 observer.next(data);
//                 observer.complete();
//               },
//               error: (error) => observer.error(error),
//             });
//         };
//         reader.readAsArrayBuffer(registro.avatar);
//       } else {
//         this.http
//           .post<IRegister>(`${this.urlAPI}auth/register`, formData)
//           .subscribe({
//             next: (data) => {
//               observer.next(data);
//               observer.complete();
//             },
//             error: (error) => observer.error(error),
//           });
//       }
//     });
//   }

//   public refreshToken(): Observable<IUser> {
//     const currentUser = <IUser>(
//       JSON.parse(sessionStorage.getItem(environment.storage.user)!)
//     );
//     const token = currentUser.refreshToken;

//     return this.http
//       .post<IUser>(`${this.urlAPI}/auth/refreshtoken`, { token })
//       .pipe(
//         map((user) => {
//           // login successful if there's a jwt token in the response
//           if (user && user.token) {
//             // store user details and jwt token in local storage to keep user logged in between page refreshes
//             sessionStorage.setItem(
//               environment.storage.user,
//               JSON.stringify(user)
//             );
//             this.currentUserSubject.next(user);
//           }

//           return user;
//         })
//       );
//   }

//   /**
//    * remove user from session storage to log user out
//    */
//   public clearStorage() {
//     StorageHelper.removeItem(environment.storage.user, true);
//     sessionStorage.removeItem(environment.storage.user);

//     this.router.navigate(['/login']);
//     this.currentUserSubject.next(null!);
//   }

//   private getToken(): string | null {
//     const userValue = this.currentUserSubject.value;
//     return userValue && userValue.token ? userValue.token : null;
//   }
// }
