export interface Category {
  id: number;
  name: string;
  description: string | null;
  created_at: Date;
}

export interface CreateCategoryDto {
  name: string;
  description: string | null;
}
