import { Observable, catchError, retry, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private baseAPI = environment.apiBase;
  private questionUrl = '/questions';

  constructor(private http: HttpClient) {}

  user = sessionStorage.getItem('user');

  //get all the questions
  getQuestions(): Observable<any> {
    return this.http
      .get(this.baseAPI + this.questionUrl)
      .pipe(retry(1), catchError(this.handleError));
  }

  //add a new question in the DB with 3 mandatory parameters(the question, the user adding the question and the timestamp)
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
    return throwError(() => error);
  }
}
