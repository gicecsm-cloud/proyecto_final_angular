import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-route-list-page',
  imports: [RouterLink],
  templateUrl: './route-list.page.html',
})
export class RouteListPage {
  /*
   * Objetivo del ejercicio:
   * Navegar hacia una ruta con parametro.
   *
   * Que debe completar el estudiante:
   * Reemplazar esta lista estatica por datos del backend.
   */
  readonly lessons = [
    { id: 1, title: 'Leer parametro id' },
    { id: 2, title: 'Crear ruta hija' },
    { id: 3, title: 'Lazy load con loadComponent' },
  ];
}
