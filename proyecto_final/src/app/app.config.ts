import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    /*
     * Objetivo del archivo:
     * Configurar servicios globales de la aplicacion standalone.
     *
     * Conceptos que evalua:
     * - provideRouter para rutas sin NgModules.
     * - provideHttpClient para consumir el backend REST.
     * - provideZonelessChangeDetection para modo zoneless.
     *
     * Que debe completar el estudiante:
     * Puede agregar providers globales aqui cuando una practica lo requiera.
     */
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
  ],
};
