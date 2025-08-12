import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../services/exam.service';
import { StudentService } from '../../services/student.service';
import { MarksService } from '../../services/marks.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats = {
    totalExams: 0,
    totalStudents: 0,
    totalMarks: 0
  };

  constructor(
    private examService: ExamService,
    private studentService: StudentService,
    private marksService: MarksService
  ) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.examService.getExams(1, 1000).subscribe(exams => {
      this.stats.totalExams = exams.length;
    });

    this.studentService.getStudents(1, 1000).subscribe(students => {
      this.stats.totalStudents = students.length;
    });

    this.marksService.getAllMarks(1, 1000).subscribe(marks => {
      this.stats.totalMarks = marks.length;
    });
  }
}