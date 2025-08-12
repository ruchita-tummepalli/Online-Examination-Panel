import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MarksService } from '../../services/marks.service';
import { Marks } from '../../models/marks.model';
import { MarksFormComponent } from '../marks-form/marks-form.component';

@Component({
  selector: 'app-marks-list',
  templateUrl: './marks-list.component.html',
  styleUrls: ['./marks-list.component.css']
})
export class MarksListComponent implements OnInit {
  marks: Marks[] = [];
  displayedColumns = ['student_name', 'exam_title', 'marks', 'total_marks', 'percentage', 'exam_date', 'actions'];
  searchTerm = '';

  constructor(
    private marksService: MarksService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadMarks();
  }

  loadMarks() {
    this.marksService.getAllMarks(1, 100, this.searchTerm).subscribe(marks => {
      this.marks = marks;
    });
  }

  onSearch() {
    this.loadMarks();
  }

  openMarksForm(mark?: Marks) {
    const dialogRef = this.dialog.open(MarksFormComponent, {
      width: '500px',
      data: mark
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMarks();
      }
    });
  }

  deleteMarks(id: number) {
    if (confirm('Are you sure you want to delete this marks record?')) {
      this.marksService.deleteMarks(id).subscribe({
        next: () => {
          this.loadMarks();
          this.snackBar.open('Marks deleted successfully', 'Close', { duration: 3000 });
        },
        error: (error) => {
          this.snackBar.open('Error deleting marks', 'Close', { duration: 3000 });
        }
      });
    }
  }

  getPercentage(marks: number, totalMarks: number): number {
    return Math.round((marks / totalMarks) * 100);
  }
}