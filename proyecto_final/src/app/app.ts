import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  /*
   * Objetivo del archivo:
   * Este componente raiz solo contiene el RouterOutlet principal.
   *
   * Que debe completar el estudiante:
   * Normalmente nada aqui. Las paginas reales viven en src/app/features.
   *
   * Pista:
   * En Angular moderno se recomienda mantener el componente raiz pequeno y delegar
   * la navegacion al router.
   */
}
