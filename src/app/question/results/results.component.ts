import { Component } from '@angular/core';

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
        this.questions = result.sort(
          (a: any, b: any) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        this.questions.forEach((question) => {
          this.voteService
            .getVoteByQuestionId(question.id)
            .subscribe((resultQuestion) => {
              question.nbVoteTotal = resultQuestion.length;
              let nbYes = resultQuestion.filter(
                (vote: any) => vote.response === true
              ).length;
              let nbNo = resultQuestion.filter(
                (vote: any) => vote.response === false
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
