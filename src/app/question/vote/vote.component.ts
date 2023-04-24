import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      vote: [''],
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
              }
            });
        });
      },
      (err) => {}
    );
  }

  onSubmit() {
    console.log(this.voteForm.value);
  }
}
