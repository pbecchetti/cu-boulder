import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
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
        this.questionService.addQuestion(this.questionForm.value).subscribe({
          next: this.handleSuccessResponse.bind(this),
          error: this.handleError.bind(this),
        });
      }
    });
  }

  handleSuccessResponse() {
    this._snackBar.open('Your new question is saved');
    this.router.navigate(['/home']);
  }
  handleError() {
    this._snackBar.open('Something went wrong, please try again');
  }
}
