import { Component, signal,computed , inject} from '@angular/core';
import { TaskView } from '../../models/task.model';
import { LocalStorageService } from '../../core/storage/local-storage.service';

const TASK_FILTER_KEY = 'academic-task-filter';

type DemoState = 'loading' | 'empty' | 'error' | 'ready';

@Component({
  selector: 'app-control-flow-page',
  templateUrl: './control-flow.page.html',
})
export class ControlFlowPage {
  /*
   * Objetivo del ejercicio:
   * Practicar @if y @for sin usar *ngIf ni *ngFor.
   *
   * Que debe completar el estudiante:
   * Actividad 1, nivel basico:
   * - Cambiar el estado desde botones.
   *
   * Actividad 2, nivel intermedio:
   * - Agregar una signal para filtrar tareas por estado.
   *
   * Actividad 3, nivel reto:
   * - Mostrar un mensaje diferente cuando el filtro no tiene resultados.
   *
   * Criterio de aceptacion:
   * - Usar @if y @for, no *ngIf ni *ngFor.
   * - Usar track task.id.
   * - No mutar directamente el array de tasks.
   *
   * Pista:
   * En modo zoneless, signal ayuda a actualizar la vista de forma explicita.
   */
  readonly state = signal<DemoState>('ready');

  readonly tasks = signal<TaskView[]>([
    {
      id: 1,
      title: 'Configurar proyecto Angular',
      summary: 'Crear rutas principales.',
      status: 'done',
      statusLabel: 'Terminada',
      priorityLabel: 'Alta',
      studentLabel: 'Ana Mora',
      dueDateLabel: '02/05/2026',
    },
    {
      id: 2,
      title: 'Crear formulario reactivo',
      summary: 'Practicar FormGroup y FormArray.',
      status: 'pending',
      statusLabel: 'Pendiente',
      priorityLabel: 'Media',
      studentLabel: 'Sin estudiante asignado',
      dueDateLabel: 'Sin fecha',
    },
  ]);


//readonly statusFilter = signal<string>('all');

private readonly storage = inject(LocalStorageService);

readonly statusFilter = signal<string>(
  this.storage.getItem<{ status: string; priority: string }>(TASK_FILTER_KEY, null as any)?.status ?? 'all'
);

readonly filteredTasks = computed(() => {
  if (this.statusFilter() === 'all') return this.tasks();
  return this.tasks().filter(t => t.status === this.statusFilter());
});

setFilter(status: string): void {
  this.statusFilter.set(status);
}


  setState(state: DemoState): void {
    this.state.set(state);
  }
}
