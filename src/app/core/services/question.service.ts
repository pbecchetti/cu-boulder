import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private baseAPI = 'http://localhost:3000';
  private questionUrl = '/questions';

  constructor(private http: HttpClient) {}

  user = sessionStorage.getItem('user');

  getQuestions(): Observable<any> {
    return this.http
      .get(this.baseAPI + this.questionUrl)
      .pipe(retry(1), catchError(this.handleError));
  }

  addQuestion(value: any): Observable<any> {
    return this.http
      .post(this.baseAPI + this.questionUrl, {
        text: value.text,
        username: this.user,
        timestamp: Date.now(),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => error);
  }
}
