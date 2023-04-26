import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/core/services/question.service';
import { VoteService } from 'src/app/core/services/vote.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css'],
})
export class VoteComponent {
  user = sessionStorage.getItem('user');
  voteForm!: FormGroup;

  votesFiltered: any[] = [];
  questions: any[] = [];
  questionsFiltered: any[] = [];
  message: string = '';

  constructor(
    private voteService: VoteService,
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.voteForm = this.formBuilder.group({
      votes: this.formBuilder.array([]),
    });

    this.questionService.getQuestions().subscribe(
      (result) => {
        this.questionsFiltered = result;
        result
          .sort(
            (a: any, b: any) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )
          .forEach((question: any, index: number) => {
            this.voteService
              .getVoteByQuestionId(question.id)
              .subscribe((resultQuestion) => {
                if (
                  resultQuestion.filter((vote: any) => vote.user === this.user)
                    .length === 1
                ) {
                  console.log(index);
                  this.questionsFiltered.splice(index, 1);
                } else {
                  this.addVote();
                }
              });
          });
      },
      (err) => {}
    );
  }

  get votes() {
    return this.voteForm.get('votes') as FormArray;
  }

  addVote() {
    const vote = new FormControl([]);
    this.votes.push(vote);
  }

  onSubmit() {
    this.voteForm.value.votes.forEach((vote: boolean, index: number) => {
      if (vote === true || vote === false) {
        let questionId = this.questionsFiltered[index].id;
        this.voteService
          .addVote(questionId, vote)
          .subscribe({
            next: this.handleSuccessResponse.bind(this),
            error: this.handleError.bind(this),
          });
      }
    });
  }

  handleSuccessResponse() {
    this._snackBar.open('Your votes are saved');
    this.router.navigate(['/home']);
  }
  handleError() {
    this._snackBar.open('Something went wrong, please try again');
  }
}
