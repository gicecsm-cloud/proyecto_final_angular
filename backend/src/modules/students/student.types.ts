export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  active: boolean;
  created_at: Date;
}

export interface CreateStudentDto {
  first_name: string;
  last_name: string;
  email: string;
  active: boolean;
}
