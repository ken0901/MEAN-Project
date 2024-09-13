import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AuthGuard } from './auth/auth.guard';
import { ErrorInterceptor } from './error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    AuthGuard
  ]
};
