import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExamService } from '../../services/exam.service';
import { Exam } from '../../models/exam.model';
import { ExamFormComponent } from '../exam-form/exam-form.component';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
  exams: Exam[] = [];
  displayedColumns = ['title', 'date', 'time', 'duration', 'teacher_name', 'actions'];
  searchTerm = '';

  constructor(
    private examService: ExamService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadExams();
  }

  loadExams() {
    this.examService.getExams(1, 100, this.searchTerm).subscribe(exams => {
      this.exams = exams;
    });
  }

  onSearch() {
    this.loadExams();
  }

  openExamForm(exam?: Exam) {
    const dialogRef = this.dialog.open(ExamFormComponent, {
      width: '500px',
      data: exam
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadExams();
      }
    });
  }

  deleteExam(id: number) {
    if (confirm('Are you sure you want to delete this exam?')) {
      this.examService.deleteExam(id).subscribe({
        next: () => {
          this.loadExams();
          this.snackBar.open('Exam deleted successfully', 'Close', { duration: 3000 });
        },
        error: (error) => {
          this.snackBar.open('Error deleting exam', 'Close', { duration: 3000 });
        }
      });
    }
  }
}