import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router) {}

  isLoggedIn() {
    const user = sessionStorage.getItem(environment.storage.user);

    if (user) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
