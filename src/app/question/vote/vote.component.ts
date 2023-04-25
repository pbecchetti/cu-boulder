import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  constructor(
    private voteService: VoteService,
    private questionService: QuestionService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.voteForm = this.formBuilder.group({
      votes: this.formBuilder.array([]),
    });

    this.questionService.getQuestions().subscribe(
      (result) => {
        this.questionsFiltered = result;
        result.forEach((question: any, index: number) => {
          this.voteService
            .getVoteByQuestionId(question.id)
            .subscribe((resultQuestion) => {
              if (
                resultQuestion.filter((vote: any) => vote.user === this.user)
                  .length === 1
              ) {
                this.questionsFiltered.splice(index, 1);
              } else {
                this.addVote();
              }
            });
        });
        this.questionsFiltered.sort(
          (a: any, b: any) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
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
        this.voteService.addVote(questionId, vote).subscribe();
      }
    });
  }
}
