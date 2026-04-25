import { findStudentById } from "../students/student.repository";
import { AppError } from "../../utils/AppError";
import {
  createTask,
  findAllTasks,
  findTaskById,
  findTasksByStatus,
  findTasksByStudent,
  updateTaskStatus
} from "./task.repository";
import { CreateTaskDto, Task, TaskPriority, TaskStatus } from "./task.types";

const allowedStatuses: readonly TaskStatus[] = ["pending", "in_progress", "done"];
const allowedPriorities: readonly TaskPriority[] = ["low", "medium", "high"];

export function parseTaskStatus(value: string): TaskStatus {
  if (!allowedStatuses.includes(value as TaskStatus)) {
    throw new AppError("Estado invalido. Use pending, in_progress o done.", 400);
  }

  return value as TaskStatus;
}

export function parseTaskPriority(value: string): TaskPriority {
  if (!allowedPriorities.includes(value as TaskPriority)) {
    throw new AppError("Prioridad invalida. Use low, medium o high.", 400);
  }

  return value as TaskPriority;
}

export async function getTasks(): Promise<Task[]> {
  return findAllTasks();
}

export async function getTaskById(id: number): Promise<Task> {
  const task = await findTaskById(id);

  if (!task) {
    throw new AppError("Tarea no encontrada.", 404);
  }

  return task;
}

export async function getTasksByStatus(status: TaskStatus): Promise<Task[]> {
  return findTasksByStatus(status);
}

export async function getTasksByStudent(studentId: number): Promise<Task[]> {
  const student = await findStudentById(studentId);

  if (!student) {
    throw new AppError("Estudiante no encontrado.", 404);
  }

  return findTasksByStudent(studentId);
}

export async function createNewTask(dto: CreateTaskDto): Promise<Task> {
  if (dto.student_id !== null) {
    const student = await findStudentById(dto.student_id);

    if (!student) {
      throw new AppError("El estudiante indicado no existe.", 400);
    }
  }

  return createTask(dto);
}

export async function changeTaskStatus(id: number, status: TaskStatus): Promise<Task> {
  const updatedTask = await updateTaskStatus(id, status);

  if (!updatedTask) {
    throw new AppError("Tarea no encontrada.", 404);
  }

  return updatedTask;
}
