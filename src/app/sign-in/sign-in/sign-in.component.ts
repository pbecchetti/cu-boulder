import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/entities/user.entity';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  signinForm!: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      username: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.authService.signin(this.signinForm.value.username);
    this.router.navigate(['/home']);
  }
}
