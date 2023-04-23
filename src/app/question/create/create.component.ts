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
  data = sessionStorage.getItem('user');

  constructor(
    private questionService: QuestionService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.questionForm = this.formBuilder.group({
      question: ['', [Validators.required, Validators.maxLength(200)]],
    });

    // this.questionService.getQuestions().subscribe(
    //   (result) => {
    //     console.log(result);
    //   },
    //   (err) => {}
    // );
  }

  onSubmit() {
    this.questionService.addQuestion(this.questionForm.value).subscribe();
  }
}
