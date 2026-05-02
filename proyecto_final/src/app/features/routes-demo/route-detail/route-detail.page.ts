import { Component, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AcademicApiService } from '../../../services/academic-api.service';
import { TaskView } from '../../../models/task.model';

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
  //readonly routeId = computed(() => this.route.snapshot.paramMap.get('id') ?? 'sin-id');
  private readonly route = inject(ActivatedRoute);
  private readonly academicApi = inject(AcademicApiService);

  readonly task = signal<TaskView | null>(null);
  readonly error = signal<string | null>(null);
  
  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!idParam || isNaN(id) || id <= 0) {
      this.error.set('El id no es válido');
      return;
    }

    this.academicApi.getTaskById(id).subscribe({
      next: (task) => this.task.set(task),
      error: () => this.error.set('Tarea no encontrada'),
    });
  }


}
