import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskDraftStorageService } from '../../services/task-draft-storage.service';
import { CreateTaskPayload } from '../../models/task.model';
import { AcademicApiService } from '../../services/academic-api.service';

interface TaskForm {
  title: FormControl<string>;
  description: FormControl<string>;
  priority: FormControl<'low' | 'medium' | 'high'>;
  subtasks: FormArray<FormControl<string>>;
  student_id: FormControl<number | null>;
  due_date: FormControl<string | null>;
}

@Component({
  selector: 'app-forms-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './forms.page.html',
})
export class FormsPage {
  /*
   * Objetivo del ejercicio:
   * Practicar formularios reactivos con FormGroup, FormControl y FormArray.
   *
   * Que debe completar el estudiante:
   * Actividad 1, nivel basico:
   * - Agregar Validators.minLength(3) al titulo.
   *
   * Actividad 2, nivel intermedio:
   * - Construir un CreateTaskPayload usando los valores del formulario.
   *
   * Actividad 3, nivel intermedio:
   * - Enviar el formulario al backend usando AcademicApiService.createTask().
   *
   * Actividad 4, nivel reto:
   * - Guardar mas campos como borrador en localStorage y restaurarlos al recargar.
   *
   * Criterio de aceptacion:
   * - Si el formulario es invalido, no debe hacer POST.
   * - Si el POST funciona, debe limpiar el formulario o mostrar la tarea creada.
   * - El payload debe respetar los nombres del backend: student_id y due_date.
   */
  private readonly draftStorage = inject(TaskDraftStorageService);
  private readonly academicApi = inject(AcademicApiService);
  private readonly draft = this.draftStorage.loadDraft();

  readonly taskForm = new FormGroup<TaskForm>({
    title: new FormControl(this.draft.title, {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),



    description: new FormControl(this.draft.description, {
      nonNullable: true,
    }),



    priority: new FormControl('medium', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    subtasks: new FormArray<FormControl<string>>([
      new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    ]),

    student_id: new FormControl <number | null>(null, [Validators.required]),
    due_date: new FormControl <string | null>(null,[Validators.required]),

  });

  get subtasks(): FormArray<FormControl<string>> {
    return this.taskForm.controls.subtasks;
  }

  addSubtask(): void {
    this.subtasks.push(
      new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    );
  }

  removeSubtask(index: number): void {
    this.subtasks.removeAt(index);
  }

  saveDraft(): void {
    this.draftStorage.saveDraft({
      title: this.taskForm.controls.title.value,
      description: this.taskForm.controls.description.value,
    });
  }

  submit(): void {
    this.taskForm.markAllAsTouched();

    if (this.taskForm.invalid) {
      return;
    }

    /*
     * TODO estudiante:
     * Aqui debe construir CreateTaskPayload y llamar AcademicApiService.createTask().
     * Por ahora solo se muestra el valor en consola para no resolver todo el ejercicio.
     *
     * Pasos sugeridos:
     * 1. Leer const value = this.taskForm.getRawValue().
     * 2. Crear un objeto CreateTaskPayload.
     * 3. Pasar description como null si esta vacia.
     * 4. Llamar al servicio.
     * 5. Manejar next y error en subscribe.
     */
    console.log('Formulario valido:', this.taskForm.getRawValue());


  const value = this.taskForm.getRawValue();
   const payload: CreateTaskPayload = {
    title: value.title,
    description: value.description || null,
    priority: value.priority,
    status: 'pending',
    student_id: value.student_id ?? null,
    due_date: value.due_date ?? null,
  };

  this.academicApi.createTask(payload).subscribe({
    next: (task) => {
      console.log('Tarea creada:', task);
      this.taskForm.reset({ priority: 'medium' });
      alert(`Tarea "${task.title}" creada correctamente!`);
    },
    error: (err) => {
      console.error('Error al crear tarea:', err);
      alert('Error al crear la tarea');
    },
  });

  }
}
