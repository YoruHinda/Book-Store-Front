import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookstoreService {

  apiUrl: string = `${environment.url}/bookstore`

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  public getStudent(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.apiUrl);
  }

  public postStudent(student: any): Observable<Student> {
    return this.httpClient.post<any>(this.apiUrl, student, this.httpOptions)
  }

  public updateStudent(student: any): Observable<Student> {
    return this.httpClient.put<any>(this.apiUrl + '/' + student.student_id, student, this.httpOptions);
  }
}
