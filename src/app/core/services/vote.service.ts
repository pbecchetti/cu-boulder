import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  filter,
  groupBy,
  map,
  mergeAll,
  mergeMap,
  retry,
  throwError,
  toArray,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  private baseAPI = 'http://localhost:3000';
  private voteUrl = '/votes';

  constructor(private http: HttpClient) {}

  getVoteByQuestionId(questionId: number): Observable<any> {
    return this.http
      .get(this.baseAPI + this.voteUrl + '?questionId=' + questionId)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    console.log('09');
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
