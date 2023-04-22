import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      username: ['', [Validators.required]],
    });
    // this.pvmeService.getPVME().subscribe(
    //   (result) => {
    //     console.log(result);
    //   },
    //   (err) => {
    //     switch (err) {
    //       case 404:
    //         this.message =
    //           "Something is wrong, please check your API address, the parameters of the query and their formats or contact us";
    //         break;
    //       default:
    //         this.message = "something is wrong, please contact us";
    //     }
    //   }
    // );
  }

  onSubmit() {
    this.authService.signin(this.signinForm.value);
  }
}
