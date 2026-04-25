export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category_id: number;
  category_name: string;
  created_at: Date;
}

export interface ProductRow {
  id: number;
  name: string;
  price: string;
  stock: number;
  category_id: number;
  category_name: string;
  created_at: Date;
}

export interface CreateProductDto {
  name: string;
  price: number;
  stock: number;
  category_id: number;
}
