import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import localeEs from '@angular/common/locales/es-MX'
import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideHttpClient(), {
    provide: LOCALE_ID,
    useValue: 'es-MX'
  }]
};

//SE AGREGA EL IDIOMA ESPAÑOL EN EL APP.CONFIG.TS
registerLocaleData(localeEs, 'es');
