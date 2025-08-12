export interface Marks {
  id: number;
  exam_id: number;
  student_id: number;
  marks: number;
  total_marks: number;
  student_name?: string;
  student_email?: string;
  exam_title?: string;
  exam_date?: string;
  created_at: string;
}

export interface MarksRequest {
  exam_id: number;
  student_id: number;
  marks: number;
  total_marks: number;
}