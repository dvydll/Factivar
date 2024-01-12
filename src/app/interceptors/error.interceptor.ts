import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { filter, catchError, take, switchMap, finalize } from 'rxjs/operators';
import { AuthService } from '@services/auth/auth.service';
import { IUserPayload } from '@app/interfaces/user';

@Injectable({ 
  providedIn: 'root' 
})
export class ErrorInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null!);

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        // console.log((<HttpErrorResponse>err).status);
        if (err instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>err).status) {
            case 401:
              return this.handle401Error(request, next, err);
            default:
              //return throwError(err); // dejarlo así
              return throwError(() => err); // dejarlo así
          }
        } else {
          return throwError(() => new Error(err));
        }
      })
    );
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler, err: any): Observable<HttpEvent<any>> {
    if (this.isTokenError(request, err)) {
      return this.handleTokenError(request, next, err);
    }
  
    if (err.headers.has('Token-Expired')) {
      return this.handleExpiredToken(request, next);
    }
  
    this.authService.clearStorage();
    location.reload();
  
    return throwError(() => new Error(err));
  }
  
  private isTokenError(request: HttpRequest<any>, err: any): boolean {
    return request.url.includes('refreshtoken') || request.url.includes('login');
  }
  
  private handleTokenError(request: HttpRequest<any>, next: HttpHandler, err: any): Observable<HttpEvent<any>> {
    if (request.url.includes('refreshtoken')) {
      this.authService.clearStorage();
      location.reload();
    }
  
    const errorData: any = {
      error: err.error,
      err: err
    };
  
    return throwError(() => errorData);
  }
  
  private handleExpiredToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null!);
  
      return this.authService.refreshToken().pipe(
        switchMap((user: IUserPayload) => {
          return next.handle(this.addTokenToRequest(request, user.token!));
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      );
    } else {
      return this.waitForTokenRefresh(request, next);
    }
  }
  
  private waitForTokenRefresh(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.tokenSubject.pipe(
      filter((token) => token != null),
      take(1),
      switchMap((token: string) => {
        return next.handle(this.addTokenToRequest(request, token));
      })
    );
  }
}
