import { Injectable } from '@angular/core';
import { StorageHelper } from '@app/helpers/storage';
import { IUserPayload } from '@app/interfaces/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject: BehaviorSubject<IUserPayload>;
  private user: Observable<IUserPayload>;

  public get userValue(): IUserPayload {
    return this.currentUserSubject.value;
  }

  public get storageUser() {
    return environment.storage.user;
  }

  public constructor() {
    const storedUser = StorageHelper.getItem<IUserPayload>(this.storageUser, true);

    this.currentUserSubject = new BehaviorSubject<IUserPayload>(storedUser!);
    this.user = this.currentUserSubject.asObservable();
  }

  public getUser() {
    return this.user;
  }

  public getAvatar(): any {
    const token = this.getToken() ?? '';
    const helper = new JwtHelperService();
    const tokenDecoded = helper.decodeToken(token);

    return token === '' ? token : tokenDecoded['thumbprint']!;
  }

  public updateUser(user: IUserPayload) {
    StorageHelper.setItem(this.storageUser, user, true);
    sessionStorage.setItem(this.storageUser, JSON.stringify(user))

    this.currentUserSubject.next(user);
  }

  public clearUser() {
    StorageHelper.removeItem(this.storageUser, true);

    this.currentUserSubject.next(null!);
  }

  private getToken(): string | null {
    return this.userValue && this.userValue.token ? this.userValue.token : null;
  }
}
