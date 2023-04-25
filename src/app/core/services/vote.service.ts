import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  private baseAPI = 'http://localhost:3000';
  private voteUrl = '/votes';

  constructor(private http: HttpClient) {}

  user = sessionStorage.getItem('user');

  getVoteByQuestionId(questionId: number): Observable<any> {
    return this.http
      .get(this.baseAPI + this.voteUrl + '?questionId=' + questionId)
      .pipe(retry(1), catchError(this.handleError));
  }

  getVotes(): Observable<any> {
    return this.http
      .get(this.baseAPI + this.voteUrl)
      .pipe(retry(1), catchError(this.handleError));
  }

  addVote(questionId: number, vote: boolean): Observable<any> {
    console.log(questionId, vote, this.user);
    return this.http
      .post(this.baseAPI + this.voteUrl, {
        questionId: questionId,
        response: vote,
        user: this.user,
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
