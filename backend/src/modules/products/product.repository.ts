import { query } from "../../db/pool";
import { CreateProductDto, Product, ProductRow } from "./product.types";

function mapProduct(row: ProductRow): Product {
  return {
    ...row,
    price: Number(row.price)
  };
}

const productSelect = `
  SELECT
    p.id,
    p.name,
    p.price,
    p.stock,
    p.category_id,
    c.name AS category_name,
    p.created_at
  FROM products p
  INNER JOIN categories c ON c.id = p.category_id
`;

export async function findAllProducts(): Promise<Product[]> {
  const result = await query<ProductRow>(`${productSelect} ORDER BY p.id ASC`);
  return result.rows.map(mapProduct);
}

export async function findProductById(id: number): Promise<Product | null> {
  const result = await query<ProductRow>(`${productSelect} WHERE p.id = $1`, [id]);
  const row = result.rows[0];
  return row ? mapProduct(row) : null;
}

export async function findProductsByCategory(categoryId: number): Promise<Product[]> {
  const result = await query<ProductRow>(
    `${productSelect} WHERE p.category_id = $1 ORDER BY p.id ASC`,
    [categoryId]
  );
  return result.rows.map(mapProduct);
}

export async function createProduct(dto: CreateProductDto): Promise<Product> {
  const result = await query<ProductRow>(
    `
      INSERT INTO products (name, price, stock, category_id)
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        name,
        price,
        stock,
        category_id,
        (SELECT name FROM categories WHERE id = $4) AS category_name,
        created_at
    `,
    [dto.name, dto.price, dto.stock, dto.category_id]
  );

  return mapProduct(result.rows[0]);
}
