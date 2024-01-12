import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { appConfig } from './config/app.config';

registerLocaleData(localeEs);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient(),
//     provideOAuthClient(),
//     importProvidersFrom(BrowserModule),
//     {
//       provide: LOCALE_ID,
//       useValue: 'es-ES',
//     },
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: JwtInterceptor,
//       multi: true,
//     },
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: ErrorInterceptor,
//       multi: true,
//     },
//     { provide: GOOGLE_OAUTH_CONFIG, useValue: googleOAuthConfig },
//     { provide: FACEBOOK_OAUTH_CONFIG, useValue: facebookOAuthConfig },
//   ],
// }).catch((err) => console.error(err));
