import { Component } from '@angular/core';
import { StudentView } from '../../models/student.model';
import { StudentCardComponent } from '../../shared/components/student-card/student-card.component';

@Component({
  selector: 'app-components-demo-page',
  imports: [StudentCardComponent],
  templateUrl: './components-demo.page.html',
})
export class ComponentsDemoPage {
  /*
   * Objetivo del ejercicio:
   * Practicar componente padre + componente hijo.
   *
   * Que debe completar el estudiante:
   * Actividad 1, nivel basico:
   * - Agregar un segundo output en StudentCardComponent llamado removeRequested.
   *
   * Actividad 2, nivel intermedio:
   * - Agregar un metodo para eliminar un estudiante de la lista.
   *
   * Actividad 3, nivel reto:
   * - Evitar eliminar si el estudiante esta activo y mostrar un mensaje.
   *
   * Criterio de aceptacion:
   * - El hijo no debe modificar la lista.
   * - El hijo solo debe emitir eventos.
   * - El padre debe decidir que hacer con la lista.
   */
  //readonly 
  students: StudentView[] = [
    {
      id: 1,
      fullName: 'Matias Jimenez',
      email: 'matias.jimenez@example.com',
      active: true,
      activeLabel: 'Activo',
    },
    {
      id: 2,
      fullName: 'Luis Vega',
      email: 'luis.vega@example.com',
      active: true,
      activeLabel: 'Activo',
    },

    {
      id: 3,
      fullName: 'Santiago Lopez',
      email: 'santiago.lopez@example.com',
      active: false,
      activeLabel: 'Inactivo',
    },
  ];

  selectedStudent: StudentView | null = null;

  onStudentSelected(student: StudentView): void {
    this.selectedStudent = student;
  }


  onRemoveRequested(student: StudentView): void {
  if (student.active) {
    alert('No se puede eliminar un estudiante activo');
    return;
  }

  if (this.selectedStudent?.id === student.id) {
    this.selectedStudent = null;
  }
  this.students = this.students.filter(s => s.id !== student.id);
}
}
