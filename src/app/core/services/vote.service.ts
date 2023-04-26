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

  //get all the votes for one question, as a parameter we need the questionID
  getVoteByQuestionId(questionId: number): Observable<any> {
    return this.http
      .get(this.baseAPI + this.voteUrl + '?questionId=' + questionId)
      .pipe(retry(1), catchError(this.handleError));
  }

  //get all the votes
  getVotes(): Observable<any> {
    return this.http
      .get(this.baseAPI + this.voteUrl)
      .pipe(retry(1), catchError(this.handleError));
  }

  //add a vote in the dB when a user click on save, with 2 parameters: the questionID and the response: true/false: yes/no
  addVote(questionId: number, vote: boolean): Observable<any> {
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
