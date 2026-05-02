import { CategoryApi, CategoryView } from '../models/category.model';
import { ProductApi, ProductView } from '../models/product.model';
import { StudentApi, StudentView } from '../models/student.model';
import { TaskApi, TaskPriority, TaskStatus, TaskView } from '../models/task.model';

/*
 * Objetivo del archivo:
 * Convertir datos del backend a datos listos para la vista.
 *
 * Que debe completar el estudiante:
 * Actividad 1:
 * - Completar los TODO de ProductView.
 *
 * Actividad 2:
 * - Completar el formato de dueDateLabel en TaskView.
 *
 * Actividad 3:
 * - Agregar un mapper nuevo cuando cree un endpoint nuevo.
 *
 * Pista:
 * La API puede usar snake_case, pero la vista puede usar nombres mas comodos.
 *
 * Criterio tecnico:
 * - El mapper no debe hacer peticiones HTTP.
 * - El mapper no debe modificar el objeto recibido.
 * - El mapper debe devolver un objeto nuevo.
 */

export function mapCategoryApiToView(category: CategoryApi): CategoryView {
  return {
    id: category.id,
    name: category.name,
    description: category.description ?? 'Sin descripcion',
    /*
     * TODO estudiante:
     * Cambia este formato si quieres mostrar fecha con hora o con locale especifico.
     * Pista: prueba toLocaleDateString('es-EC') o Intl.DateTimeFormat.
     */
    createdAtLabel: new Date(category.created_at).toLocaleDateString(),
  };
}

export function mapProductApiToView(product: ProductApi): ProductView {
  return {
    id: product.id,
    name: product.name,
    priceLabel: `$${product.price.toFixed(2)}`,
    /*
     * TODO estudiante:
     * Completa esta transformacion.
     *
     * Requisito:
     * - Si product.stock es 0, mostrar "Sin stock".
     * - Si product.stock es mayor a 0, mostrar "<cantidad> unidades".
     * - Si product.stock es menor a 5, mostrar ademas una advertencia como
     *   "Quedan pocas unidades".
     *
     * Ahora se deja un texto temporal para que la pantalla compile.
     */
    stockLabel: product.stock === 0
      ? 'Sin stock'
  : product.stock < 5
    ? `Pocas unidades - ${product.stock}`
    : `${product.stock} unidades`,
    /*
     * TODO estudiante:
     * Reemplaza este texto por product.category_name.
     * Este TODO sirve para practicar remapeo snake_case -> camelCase.
     *
     * Criterio de aceptacion:
     * - En la pagina Servicios HTTP ya no debe aparecer "TODO: mapear categoria".
     */
    categoryName: product.category_name,
  };
}

export function mapStudentApiToView(student: StudentApi): StudentView {
  return {
    id: student.id,
    /*
     * TODO estudiante:
     * Prueba cambiar el orden a "Apellido, Nombre".
     * Tambien puedes normalizar espacios si el backend enviara valores con espacios extra.
     */
    fullName: `${student.first_name} ${student.last_name}`,
    email: student.email,
    active: student.active,
    activeLabel: student.active ? 'Activo' : 'Inactivo',
  };
}

export function mapTaskApiToView(task: TaskApi): TaskView {
  return {
    id: task.id,
    title: task.title,
    summary: task.description ?? 'Sin descripcion',
    status: task.status,
    statusLabel: mapTaskStatusToLabel(task.status),
    priorityLabel: mapTaskPriorityToLabel(task.priority),
    studentLabel: task.student_name ?? 'Sin estudiante asignado',
    /*
     * TODO estudiante:
     * Completa el formato de fecha.
     *
     * Requisito:
     * - Si task.due_date existe, mostrar una fecha legible.
     * - Si no existe, mostrar "Sin fecha".
     * - El formato recomendado para Ecuador es es-EC.
     *
     * Ahora se deja parcialmente resuelto para que la app compile.
     */
    dueDateLabel: task.due_date 
       ? new Date(task.due_date).toLocaleDateString('es-EC') 
       : 'Sin fecha',
  };
}

export function mapTaskStatusToLabel(status: TaskStatus): string {
  const labels: Record<TaskStatus, string> = {
    pending: 'Pendiente',
    in_progress: 'En progreso',
    done: 'Terminada',
  };

  return labels[status];
}

export function mapTaskPriorityToLabel(priority: TaskPriority): string {
  /*
   * TODO estudiante:
   * Mejora estos textos para que sean mas utiles en la UI.
   * Ejemplo: high -> "Alta - resolver primero".
   *
   * Criterio de aceptacion:
   * - low, medium y high deben tener textos distintos y utiles.
   * - No se debe cambiar el union type TaskPriority.
   */
  const labels: Record<TaskPriority, string> = {
    low: 'Baja - puede esperar',
    medium: 'Media - atender luego',
    high: 'Alta - resolver primero',
  };

  return labels[priority];
}
