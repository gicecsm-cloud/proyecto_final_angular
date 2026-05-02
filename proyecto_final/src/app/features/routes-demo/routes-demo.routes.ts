import { Routes } from '@angular/router';
import { RoutesShellPage } from './routes-shell/routes-shell.page';

export const routesDemoRoutes: Routes = [
  /*
   * Objetivo del archivo:
   * Demostrar rutas hijas y ruta con parametro id.
   *
   * Que debe completar el estudiante:
   * Actividad 1, nivel basico:
   * - Identificar cual es la ruta padre y cuales son rutas hijas.
   *
   * Actividad 2, nivel intermedio:
   * - Agregar una ruta hija nueva, por ejemplo "crear".
   *
   * Actividad 3, nivel reto:
   * - Crear una ruta "tasks/:id" que lea un id real y consulte el backend.
   *
   * Criterio de aceptacion:
   * - La nueva ruta debe cargarse con loadComponent.
   * - No debe importarse el componente directamente arriba si sera lazy loaded.
   */
  {
    path: '',
    component: RoutesShellPage,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./route-list/route-list.page').then((m) => m.RouteListPage),
      },
      
      {
          path: 'crear',
          loadComponent: () =>
            import('./route-crear/route-crear.page').then((m) => m.RouteCrearPage),
      },


      {
        path: ':id',
        loadComponent: () =>
          import('./route-detail/route-detail.page').then((m) => m.RouteDetailPage),
      },
        

    ],
  },
];
