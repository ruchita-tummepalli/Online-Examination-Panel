import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) {
    this.isEdit = !!data;
    this.studentForm = this.fb.group({
      name: [data?.name || '', [Validators.required, Validators.minLength(2)]],
      email: [data?.email || '', [Validators.required, Validators.email]],
      phone: [data?.phone || '', [Validators.pattern(/^[0-9]{10,15}$/)]]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.studentForm.valid) {
      const studentData = this.studentForm.value;
      
      if (this.isEdit) {
        this.studentService.updateStudent(this.data.id, studentData).subscribe({
          next: () => {
            this.snackBar.open('Student updated successfully', 'Close', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.snackBar.open('Error updating student', 'Close', { duration: 3000 });
          }
        });
      } else {
        this.studentService.createStudent(studentData).subscribe({
          next: () => {
            this.snackBar.open('Student created successfully', 'Close', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.snackBar.open('Error creating student', 'Close', { duration: 3000 });
          }
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}