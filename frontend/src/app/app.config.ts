import type { ApplicationConfig} from '@angular/core';
import {provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';

import { routes } from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptorFunction} from './shared/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      })
    ),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptorFunction])),
  ]
};
