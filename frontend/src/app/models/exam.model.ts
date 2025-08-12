export interface Exam {
  id: number;
  title: string;
  description?: string;
  date: string;
  time: string;
  duration: number;
  teacher_id: number;
  teacher_name?: string;
  created_at: string;
}

export interface ExamRequest {
  title: string;
  description?: string;
  date: string;
  time: string;
  duration: number;
}