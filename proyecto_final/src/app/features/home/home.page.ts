import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home.page.html',
})
export class HomePage {
  /*
   * Objetivo del ejercicio:
   * Presentar el proyecto y explicar como navegar la SPA.
   *
   * Que debe completar el estudiante:
   * Puede agregar una tarjeta con su nombre, curso o paralelo.
   */
  readonly topics = [
    'Standalone components',
    'Zoneless change detection',
    'Rutas con lazy loading',
    'Servicios HTTP y Observables',
    'Formularios reactivos',
    'Local Storage',
  ];
}
