import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap, throwError } from 'rxjs';
import { API_BASE_URL } from '../core/constants/api.constants';
import {
  mapCategoryApiToView,
  mapProductApiToView,
  mapStudentApiToView,
  mapTaskApiToView,
} from '../mappers/academic.mappers';
import { ApiResponse } from '../models/api-response.model';
import { CategoryApi, CategoryView } from '../models/category.model';
import { ProductApi, ProductView } from '../models/product.model';
import { StudentApi, StudentView } from '../models/student.model';
import { CreateTaskPayload, TaskApi, TaskView } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class AcademicApiService {
  /*
   * Objetivo del servicio:
   * Consumir el backend REST con HttpClient y devolver Observables tipados.
   *
   * Conceptos que evalua:
   * - inject() en lugar de constructor.
   * - Observable<T>.
   * - pipe(), map() y tap().
   * - Remapeo API -> ViewModel usando mappers.
   *
   * Que debe completar el estudiante:
   * Actividad 1, nivel basico:
   * - Agregar tap() en getStudents() para observar la respuesta cruda.
   *
   * Actividad 2, nivel intermedio:
   * - Completar transformaciones marcadas como TODO en los mappers.
   *
   * Actividad 3, nivel intermedio:
   * - Implementar createTask() correctamente.
   *
   * Actividad 4, nivel reto:
   * - Crear createStudent() y getTaskById(id).
   *
   * Importante:
   * Este servicio esta intencionalmente incompleto en algunos puntos para que
   * el estudiante practique. No todo debe estar resuelto desde el inicio.
   *
   * Criterio de aceptacion:
   * - Ningun metodo debe devolver any.
   * - Todo endpoint debe usar ApiResponse<T>.
   * - Todo dato mostrado en HTML debe pasar por un ViewModel o mapper.
   */
  private readonly http = inject(HttpClient);

  getCategories(): Observable<CategoryView[]> {
    return this.http.get<ApiResponse<CategoryApi[]>>(`${API_BASE_URL}/categories`).pipe(
      tap((response) => console.log('Respuesta cruda categories:', response)),
      map((response) => response.data.map(mapCategoryApiToView)),
    );
  }

  getProducts(): Observable<ProductView[]> {
    return this.http.get<ApiResponse<ProductApi[]>>(`${API_BASE_URL}/products`).pipe(
      tap((response) => console.log('Respuesta cruda products:', response)),
      /*
       * TODO estudiante:
       * Revisa mapProductApiToView().
       * El metodo HTTP ya funciona, pero el mapper deja campos incompletos a proposito.
       */
      map((response) => response.data.map(mapProductApiToView)),
    );
  }

  getStudents(): Observable<StudentView[]> {
    return this.http.get<ApiResponse<StudentApi[]>>(`${API_BASE_URL}/students`).pipe(
      /*
       * TODO estudiante:
       * Agrega tap() aqui para inspeccionar la respuesta cruda, igual que en products.
       *
       * Criterio de aceptacion:
       * - Debe imprimirse en consola una sola vez por carga.
       * - No debe modificar response.data.
       *
       * Pista:
       * tap((response) => console.log('Respuesta cruda students:', response))
       */
      map((response) => response.data.map(mapStudentApiToView)),
    );
  }

  getTasks(): Observable<TaskView[]> {
    return this.http.get<ApiResponse<TaskApi[]>>(`${API_BASE_URL}/tasks`).pipe(
      tap((response) => console.log('Respuesta cruda tasks:', response)),
      /*
       * TODO estudiante:
       * El mapper de tasks deja dueDateLabel parcialmente resuelto.
       * Completa esa transformacion antes de usar la fecha en una pantalla real.
       */
      map((response) => response.data.map(mapTaskApiToView)),
    );
  }

  createTask(payload: CreateTaskPayload): Observable<TaskView> {
    /*
     * TODO estudiante:
     * Implementar este POST.
     *
     * Pasos esperados:
     * 1. Usar this.http.post<ApiResponse<TaskApi>>(`${API_BASE_URL}/tasks`, payload)
     * 2. Encadenar .pipe(...)
     * 3. Agregar tap((response) => console.log(response))
     * 4. Agregar map((response) => mapTaskApiToView(response.data))
     * 5. Conectar este metodo desde /formularios.
     *
     * Resultado esperado:
     * El formulario de /formularios podra crear una tarea real en el backend.
     *
     * Criterio de aceptacion:
     * - Si el backend responde 201, la pantalla debe mostrar la tarea creada
     *   o limpiar el formulario.
     * - Si el backend responde 400, el estudiante debe poder identificar
     *   que payload se envio mal mirando la consola o el mensaje visual.
     *
     * Nota:
     * Se usa void payload para que TypeScript no marque el parametro como no usado
     * mientras el metodo queda como ejercicio pendiente.
     */
    void payload;
    return throwError(() => new Error('TODO estudiante: implementar POST /api/tasks'));
  }

  /*
   * TODO estudiante:
   * Crear metodo createStudent().
   *
   * Nivel: reto.
   *
   * Pistas:
   * - Primero crea CreateStudentPayload en student.model.ts.
   * - Luego usa POST /api/students.
   * - Finalmente aplica mapStudentApiToView al response.data.
   *
   * Criterio de aceptacion:
   * - El metodo debe retornar Observable<StudentView>.
   * - El payload debe usar los nombres que espera el backend: first_name,
   *   last_name, email y active.
   */
}
