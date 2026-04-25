import { Request, Response } from "express";
import { sendSuccess } from "../../utils/apiResponse";
import {
  optionalDateString,
  optionalPositiveInteger,
  optionalString,
  parseId,
  requireBodyObject,
  requireString
} from "../../utils/validators";
import {
  changeTaskStatus,
  createNewTask,
  getTaskById,
  getTasks,
  getTasksByStatus,
  getTasksByStudent,
  parseTaskPriority,
  parseTaskStatus
} from "./task.service";
import { CreateTaskDto } from "./task.types";

export async function listTasks(_req: Request, res: Response): Promise<void> {
  const tasks = await getTasks();
  sendSuccess(res, 200, "Tareas obtenidas correctamente.", tasks);
}

export async function findTask(req: Request, res: Response): Promise<void> {
  const id = parseId(req.params.id);
  const task = await getTaskById(id);
  sendSuccess(res, 200, "Tarea obtenida correctamente.", task);
}

export async function listTasksByStatus(req: Request, res: Response): Promise<void> {
  const status = parseTaskStatus(req.params.status);
  const tasks = await getTasksByStatus(status);
  sendSuccess(res, 200, "Tareas por estado obtenidas correctamente.", tasks);
}

export async function listTasksByStudent(req: Request, res: Response): Promise<void> {
  const studentId = parseId(req.params.studentId, "studentId");
  const tasks = await getTasksByStudent(studentId);
  sendSuccess(res, 200, "Tareas por estudiante obtenidas correctamente.", tasks);
}

export async function storeTask(req: Request, res: Response): Promise<void> {
  const body = requireBodyObject(req.body);
  const rawStatus = typeof body.status === "string" ? body.status : "pending";
  const rawPriority = typeof body.priority === "string" ? body.priority : "medium";

  const dto: CreateTaskDto = {
    title: requireString(body.title, "title"),
    description: optionalString(body.description),
    status: parseTaskStatus(rawStatus),
    priority: parseTaskPriority(rawPriority),
    student_id: optionalPositiveInteger(body.student_id, "student_id"),
    due_date: optionalDateString(body.due_date, "due_date")
  };

  const task = await createNewTask(dto);
  sendSuccess(res, 201, "Tarea creada correctamente.", task);
}

export async function patchTaskStatus(req: Request, res: Response): Promise<void> {
  const id = parseId(req.params.id);
  const body = requireBodyObject(req.body);
  const status = parseTaskStatus(requireString(body.status, "status"));

  const task = await changeTaskStatus(id, status);
  sendSuccess(res, 200, "Estado de tarea actualizado correctamente.", task);
}
