export type TaskStatus = "pending" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  student_id: number | null;
  student_name: string | null;
  due_date: Date | null;
  created_at: Date;
}

export interface CreateTaskDto {
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  student_id: number | null;
  due_date: string | null;
}

export interface UpdateTaskStatusDto {
  status: TaskStatus;
}
