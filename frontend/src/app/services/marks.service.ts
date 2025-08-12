import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marks, MarksRequest } from '../models/marks.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarksService {
  private apiUrl = `${environment.apiUrl}/marks`;

  constructor(private http: HttpClient) {}

  getAllMarks(page: number = 1, limit: number = 10, search: string = ''): Observable<Marks[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<Marks[]>(this.apiUrl, { params });
  }

  getMarksByExam(examId: number, search: string = ''): Observable<Marks[]> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<Marks[]>(`${this.apiUrl}/exam/${examId}`, { params });
  }

  getMarksByStudent(studentId: number): Observable<Marks[]> {
    return this.http.get<Marks[]>(`${this.apiUrl}/student/${studentId}`);
  }

  recordMarks(marks: MarksRequest): Observable<Marks> {
    return this.http.post<Marks>(this.apiUrl, marks);
  }

  deleteMarks(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}