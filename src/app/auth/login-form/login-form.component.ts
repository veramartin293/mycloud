import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  public loginForm:FormGroup;
  public generalError: string;

  constructor(
    private authServie: AuthService,
    private router: Router,
    public formBuilder:FormBuilder
  ) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.generalError = '';
  }

  ngOnInit(): void {
  }

  public login() {
    this.authServie.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    )
    .subscribe(
      response => {
        // save token
        this.authServie.setToken(response.token);

        // redirect to main page
        this.router.navigate(['/']);
      },
      errorResp => {
        // const error = errorResp.error.error || errorResp.error.errors;
        if (errorResp.status == 422) {
          this.generalError = errorResp.error.error;
        } else {
          console.log(errorResp);
        }
      }
    )
  }

}
