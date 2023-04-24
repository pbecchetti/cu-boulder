import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from 'src/app/core/services/question.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  questionForm!: FormGroup;
  exist: number = 0;
  message: string = '';

  constructor(
    private questionService: QuestionService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.questionForm = this.formBuilder.group({
      text: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  onSubmit() {
    this.questionService.getQuestions().subscribe((questions) => {
      console.log(questions);
      this.exist = questions.filter(
        (question: any) => question.text === this.questionForm.value.text
      ).length;
      if (this.exist === 1) {
        this.message = 'This question already exist, please choose a new one.';
      } else {
        this.questionService.addQuestion(this.questionForm.value).subscribe();
      }
    });
  }
}
