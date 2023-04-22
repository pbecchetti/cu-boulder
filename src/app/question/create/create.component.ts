import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  questionForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.questionForm = this.formBuilder.group({
      question: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  onSubmit() {
    // this.authService.signin(this.signinForm.value);
  }
}
