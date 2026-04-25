import { Component, inject, signal } from '@angular/core';
import { LocalStorageService } from '../../core/storage/local-storage.service';

const STUDENT_NAME_KEY = 'academic-student-name';

@Component({
  selector: 'app-local-storage-page',
  templateUrl: './local-storage.page.html',
})
export class LocalStoragePage {
  /*
   * Objetivo del ejercicio:
   * Persistir informacion simple en localStorage.
   *
   * Que debe completar el estudiante:
   * Actividad 1, nivel basico:
   * - Guardar y recuperar el nombre del estudiante.
   *
   * Actividad 2, nivel intermedio:
   * - Implementar un metodo para guardar filtros de busqueda de tasks.
   *
   * Actividad 3, nivel reto:
   * - Usar esos filtros para inicializar una pantalla de listado.
   *
   * Pista:
   * localStorage guarda strings; por eso el servicio usa JSON.stringify.
   *
   * Criterio de aceptacion:
   * - Al recargar el navegador, el dato guardado debe seguir visible.
   * - Debe existir un boton para limpiar lo guardado.
   */
  private readonly storage = inject(LocalStorageService);

  readonly studentName = signal(this.storage.getItem<string>(STUDENT_NAME_KEY, ''));

  updateStudentName(value: string): void {
    this.studentName.set(value);
  }

  saveName(): void {
    this.storage.setItem(STUDENT_NAME_KEY, this.studentName());
  }

  clearName(): void {
    this.storage.removeItem(STUDENT_NAME_KEY);
    this.studentName.set('');
  }

  savePendingFilter(): void {
    /*
     * TODO estudiante:
     * Guardar un objeto como { status: 'pending', priority: 'high' }.
     * Luego recuperarlo al cargar la pagina.
     *
     * Pasos sugeridos:
     * 1. Crear una constante TASK_FILTER_KEY.
     * 2. Usar this.storage.setItem(TASK_FILTER_KEY, filtro).
     * 3. Crear una signal para mostrar el filtro recuperado.
     */
  }
}
