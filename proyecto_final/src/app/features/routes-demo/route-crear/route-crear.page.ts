import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-route-crear-page',
  imports: [RouterLink],
  template: `
    <article class="card">
      <h2>Crear nueva tarea</h2>
      <p>Aquí va formulario de creación.</p>
      <a routerLink="/rutas">Volver</a>
    </article>
  `,
})
export class RouteCrearPage {}