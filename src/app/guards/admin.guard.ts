// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   UrlTree,
//   Router,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { IUserPayload } from '@interfaces/user';
// import { environment } from '@environments/environment.development';
// import { UserService } from '@app/services/user.service';
// import { StorageHelper } from '@app/helpers/storage';
// import { IBaseGuard } from './base.guard';

// @Injectable({
//   providedIn: 'root',
// })
// export class AdminGuard implements IBaseGuard {
//   constructor(private router: Router, private userService: UserService) {}

//   public isValid():
//     | boolean
//     | UrlTree
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree> {
//     return this.canActivate();
//   }

//   private canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     const user = this.userService.userValue;

//     if (user.email && this.isAdmin()) {
//       return true;
//     }

//     this.router.navigate(['/login']);
//     return false;
//   }

//   private isAdmin(): boolean {
//     const currentUser = StorageHelper.getItem(
//       environment.storage.user
//     ) as IUserPayload | null;
//     // const currentUser = <IUser>JSON.parse(sessionStorage.getItem(environment.storage.user)!);
//     const jwtHelper = new JwtHelperService();

//     if (currentUser) {
//       const tokenBruto = jwtHelper.decodeToken(currentUser['token']!);
//       const rol = tokenBruto['role'];

//       return rol === 'Admin';
//     }
//     return false;
//   }
// }
