import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  ApplicationConfig,
  LOCALE_ID,
  importProvidersFrom,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ErrorInterceptor } from '@app/interceptors/error.interceptor';
import { routes } from '@app/routes';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { provideOAuthClient } from 'angular-oauth2-oidc';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideOAuthClient(),
    importProvidersFrom(BrowserModule),
    {
      provide: LOCALE_ID /** imported from @angular/core */,
      useValue: 'es-ES' /** default locale fixed to es-ES */,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    // { provide: GOOGLE_OAUTH_CONFIG, useValue: googleOAuthConfig },
    // { provide: FACEBOOK_OAUTH_CONFIG, useValue: facebookOAuthConfig },
    // {
    //   provide: OAuthService,
    //   deps: [GOOGLE_OAUTH_CONFIG],
    //   useClass: GoogleAuthStrategy,
    // },
    // {
    //   provide: OAuthService,
    //   deps: [FACEBOOK_OAUTH_CONFIG],
    //   useClass: FacebookAuthStrategy,
    // },
  ],
};

// Crear una función para crear el servicio OAuthService con la configuración correspondiente
// export function createOAuthService(config: AuthConfig) {
//   return () => {
//     const oAuthService = new OAuthService();
//     oAuthService.configure(config);
//     oAuthService.loadDiscoveryDocumentAndTryLogin();
//     return oAuthService;
//   };
// }

/*
// Importar el módulo OAuthModule y proveer las dos instancias del servicio OAuthService
@NgModule({
  imports: [
    // ...
    OAuthModule.forRoot()
  ],
  providers: [
    // ...
    { provide: GOOGLE_OAUTH_CONFIG, useValue: googleOAuthConfig },
    { provide: FACEBOOK_OAUTH_CONFIG, useValue: facebookOAuthConfig },
    { provide: OAuthService, deps: [GOOGLE_OAUTH_CONFIG], useFactory: createOAuthService },
    { provide: OAuthService, deps: [FACEBOOK_OAUTH_CONFIG], useFactory: createOAuthService }
  ]
})
export class AppModule {}

// Inyectar el servicio OAuthService con el token adecuado en el componente o servicio que quieras usar
@Component({
  selector: 'app-login',
  template: `
    <button (click)="loginWithGoogle()">Login with Google</button>
    <button (click)="loginWithFacebook()">Login with Facebook</button>
  `
})
export class LoginComponent {
  constructor(
    @Inject(GOOGLE_OAUTH_CONFIG) private googleOAuthService: OAuthService,
    @Inject(FACEBOOK_OAUTH_CONFIG) private facebookOAuthService: OAuthService
  ) {}

  loginWithGoogle() {
    this.googleOAuthService.initImplicitFlow();
  }

  loginWithFacebook() {
    this.facebookOAuthService.initImplicitFlow();
  }
}
*/
