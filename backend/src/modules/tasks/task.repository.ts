import { query } from "../../db/pool";
import { CreateTaskDto, Task, TaskStatus } from "./task.types";

const taskSelect = `
  SELECT
    t.id,
    t.title,
    t.description,
    t.status,
    t.priority,
    t.student_id,
    CASE
      WHEN s.id IS NULL THEN NULL
      ELSE CONCAT(s.first_name, ' ', s.last_name)
    END AS student_name,
    t.due_date,
    t.created_at
  FROM tasks t
  LEFT JOIN students s ON s.id = t.student_id
`;

export async function findAllTasks(): Promise<Task[]> {
  const result = await query<Task>(`${taskSelect} ORDER BY t.id ASC`);
  return result.rows;
}

export async function findTaskById(id: number): Promise<Task | null> {
  const result = await query<Task>(`${taskSelect} WHERE t.id = $1`, [id]);
  return result.rows[0] ?? null;
}

export async function findTasksByStatus(status: TaskStatus): Promise<Task[]> {
  const result = await query<Task>(
    `${taskSelect} WHERE t.status = $1 ORDER BY t.id ASC`,
    [status]
  );
  return result.rows;
}

export async function findTasksByStudent(studentId: number): Promise<Task[]> {
  const result = await query<Task>(
    `${taskSelect} WHERE t.student_id = $1 ORDER BY t.id ASC`,
    [studentId]
  );
  return result.rows;
}

export async function createTask(dto: CreateTaskDto): Promise<Task> {
  const result = await query<{ id: number }>(
    `
      INSERT INTO tasks (title, description, status, priority, student_id, due_date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING
        id,
        id
    `,
    [
      dto.title,
      dto.description,
      dto.status,
      dto.priority,
      dto.student_id,
      dto.due_date
    ]
  );

  const task = await findTaskById(result.rows[0].id);

  if (!task) {
    throw new Error("No se pudo recuperar la tarea creada.");
  }

  return task;
}

export async function updateTaskStatus(id: number, status: TaskStatus): Promise<Task | null> {
  const result = await query<{ id: number }>(
    "UPDATE tasks SET status = $1 WHERE id = $2 RETURNING id",
    [status, id]
  );

  if (!result.rows[0]) {
    return null;
  }

  return findTaskById(id);
}
