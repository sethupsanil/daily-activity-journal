import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initFirebaseAuthFactory } from './app.initializer';
import { routes } from './app.routes';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthService } from './services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    FormsModule,
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: initFirebaseAuthFactory,
      multi: true,
      deps: [AuthService],
    },
  ],
};
