import { query } from "../../db/pool";
import { Category, CreateCategoryDto } from "./category.types";

export async function findAllCategories(): Promise<Category[]> {
  const result = await query<Category>(
    "SELECT id, name, description, created_at FROM categories ORDER BY id ASC"
  );
  return result.rows;
}

export async function findCategoryById(id: number): Promise<Category | null> {
  const result = await query<Category>(
    "SELECT id, name, description, created_at FROM categories WHERE id = $1",
    [id]
  );
  return result.rows[0] ?? null;
}

export async function createCategory(dto: CreateCategoryDto): Promise<Category> {
  const result = await query<Category>(
    `
      INSERT INTO categories (name, description)
      VALUES ($1, $2)
      RETURNING id, name, description, created_at
    `,
    [dto.name, dto.description]
  );

  return result.rows[0];
}
