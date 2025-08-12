import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MarksService } from '../../services/marks.service';
import { ExamService } from '../../services/exam.service';
import { StudentService } from '../../services/student.service';
import { Marks } from '../../models/marks.model';
import { Exam } from '../../models/exam.model';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-marks-form',
  templateUrl: './marks-form.component.html',
  styleUrls: ['./marks-form.component.css']
})
export class MarksFormComponent implements OnInit {
  marksForm: FormGroup;
  isEdit = false;
  exams: Exam[] = [];
  students: Student[] = [];

  constructor(
    private fb: FormBuilder,
    private marksService: MarksService,
    private examService: ExamService,
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<MarksFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Marks
  ) {
    this.isEdit = !!data;
    this.marksForm = this.fb.group({
      exam_id: [data?.exam_id || '', Validators.required],
      student_id: [data?.student_id || '', Validators.required],
      marks: [data?.marks || '', [Validators.required, Validators.min(0)]],
      total_marks: [data?.total_marks || '', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.loadExams();
    this.loadStudents();
  }

  loadExams() {
    this.examService.getExams(1, 1000).subscribe(exams => {
      this.exams = exams;
    });
  }

  loadStudents() {
    this.studentService.getStudents(1, 1000).subscribe(students => {
      this.students = students;
    });
  }

  onSubmit() {
    if (this.marksForm.valid) {
      const marksData = this.marksForm.value;
      
      this.marksService.recordMarks(marksData).subscribe({
        next: () => {
          this.snackBar.open('Marks recorded successfully', 'Close', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.snackBar.open('Error recording marks', 'Close', { duration: 3000 });
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}