import { Type, inject } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { IBaseGuard } from './base.guard';

export const canActivate = (authGuard: AuthGuard = inject(AuthGuard)) =>
  authGuard.isLoggedIn();

export const canActivateClosure =
  <T extends IBaseGuard>(guard: Type<T>) =>
  () => {
    const injectedGuard: T = inject(guard);
    return injectedGuard.isValid();
  };
