import { Component } from '@angular/core';
import { Question } from 'src/app/core/entities/question.entity';
import { QuestionService } from 'src/app/core/services/question.service';
import { VoteService } from 'src/app/core/services/vote.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {
  questions: any[] = [];

  constructor(
    private voteService: VoteService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(
      (result) => {
        this.questions = result;
        this.questions.forEach((question) => {
          this.voteService
            .getVoteByQuestionId(question.id)
            .subscribe((resultQuestion) => {
              question.nbVoteTotal = resultQuestion.length;
              let nbYes = resultQuestion.filter(
                (vote: any) => vote.response === 1
              ).length;
              let nbNo = resultQuestion.filter(
                (vote: any) => vote.response === 0
              ).length;
              if (nbYes) {
                question.percentageYes = Math.round(
                  (nbYes / question.nbVoteTotal) * 100
                );
              } else question.percentageYes = 0;
              if (nbNo) {
                question.percentageNo = Math.round(
                  (nbNo / question.nbVoteTotal) * 100
                );
              } else question.percentageNo = 0;
            });
        });
      },
      (err) => {}
    );
  }
}
