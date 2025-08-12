export interface Student {
  id: number;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
}

export interface StudentRequest {
  name: string;
  email: string;
  phone?: string;
}