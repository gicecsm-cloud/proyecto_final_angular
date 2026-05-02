import { AsyncPipe, JsonPipe} from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AcademicApiService } from '../../services/academic-api.service';
import { CategoryView } from '../../models/category.model';
import { ProductView } from '../../models/product.model';
import { TaskView } from '../../models/task.model';
import { StudentView } from '../../models/student.model';
import { CreateStudentPayload } from '../../models/student.model';

@Component({
  selector: 'app-http-services-page',
  imports: [AsyncPipe, JsonPipe, ReactiveFormsModule],
  templateUrl: './http-services.page.html',
})
export class HttpServicesPage {
  /*
   * Objetivo del ejercicio:
   * Consumir el backend real con HttpClient y Observables.
   *
   * Que debe completar el estudiante:
   * Actividad 1, nivel basico:
   * - Identificar que variables terminan con $ porque son Observables.
   *
   * Actividad 2, nivel intermedio:
   * - Agregar manejo visual de error con catchError.
   *
   * Actividad 3, nivel intermedio:
   * - Completar los mappers para que no se muestren textos "TODO".
   *
   * Actividad 4, nivel reto:
   * - Crear un boton que haga POST de una tarea.
   *
   * Criterio de aceptacion:
   * - No suscribirse manualmente si async pipe es suficiente.
   * - Usar subscribe solo para acciones imperativas como POST.
   * - Mostrar al usuario si el backend no esta disponible.
   */
  private readonly academicApi = inject(AcademicApiService);

  readonly categories$: Observable<CategoryView[]> = this.academicApi.getCategories();
  readonly products$: Observable<ProductView[]> = this.academicApi.getProducts();
  readonly tasks$: Observable<TaskView[]> = this.academicApi.getTasks();

  readonly exampleJson = {
    endpoint: '/api/tasks',
    method: 'GET',
    topic: 'json',
  };

  readonly studentForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    active: new FormControl(true, { nonNullable: true }),
  });

  createdStudent: StudentView | null = null;

  createStudent(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

   const payload: CreateStudentPayload = {
    first_name: this.studentForm.value.first_name!,
    last_name: this.studentForm.value.last_name!,
    email: this.studentForm.value.email!,
    active: this.studentForm.value.active!,
   };
   this.academicApi.createStudent(payload).subscribe({
     next: (student) => {
       this.createdStudent = student;
       this.studentForm.reset({ active: true });
       alert(`Estudiante "${student.fullName}" creado correctamente!`);
     },
     error: (err) => {
       console.error('Error:', err);
       alert('Errorr al crear el estudiante');
     },
   });
 }
}