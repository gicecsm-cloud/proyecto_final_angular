import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  /*
   * Objetivo del componente:
   * Mostrar las secciones principales de la SPA.
   *
   * Que debe completar el estudiante:
   * Si agrega una pagina nueva en app.routes.ts, tambien debe agregarla aqui.
   *
   * Pista:
   * routerLinkActive aplica una clase CSS cuando la ruta esta activa.
   */
  readonly navItems: NavItem[] = [
    { label: 'Inicio', path: '/', icon: 'IN' },
    { label: 'Interpolacion', path: '/interpolacion', icon: 'IT' },
    { label: 'Componentes', path: '/componentes', icon: 'CP' },
    { label: 'Control Flow', path: '/control-flow', icon: 'CF' },
    { label: 'Servicios HTTP', path: '/servicios-http', icon: 'API' },
    { label: 'Rutas', path: '/rutas', icon: 'RT' },
    { label: 'Formularios', path: '/formularios', icon: 'FG' },
    { label: 'Local Storage', path: '/local-storage', icon: 'LS' },
  ];
}
