import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  /*
   * Objetivo del componente:
   * Agrupar navbar + contenido. Todas las paginas hijas se renderizan en el router-outlet.
   *
   * Que debe completar el estudiante:
   * Puede agregar footer, sidebar o mensajes globales si el proyecto lo requiere.
   */
}
