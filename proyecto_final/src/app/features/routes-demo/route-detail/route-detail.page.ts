import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-route-detail-page',
  imports: [RouterLink],
  templateUrl: './route-detail.page.html',
})
export class RouteDetailPage {
  /*
   * Objetivo del ejercicio:
   * Leer parametros de ruta.
   *
   * Que debe completar el estudiante:
   * Actividad 1:
   * - Convertir routeId a numero y validar que sea un entero positivo.
   *
   * Actividad 2:
   * - Crear en AcademicApiService un metodo getTaskById(id).
   *
   * Actividad 3:
   * - Usar ese metodo para consultar un detalle real al backend.
   *
   * Pista:
   * ActivatedRoute permite acceder a snapshot.paramMap o params como Observable.
   *
   * Criterio de aceptacion:
   * - Si id no es valido, la pantalla debe mostrar un mensaje.
   * - Si el backend responde 404, se debe mostrar "No encontrado".
   */
  private readonly route = inject(ActivatedRoute);

  readonly routeId = computed(() => this.route.snapshot.paramMap.get('id') ?? 'sin-id');
}
