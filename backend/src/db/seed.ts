import { query } from "./pool";
import { logger } from "../utils/logger";

interface IdRow {
  id: number;
}

interface CategorySeed {
  name: string;
  description: string;
}

interface ProductSeed {
  name: string;
  price: number;
  stock: number;
  categoryName: string;
}

interface StudentSeed {
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
}

interface TaskSeed {
  title: string;
  description: string;
  status: "pending" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  studentEmail: string | null;
  dueDate: string | null;
}

const categories: CategorySeed[] = [
  {
    name: "Tecnologia",
    description: "Equipos y accesorios usados en laboratorios academicos."
  },
  {
    name: "Libros",
    description: "Material bibliografico para distintas asignaturas."
  },
  {
    name: "Papeleria",
    description: "Insumos de oficina y aula."
  },
  {
    name: "Cursos",
    description: "Servicios academicos y capacitaciones."
  }
];

const products: ProductSeed[] = [
  { name: "Laptop educativa", price: 750, stock: 12, categoryName: "Tecnologia" },
  { name: "Mouse inalambrico", price: 18.5, stock: 45, categoryName: "Tecnologia" },
  { name: "Libro de TypeScript", price: 39.99, stock: 20, categoryName: "Libros" },
  { name: "Libro de Bases de Datos", price: 45.5, stock: 16, categoryName: "Libros" },
  { name: "Cuaderno universitario", price: 3.25, stock: 120, categoryName: "Papeleria" },
  { name: "Marcadores de pizarra", price: 6.75, stock: 60, categoryName: "Papeleria" },
  { name: "Curso Angular 19", price: 120, stock: 30, categoryName: "Cursos" },
  { name: "Curso PostgreSQL practico", price: 95, stock: 25, categoryName: "Cursos" }
];

const students: StudentSeed[] = [
  { firstName: "Ana", lastName: "Mora", email: "ana.mora@example.com", active: true },
  { firstName: "Luis", lastName: "Vega", email: "luis.vega@example.com", active: true },
  { firstName: "Carla", lastName: "Rivas", email: "carla.rivas@example.com", active: true },
  { firstName: "Diego", lastName: "Salazar", email: "diego.salazar@example.com", active: false },
  { firstName: "Maria", lastName: "Torres", email: "maria.torres@example.com", active: true },
  { firstName: "Jorge", lastName: "Paredes", email: "jorge.paredes@example.com", active: true }
];

const tasks: TaskSeed[] = [
  {
    title: "Configurar proyecto Angular",
    description: "Crear rutas principales y estructura inicial.",
    status: "done",
    priority: "high",
    studentEmail: "ana.mora@example.com",
    dueDate: "2026-05-02"
  },
  {
    title: "Disenar formulario de estudiantes",
    description: "Practicar formularios reactivos y validaciones.",
    status: "in_progress",
    priority: "medium",
    studentEmail: "luis.vega@example.com",
    dueDate: "2026-05-05"
  },
  {
    title: "Crear listado de productos",
    description: "Consumir GET /api/products y mostrar categoria.",
    status: "pending",
    priority: "medium",
    studentEmail: "carla.rivas@example.com",
    dueDate: "2026-05-08"
  },
  {
    title: "Implementar filtro por estado",
    description: "Usar rutas con parametros para filtrar tareas.",
    status: "pending",
    priority: "high",
    studentEmail: "maria.torres@example.com",
    dueDate: "2026-05-10"
  },
  {
    title: "Probar endpoint de salud",
    description: "Validar conexion del backend desde Angular.",
    status: "done",
    priority: "low",
    studentEmail: null,
    dueDate: null
  },
  {
    title: "Construir servicio Angular de categorias",
    description: "Crear un servicio con HttpClient.",
    status: "in_progress",
    priority: "medium",
    studentEmail: "jorge.paredes@example.com",
    dueDate: "2026-05-12"
  },
  {
    title: "Agregar vista detalle de estudiante",
    description: "Consultar GET /api/students/:id.",
    status: "pending",
    priority: "low",
    studentEmail: "ana.mora@example.com",
    dueDate: "2026-05-15"
  },
  {
    title: "Cambiar estado de una tarea",
    description: "Consumir PATCH /api/tasks/:id/status.",
    status: "pending",
    priority: "high",
    studentEmail: "luis.vega@example.com",
    dueDate: "2026-05-16"
  },
  {
    title: "Crear producto desde formulario",
    description: "Enviar datos a POST /api/products.",
    status: "in_progress",
    priority: "medium",
    studentEmail: "carla.rivas@example.com",
    dueDate: "2026-05-18"
  },
  {
    title: "Preparar exposicion final",
    description: "Documentar endpoints consumidos por el frontend.",
    status: "pending",
    priority: "high",
    studentEmail: null,
    dueDate: "2026-05-20"
  }
];

async function findCategoryIdByName(name: string): Promise<number> {
  const result = await query<IdRow>("SELECT id FROM categories WHERE name = $1", [name]);
  const category = result.rows[0];

  if (!category) {
    throw new Error(`No existe la categoria requerida para seed: ${name}`);
  }

  return category.id;
}

async function findStudentIdByEmail(email: string): Promise<number> {
  const result = await query<IdRow>("SELECT id FROM students WHERE email = $1", [email]);
  const student = result.rows[0];

  if (!student) {
    throw new Error(`No existe el estudiante requerido para seed: ${email}`);
  }

  return student.id;
}

export async function seedDatabase(): Promise<void> {
  logger.info("Verificando datos de ejemplo...");

  for (const category of categories) {
    await query(
      `
        INSERT INTO categories (name, description)
        VALUES ($1, $2)
        ON CONFLICT (name) DO NOTHING
      `,
      [category.name, category.description]
    );
  }
  logger.info("Seed de categories verificado.");

  for (const product of products) {
    const categoryId = await findCategoryIdByName(product.categoryName);
    await query(
      `
        INSERT INTO products (name, price, stock, category_id)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (name, category_id) DO NOTHING
      `,
      [product.name, product.price, product.stock, categoryId]
    );
  }
  logger.info("Seed de products verificado.");

  for (const student of students) {
    await query(
      `
        INSERT INTO students (first_name, last_name, email, active)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
      `,
      [student.firstName, student.lastName, student.email, student.active]
    );
  }
  logger.info("Seed de students verificado.");

  for (const task of tasks) {
    const studentId = task.studentEmail
      ? await findStudentIdByEmail(task.studentEmail)
      : null;

    await query(
      `
        INSERT INTO tasks (title, description, status, priority, student_id, due_date)
        SELECT
          $1::VARCHAR(160),
          $2::TEXT,
          $3::VARCHAR(20),
          $4::VARCHAR(20),
          $5::INTEGER,
          $6::DATE
        WHERE NOT EXISTS (
          SELECT 1
          FROM tasks
          WHERE title = $1::VARCHAR(160)
        )
      `,
      [
        task.title,
        task.description,
        task.status,
        task.priority,
        studentId,
        task.dueDate
      ]
    );
  }
  logger.info("Seed de tasks verificado.");

  logger.info("Datos de ejemplo verificados.");
}
