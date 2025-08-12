import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExamService } from '../../services/exam.service';
import { Exam } from '../../models/exam.model';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent implements OnInit {
  examForm: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private examService: ExamService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ExamFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Exam
  ) {
    this.isEdit = !!data;
    this.examForm = this.fb.group({
      title: [data?.title || '', [Validators.required, Validators.minLength(3)]],
      description: [data?.description || ''],
      date: [data?.date || '', Validators.required],
      time: [data?.time || '', Validators.required],
      duration: [data?.duration || '', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.examForm.valid) {
      const examData = this.examForm.value;
      
      if (this.isEdit) {
        this.examService.updateExam(this.data.id, examData).subscribe({
          next: () => {
            this.snackBar.open('Exam updated successfully', 'Close', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.snackBar.open('Error updating exam', 'Close', { duration: 3000 });
          }
        });
      } else {
        this.examService.createExam(examData).subscribe({
          next: () => {
            this.snackBar.open('Exam created successfully', 'Close', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.snackBar.open('Error creating exam', 'Close', { duration: 3000 });
          }
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}