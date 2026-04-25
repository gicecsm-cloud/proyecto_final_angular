import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout.component';

export const routes: Routes = [
  /*
   * Objetivo del archivo:
   * Declarar la navegacion principal de la SPA usando rutas standalone.
   *
   * Que debe completar el estudiante:
   * 1. Revisar como cada pagina se carga con lazy loading.
   * 2. Agregar una ruta nueva dentro del layout cuando el docente lo pida.
   *
   * Pista:
   * loadComponent retrasa la descarga del codigo de una pagina hasta que se visita.
   */
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        title: 'Inicio',
        loadComponent: () =>
          import('./features/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'interpolacion',
        title: 'Interpolacion',
        loadComponent: () =>
          import('./features/interpolation/interpolation.page').then(
            (m) => m.InterpolationPage,
          ),
      },
      {
        path: 'componentes',
        title: 'Componentes',
        loadComponent: () =>
          import('./features/components-demo/components-demo.page').then(
            (m) => m.ComponentsDemoPage,
          ),
      },
      {
        path: 'control-flow',
        title: 'Control Flow',
        loadComponent: () =>
          import('./features/control-flow/control-flow.page').then(
            (m) => m.ControlFlowPage,
          ),
      },
      {
        path: 'servicios-http',
        title: 'Servicios HTTP',
        loadComponent: () =>
          import('./features/http-services/http-services.page').then(
            (m) => m.HttpServicesPage,
          ),
      },
      {
        path: 'rutas',
        title: 'Rutas',
        loadChildren: () =>
          import('./features/routes-demo/routes-demo.routes').then(
            (m) => m.routesDemoRoutes,
          ),
      },
      {
        path: 'formularios',
        title: 'Formularios',
        loadComponent: () =>
          import('./features/forms/forms.page').then((m) => m.FormsPage),
      },
      {
        path: 'local-storage',
        title: 'Local Storage',
        loadComponent: () =>
          import('./features/local-storage/local-storage.page').then(
            (m) => m.LocalStoragePage,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
